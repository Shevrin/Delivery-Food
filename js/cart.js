const cart = () => {
	const btnCart = document.getElementById('cart-button')
	const modalCart = document.querySelector('.modal-cart')
	const modalBody = document.querySelector('.modal-body')
	const modalTotal = document.querySelector('.modal-pricetag')
	const closeBtn = modalCart.querySelector('.close')
	const sendBtnCart = modalCart.querySelector('.button-primary')
	const clearCart = modalCart.querySelector('.clear-cart')


	const visible = () => {
		modalTotal.style.display = 'flex'
		sendBtnCart.style.display = 'flex'
	}
	const invisible = () => {
		modalTotal.style.display = 'none'
		sendBtnCart.style.display = 'none'
	}

	const resetCart = () => {
		invisible()
		modalBody.innerHTML = ''
		localStorage.removeItem('cart')
		modalCart.classList.remove('is-open')
		modalTotal.style.display = 'none'
	}

	const sumCart = () => {

		const cartArray = JSON.parse(localStorage.getItem('cart'))
		const sumCart = cartArray.reduce((sum, item) => sum + item.count * item.price, 0)

		modalTotal.textContent = sumCart
	}

	const incrementCount = (id) => {
		const cartArray = JSON.parse(localStorage.getItem('cart'))

		cartArray.map((item) => {
			if (item.id == id) {
				item.count++
			}
			return item
		});
		localStorage.setItem('cart', JSON.stringify(cartArray))
		renderItems(cartArray)
	}

	const decrementCount = (id) => {
		const cartArray = JSON.parse(localStorage.getItem('cart'))

		cartArray.map((item) => {
			if (item.id == id) {
				item.count = item.count > 0 ? item.count - 1 : item.count = 0
			}
			return item
		});
		localStorage.setItem('cart', JSON.stringify(cartArray))
		renderItems(cartArray)
	}

	const renderItems = (data) => {
		modalBody.innerHTML = ''
		data.forEach(({ name, price, count, id }) => {
			const elemFoodRow = document.createElement('div')
			elemFoodRow.classList.add('food-row')
			elemFoodRow.innerHTML = `
			<span class="food-name">${name}</span>
					<strong class="food-price">${price} ₽</strong>
					<div class="food-counter">
						<button class="counter-button btn-dec" data-index="${id}">-</button>
						<span class="counter">${count}</span>
						<button class="counter-button btn-inc" data-index="${id}">+</button>
						`
			modalBody.append(elemFoodRow)
		});
		// console.log(modalBody);
	}

	modalBody.addEventListener('click', (e) => {
		e.preventDefault()
		if (e.target.classList.contains('btn-dec')) {
			decrementCount(e.target.dataset.index)
			// console.log(e.target.dataset.index);
		}
		if (e.target.classList.contains('btn-inc')) {
			incrementCount(e.target.dataset.index)
			// console.log(e.target.dataset.index);
		}
		sumCart()
	})


	sendBtnCart.addEventListener('click', () => {
		// https://jsonplaceholder.typicode.com/posts
		const cartArray = localStorage.getItem('cart')
		fetch('https://jsonplaceholder.typicode.com/posts',
			{
				method: 'POST',
				body: cartArray
			}
		)
			.then(response => {
				if (response.ok) {
					resetCart()
				}
			})
			.catch(e => console.error(e))
	})

	btnCart.addEventListener('click', () => {
		modalCart.classList.add('is-open')
		invisible()
		if (localStorage.getItem('cart')) {
			// console.log(JSON.parse(localStorage.getItem('cart')));
			renderItems(JSON.parse(localStorage.getItem('cart')))
			sumCart()
			visible()
		}
	})

	closeBtn.addEventListener('click', () => {
		modalCart.classList.remove('is-open')
	})

	clearCart.addEventListener('click', () => {
		modalCart.classList.remove('is-open')
	})

}

cart()

