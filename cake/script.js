document.addEventListener("DOMContentLoaded", function() {
    var cake = document.getElementById("cake");
    var resetButton = document.querySelector(".reset-button");
    var fireImage = document.createElement("img");
    fireImage.src = "fire.png";
    fireImage.classList.add("fire-image");
    var container = document.querySelector(".container");
    var fireAnimationInterval;
    
    document.addEventListener("keydown", function(event) {
      if (event.key === "q") {
        cake.src = "cake2.png";
      } else if (event.key === "r") {
        cake.src = "cake.png";
      } else if (event.key === "f") {
        container.appendChild(fireImage);
        fireImage.style.transform = "scale(0.1)";
        fireImage.style.position = "fixed";
        fireImage.style.left = "52px%";
        fireImage.style.top = "-28px";
        var currentScale = 0.1; // Initialize current scale
        fireAnimationInterval = setInterval(function() {
          currentScale += 0.05; // Increase current scale
          fireImage.style.transform = `scale(${currentScale})`;
          fireImage.style.top = parseInt(fireImage.style.top) - 8 + "px"; // Move fire up by 10 pixels
        }, 100);
      } else if (event.key === "s") {
        clearInterval(fireAnimationInterval);
        container.removeChild(fireImage);
      }
    });
  
    var knife = document.getElementById("knife");
  
    document.addEventListener("mousemove", function(event) {
      var x = event.clientX - 500; // Subtract 500px from x position
      var y = event.clientY - 500; // Subtract 500px to y position
  
      knife.style.left = x + "px";
      knife.style.top = y + "px";
    });
  });
  