let squareNum = 35;
const slider = document.getElementById('slider');
const textInput = document.getElementById('textInput');
const submitButton = document.getElementById('submitButton');
const maze = document.getElementById('maze');

let matrix = [];


const generateMatrix = () => {
    matrix = [];
    const rowNum = Math.round(squareNum * 0.52625);
    for (var i = 0; i < rowNum; i++) {
        matrix[i] = []; // Create a new row
        for (var j = 0; j < squareNum; j++) {
            matrix[i][j] = "udlr";
        }
    }
    updateMatrix();
};

const updateMatrix = () => {
    const rowNum = Math.round(squareNum * 0.52625);
    for (var i = 0; i < rowNum; i++) {
        for (var j = 0; j < squareNum; j++) {
            if ((i > 0 && !matrix[i][j].includes('u') && matrix[i - 1][j].includes('d'))) {
                matrix[i - 1][j] = matrix[i - 1][j].replace(/d/, "");
            }
            if ((i < rowNum - 1 && !matrix[i][j].includes('d') && matrix[i + 1][j].includes('u'))) {
                matrix[i + 1][j] = matrix[i + 1][j].replace(/u/, "");
            }
            if ((j > 0 && !matrix[i][j].includes('l') && matrix[i][j - 1].includes('r'))) {
                matrix[i][j - 1] = matrix[i][j - 1].replace(/r/, "");
            }
            if ((j < squareNum - 1 && !matrix[i][j].includes('r') && matrix[i][j + 1].includes('l'))) {
                matrix[i][j + 1] = matrix[i][j + 1].replace(/l/, "");
            }
        }
    }
    matrix[0][0] = matrix[0][0].replace(/u/, "");
    matrix[rowNum-1][squareNum-1] = matrix[rowNum-1][squareNum-1].replace(/r/, "");
}

const createSquares = () => {
    maze.innerHTML = '';
    const rowNum = matrix.length;
    for (let i = 0; i < rowNum; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.style.height = `${100 / rowNum}%`;
        maze.appendChild(row);
        for (let j = 0; j < squareNum; j++) {
            const square = document.createElement('div');
            square.className = 'square';
            const borders = matrix[i][j];
            if (!borders.includes('u')) {
                square.style.borderTopColor = "rgb(147, 147, 147)";
            }
            if (!borders.includes('d')) {
                square.style.borderBottomColor = "rgb(147, 147, 147)";
            }
            if (!borders.includes('l')) {
                square.style.borderLeftColor = "rgb(147, 147, 147)";
            }
            if (!borders.includes('r')) {
                square.style.borderRightColor = "rgb(147, 147, 147)";
            }
            square.style.width = `${99 / squareNum}%`;
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

const createmaze = () => {
    var hitend = false;
    var mmi = 0, mmj = 0;
    var side = [];
    while(!hitend) {
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
                mmi -= 1;
            } else if (side[side.length - 1] === "d") {
                mmi += 1;
            } else if (side[side.length - 1] === "l") {
                mmj -= 1;
            } else if (side[side.length - 1] === "r") {
                mmj += 1;
            }
        }
    }
    updateMatrix();
}

window.onload = function () {
    generateMatrix();
    createmaze();
    createSquares();
}

slider.oninput = function () {
    squareNum = this.value;
    textInput.value = squareNum;
    generateMatrix();
    createmaze();
    createSquares();
}

submitButton.onclick = function () {
    const value = parseInt(textInput.value);
    if (value >= 1 && value <= 100) {
        squareNum = value;
        slider.value = squareNum;
        generateMatrix();
        createmaze();
        createSquares();
    } else {
        alert("Please enter a number between 1 and 100");
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

const generatecustommaze = (n) => {
    squareNum = n;
    generateMatrix();
    createmaze();
    createSquares();
}