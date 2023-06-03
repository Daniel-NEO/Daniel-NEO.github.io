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

