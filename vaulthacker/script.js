const boxes = document.querySelectorAll('.num-box');
let currentIndex = 0;

document.body.addEventListener('keydown', function(e) {
    if (e.key >= '0' && e.key <= '9' && currentIndex < 8) { // If a number key is pressed
        boxes[currentIndex].value = e.key;
        currentIndex++;
    } else if (e.key === 'Backspace' && currentIndex > 0) { // If backspace is pressed
        currentIndex--;
        boxes[currentIndex].value = '';
    }
});

document.querySelector('.submit-btn').addEventListener('click', function() {
    // Handle submit logic here
});


document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.num-box');
    const statusMsg = document.getElementById('status-msg');
    const errorSound = document.getElementById('error-sound');
    const submitBtn = document.querySelector('.submit-btn');
    const correctSound = document.getElementById('correct-sound');

    function checkCode() {
        const code = Array.from(boxes).map(box => box.value).join('');
        if (code === '20050915') {
            statusMsg.textContent = 'CODE CRACKED';
            statusMsg.style.color = 'white';
            document.body.style.backgroundColor = 'green';
            correctSound.play();
        } else {
            statusMsg.textContent = 'ACCESS DENIED';
            statusMsg.style.color = 'red';
            errorSound.play();
        }
    }

    submitBtn.addEventListener('click', checkCode);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            checkCode();
        }
    });
});
