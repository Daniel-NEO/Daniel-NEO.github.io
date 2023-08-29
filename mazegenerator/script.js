let squareNum = 35;
let animationInProgress = false;
let skipAnimation = false;
let animationSpeed = 1;
const mazeSizeSlider = document.getElementById('mazeSizeSlider');
const mazeSizeInput = document.getElementById('mazeSizeInput');
const mazeSizeSubmitButton = document.getElementById('mazeSizeSubmitButton');
const animationSpeedSlider = document.getElementById('animationSpeedSlider');
const animationSpeedInput = document.getElementById('animationSpeedInput');
const animationSpeedSubmitButton = document.getElementById('animationSpeedSubmitButton');
const skipAnimationCheckbox = document.getElementById('skipAnimationCheckbox');
const maze = document.getElementById('maze');

let matrix = [];
mazeSizeSlider.value = squareNum;

const generateMatrix = () => {
    matrix = [];
    const rowNum = Math.round(squareNum * 0.52625);
    for (var i = 0; i < rowNum; i++) {
        matrix[i] = []; // Create a new row
        for (var j = 0; j < squareNum; j++) {
            matrix[i][j] = "udlr";
        }
    }
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const createSquares = async () => {
    maze.innerHTML = '';
    const rowNum = matrix.length;
    for(let i = 0; i < rowNum; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.style.height = `${100 / rowNum}%`;
        maze.appendChild(row);
        for(let j = 0; j < squareNum; j++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.id = `${i + 1}-${j + 1}`;
            square.style.width = `calc(${100 / squareNum}% - ${2}px`;
            square.style.height = '100%';
            row.appendChild(square);
        }
    }
    
};



const pickside = (i, j) => {
    const rowNum = Math.round(squareNum * 0.52625);
    var sides = ['u', 'd', 'l', 'r'];
    var randomIndex = Math.floor(Math.random() * sides.length);
    var randomside = sides[randomIndex];
    if ((i == 0 || matrix[i - 1][j].includes('o')) && (i == rowNum - 1 || matrix[i + 1][j].includes('o')) && (j == 0 || matrix[i][j - 1].includes('o')) && (j == squareNum - 1 || matrix[i][j + 1].includes('o'))) {
        return 'f';
    }
    if ((randomside == "u" && (i == 0 || matrix[i - 1][j].includes('o'))) || (randomside == "d" && (i == rowNum - 1 || matrix[i + 1][j].includes('o'))) || (randomside == "r" && (j == squareNum - 1 || matrix[i][j + 1].includes('o'))) || (randomside == "l" && (j == 0 || matrix[i][j - 1].includes('o')))) {
        return pickside(i, j);
    }
    return randomside;
}

const createmaze = async () => {
    console.log("Start!");
    var hitend = false;
    var mmi = 0, mmj = 0;
    var side = [];
    animationInProgress = true;
    document.getElementById("1-1").style.borderLeftColor = "rgb(147, 147, 147)";
    document.getElementById(`${matrix.length}-${matrix[0].length}`).style.borderRightColor = "rgb(147, 147, 147)";
    while(!hitend) {
        if (!animationInProgress) {
            hitend = true;
            break;
        }
        const borders = matrix[mmi][mmj];
        const squareId = `${mmi+1}-${mmj+1}`;
        const specificSquare = document.getElementById(squareId);
        if (!borders.includes('u')){
            specificSquare.style.borderTopColor = "rgb(147, 147, 147)";
        }
        if (!borders.includes('d')){
            specificSquare.style.borderBottomColor = "rgb(147, 147, 147)";
        }
        if (!borders.includes('l')){
            specificSquare.style.borderLeftColor = "rgb(147, 147, 147)";
        }
        if (!borders.includes('r')){
            specificSquare.style.borderRightColor = "rgb(147, 147, 147)";
        }
        specificSquare.style.backgroundColor = "red";
        matrix[mmi][mmj] = matrix[mmi][mmj] + 'o';
        
        hitend = true;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[0].length; j++) {
                if (!matrix[i][j].includes('o')) {
                    hitend = false;
                }
            }
        }
        tempside = pickside(mmi, mmj);
        if (tempside === "f") {
            if (side[side.length - 1] == "u") {
                mmi += 1;
            }
            else if (side[side.length - 1] == "d") {
                mmi -= 1;
            }
            else if (side[side.length - 1] == "r") {
                mmj -= 1;
            }
            else if (side[side.length - 1] == "l") {
                mmj += 1;
            }
            side.pop();
        }
        else {
            side.push(tempside);
            matrix[mmi][mmj] = matrix[mmi][mmj].replace(side[side.length - 1], "");
            if (side[side.length - 1] === "u") {
                matrix[mmi - 1][mmj] = matrix[mmi - 1][mmj].replace(/d/, "");
                mmi -= 1;
                specificSquare.style.borderTopColor = "rgb(147, 147, 147)";
            } else if (side[side.length - 1] === "d") {
                matrix[mmi + 1][mmj] = matrix[mmi + 1][mmj].replace(/u/, "");
                mmi += 1;
                specificSquare.style.borderBottomColor = "rgb(147, 147, 147)"
            } else if (side[side.length - 1] === "l") {
                matrix[mmi][mmj - 1] = matrix[mmi][mmj - 1].replace(/r/, "");
                mmj -= 1;
                specificSquare.style.borderLeftColor = "rgb(147, 147, 147)";
            } else if (side[side.length - 1] === "r") {
                matrix[mmi][mmj + 1] = matrix[mmi][mmj + 1].replace(/l/, "");
                mmj += 1;
                specificSquare.style.borderRightColor = "rgb(147, 147, 147)";
            }
        }
        if (!skipAnimation) {
            await sleep(animationSpeed);
        }

        specificSquare.style.backgroundColor = "rgb(147, 147, 147)";
    }
    animationInProgress = false;
    
}

window.onload = async function () {
    generateMatrix();
    createSquares();
    createmaze();
}

let debounceTimer;

mazeSizeSlider.oninput = function () {
    clearTimeout(debounceTimer); // If the function is called again before the timeout, clear the previous timeout
    squareNum = this.value;
    mazeSizeInput.value = squareNum;
    animationInProgress = false;
    debounceTimer = setTimeout(() => {
        generateMatrix();
        createSquares();
        createmaze();
    }, (animationSpeed)+100);
}

mazeSizeSubmitButton.onclick = async function () {
    clearTimeout(debounceTimer);
    const value = parseInt(mazeSizeInput.value);
    if (value >= 1 && value <= 100) {
        squareNum = value;
        mazeSizeSlider.value = squareNum;
        animationInProgress = false;
        debounceTimer = setTimeout(() => {
            generateMatrix();
            createSquares();
            createmaze();
        }, (animationSpeed)+100);
    } else {
        alert("Please enter a number between 1 and 100");
    }
}

animationSpeedSlider.oninput = function() {
    animationSpeed = Math.pow(this.value,3)/1000000;
    animationSpeedInput.value = this.value;
}

animationSpeedSubmitButton.onclick = function() {
    const value = parseInt(animationSpeedInput.value);
    if (value >= 1 && value <= 1000) {
        animationSpeed = Math.pow(value,3)/1000000;
        animationSpeedSlider.value = value;
    } else {
        alert("Please enter a number between 1 and 1000");
    }
}

window.addEventListener('resize', function() {
    var width = document.getElementById('maze').offsetWidth;
    var height = width * 0.5;
    document.getElementById('maze').style.height = height + 'px';
});

// Initial height calculation on page load
var width = document.getElementById('maze').offsetWidth;
var height = width * 0.5;
document.getElementById('maze').style.height = height + 'px';

skipAnimationCheckbox.onchange = function() {
    skipAnimation = this.checked;
    console.log(skipAnimation);
}

const generatecustommaze = async (n) => {
    squareNum = n;
    animationInProgress = false;
    await sleep(100);
    generateMatrix();
    createSquares();
    createmaze();
}

const generatecustomspeed = async (n) => {
    animationSpeed = n;
}