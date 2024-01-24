let slider = document.getElementById("myRange");
let logo = document.getElementById("logo");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let interval;

startBtn.addEventListener('click', function() {
    clearInterval(interval); // Clear previous interval if any
    interval = setInterval(function() {
        if(slider.value < 122) {
            slider.value++;
        } else {
            slider.value = 0; // Set slider value back to 0
        }
        let paddedNumber = String(slider.value).padStart(3, '0');
        logo.src = "IGEMLOGO/logo" + paddedNumber + ".png";
    }, 25); // 30 images per second = 1 image per ~33ms
});

stopBtn.addEventListener('click', function() {
    clearInterval(interval);
});

slider.oninput = function() {
    clearInterval(interval); // Stop autoplay when manual slide
    let paddedNumber = String(this.value).padStart(3, '0');
    logo.src = "IGEMLOGO/logo" + paddedNumber + ".png";
}