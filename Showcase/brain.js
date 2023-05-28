window.addEventListener('resize', function() {
    var width = window.innerWidth;
    document.querySelector('h1').textContent = "Achievements (" + width + "px)";
  
    var subContainers = document.querySelectorAll('.sub-container');
    var mainContainerWidth = document.querySelector('#main-container').offsetWidth;
  
    if (width <= 830) {
      for (var i = 0; i < subContainers.length; i++) {
        subContainers[i].style.width = "98%";
        subContainers[i].style.left = "50%";
        subContainers[i].querySelector('img').style.width = "100%";
        subContainers[i].style.transform = "translate(-50%, -50%)";
  
        if (i == 0) {
          subContainers[i].style.top = "15%";
        } else if (i == 1) {
          subContainers[i].style.top = "50%";
        } else if (i == 2) {
          subContainers[i].style.top = "80%";
        }
      }
    } else {
      for (var i = 0; i < subContainers.length; i++) {
        subContainers[i].style.width = "800px";
        subContainers[i].querySelector('img').style.width = "100%";
        subContainers[i].style.transform = "none";
  
        if (i == 1) {
          subContainers[i].style.transform = "translateX(-800px)";
        }
  
        if (i % 2 == 0) {
          subContainers[i].style.left = "1%";
        } else {
          subContainers[i].style.left = "99%";
        }
  
        if (i == 0) {
          subContainers[i].style.top = "2%";
        } else if (i == 1) {
          subContainers[i].style.top = "38%";
        } else if (i == 2) {
          subContainers[i].style.top = "70%";
        }
      }
    }
  });
  
  // trigger the resize event on page load
  window.dispatchEvent(new Event('resize'));
  