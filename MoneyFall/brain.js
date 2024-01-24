var money = document.getElementById("money");
var mps = 10
var rts_range = 1440; // maximum rotation speed in degrees per second
money.style.display = "none";

function createMoney() {
    var clone = money.cloneNode(true);
    clone.classList.add("money-clone"); /* add this line to add the "money-clone" class */
    var x = Math.floor(Math.random() * (window.innerWidth * 0.8)) + (window.innerWidth * 0.2)-180;
    var y = -200;

    clone.style.position = "absolute";
    clone.style.left = x + "px";
    clone.style.top = y + "px";
    clone.style.display = "block";
    clone.style.width = "50%"; // set the width to 50%
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

setInterval(createMoney, 1000 / mps); // 10 pictures per second
