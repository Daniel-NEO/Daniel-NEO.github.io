let slider = document.getElementById('slider');
let image1 = document.getElementById('slider-image-1');
let image2 = document.getElementById('slider-image-2');
let startButton = document.getElementById('start-button');
let stopButton = document.getElementById('stop-button');

let activeImage = 1;
let intervalId = null;

function scrollSlider() {
    let newValue = parseInt(slider.value) + 1;
    if (newValue <= parseInt(slider.max)) {
        slider.value = newValue;
    } else {
        slider.value = 1;
    }
    updateSlider();
}

function startAutoscroll() {
    intervalId = setInterval(scrollSlider, 400);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopAutoscroll() {
    clearInterval(intervalId);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function updateSlider() {
    let newImage = new Image();
    newImage.src = slider.value + '.jpg';

    newImage.onload = function() {
        image2.src = newImage.src;
        image2.style.opacity = 1;
        image1.style.transition = 'opacity 0.3s';
        image1.style.opacity = 0;
    };
    image1.src = image2.src;
    image1.style.transition = 'opacity 0s';
    image1.style.opacity = 1;
}

slider.addEventListener('input', function() {
    updateSlider();
});

startButton.addEventListener('click', function() {
    startAutoscroll();
});

stopButton.addEventListener('click', function() {
    stopAutoscroll();
});
