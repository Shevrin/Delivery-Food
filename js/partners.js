const partners = () => {

	const cardsRestaurants = document.querySelector('.cards-restaurants')

	const renederItem = (data) => {
		data.forEach((element) => {
			const {
				image,
				kitchen,
				name,
				price,
				products,
				stars,
				time_of_delivery
			} = element
			const a = document.createElement('a')
			a.setAttribute('href', './restaurant.html')
			a.classList.add('card')
			a.classList.add('card-restaurant')
			// a.products = products
			a.dataset.products = products
			a.innerHTML = `
		<img src="${image}" alt="${name}" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name}</h3>
								<span class="card-tag tag">${time_of_delivery} мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
								${stars}
								</div>
								<div class="price">От ${price} ₽</div>
								<div class="category">${kitchen}</div>
							</div>
						</div>
		`
			a.addEventListener('click', (event) => {
				event.preventDefault()
				localStorage.setItem('restaurant', JSON.stringify(element))
				if (localStorage.getItem('user')) {
					window.location.href = './restaurant.html'
				} else {
					modalAuth.style.display = 'flex'
				}

			})
			cardsRestaurants.append(a)
		});
	}

	fetch('https://testglo-default-rtdb.firebaseio.com/db/partners.json')
		.then((response) => response.json())
		.then((data) => {
			renederItem(data)
		})
		.catch((error) => {
			console.log(error)
		})
}

partners()