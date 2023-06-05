
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