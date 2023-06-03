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

window.addEventListener('scroll', () => {
	const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
	topText.textContent = `${Math.round(scrollPercentage)}%`;
	const summaryLeft = (window.innerWidth - summaryWidth) / 2;
	summaryContainer.style.top = `${window.scrollY+60}px`;
});
