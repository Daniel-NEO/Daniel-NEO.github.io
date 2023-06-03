const scrollTexts = document.querySelectorAll('.scroll-text');
const topText = document.querySelector('.top-text');
const summaryContainer = document.querySelector('.summary-container');
const summaryWidth = summaryContainer.offsetWidth;

scrollTexts.forEach((text) => {
	text.addEventListener('click', () => {
		window.scrollTo({
			top: text.getAttribute('data-scroll') / 100 * (document.body.scrollHeight - window.innerHeight),
			behavior: 'smooth',
		});
	});
});

function updateWebsiteWidth() {
	const websiteWidth = document.documentElement.clientWidth;
	const websiteWidthElement = document.getElementById('website-width');
	websiteWidthElement.textContent = websiteWidth;
  }
  
  // Call the function on page load
  updateWebsiteWidth();
  
  // Attach the function to the window resize event
  window.addEventListener('resize', updateWebsiteWidth);

  function updateLogoHeight() {
	const logoImg = document.querySelector('.logo-img');
	const headerWidth = document.getElementById('header').offsetWidth;
  
	if (headerWidth > 710) {
	  logoImg.style.height = '100px';
	} else {
	  logoImg.style.height = 'auto';
	}
  }
  
  window.addEventListener('resize', updateLogoHeight);

  // Call the function immediately
updateLogoHeight();

// Add event listener to check on resize
window.addEventListener('resize', updateLogoHeight);