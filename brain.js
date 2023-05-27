let count = 0;
let autoClickerRate = 0;
const sounds = [];

const countElement = document.getElementById("count");
const autoClickerRateElement = document.getElementById("autoClickerRate");

const incrementButton = document.getElementById("incrementButton");
const buyAllAutoClickerButton = document.getElementById("buyAllAutoClickerButton");
const autoClickerButton = document.getElementById("autoClickerButton");

let intervalId;

function playSound(soundFile) {
  const sound = new Audio(soundFile);
  sounds.push(sound);
  sound.play();

  sound.addEventListener('ended', () => {
    sounds.splice(sounds.indexOf(sound), 1);
  });
}

function incrementCount(addnum) {
  count += addnum;
  countElement.innerText = count;

  for (let i = 0; i < Math.floor(10/(1+Math.pow(2.718,-0.001*addnum))-5)+1; i++) {
    createMoney();
  }

}


function buyAllAutoClicker() {
  const oldCount = count;
  count = count % 10;
  const newCount = count;
  const increaseRate = (oldCount - newCount) / 20;
  autoClickerRate += increaseRate;
  
  countElement.innerText = count;
  autoClickerRateElement.innerText = autoClickerRate.toFixed(1);
  autoClickerCostElement.innerText = "Cost: " + (autoClickerRate * 20).toFixed(0);
  
  clearInterval(intervalId);
}


function buyAutoClicker() {
  if (count >= 10) {
    count -= 10;
    countElement.innerText = count;
    autoClickerRate += 0.5;
    autoClickerRateElement.innerText = autoClickerRate.toFixed(1);
    
    clearInterval(intervalId);
  }
}


incrementButton.addEventListener("click", () => {
  incrementCount(1);
});


autoClickerButton.addEventListener("click", buyAutoClicker);
buyAllAutoClickerButton.addEventListener("click", buyAllAutoClicker);

autoClickerButton.addEventListener("click", () => {
  if (autoClickerRate > 0) {
    clearInterval(intervalId);
    
    if (autoClickerRate > 100) {
      intervalId = setInterval(() => {
        incrementCount(Math.floor(autoClickerRate/100));
      }, 10);
    } else {
      intervalId = setInterval(() => {
        incrementCount(1);
      }, Math.floor((1 / autoClickerRate) * 1000));
    }
  } else {
    clearInterval(intervalId);
  }
});


buyAllAutoClickerButton.addEventListener("click", () => {
  if (autoClickerRate > 0) {
    clearInterval(intervalId);
    
    if (autoClickerRate > 100) {
      intervalId = setInterval(() => {
        incrementCount(Math.floor(autoClickerRate/100));
      }, 10);
    } else {
      intervalId = setInterval(() => {
        incrementCount(1);
      }, Math.floor((1 / autoClickerRate) * 1000));
    }
  } else {
    clearInterval(intervalId);
  }
});

var money = document.getElementById("money");
var mps = 1
var rts_range = 1440; // maximum rotation speed in degrees per second
money.style.display = "none";

function createMoney() {
  playSound('nice_sound.mp3');
  if (mps <= 0) return;
    var clone = money.cloneNode(true);
    clone.classList.add("money-clone"); /* add this line to add the "money-clone" class */
    var x = Math.round(Math.random() * window.innerWidth);
    var y = -200;

    clone.style.position = "absolute";
    clone.style.left = x + "px";
    clone.style.top = y + "px";
    clone.style.display = "block";
    clone.style.width = clone.style.width = 200+"px";
    document.body.appendChild(clone);

    var speed = Math.floor(Math.random() * 10) + 5;
    var rts = (Math.random() * rts_range) - (rts_range / 2); // random rotation speed in degrees per second
    var angle = Math.random() * 360; // random initial rotation angle

    var intervalId = setInterval(function() {
        y += speed;
        clone.style.top = y + "px";

        // rotate the clone
        var transform = "rotate(" + angle + "deg)"; // set the initial rotation angle
        angle += rts / 500; // add the rotation speed
        clone.style.webkitTransform = transform; // for Safari/Chrome

        if (y >= window.innerHeight) {
            document.body.removeChild(clone);
            clearInterval(intervalId);
        }
    }, 100 / 10);
}

