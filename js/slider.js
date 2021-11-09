const slider = () => {
	// import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js'


	const swiper = new Swiper('.swiper',
		{
			loop: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				el: '.swiper-pagination',
			},

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
}
slider()