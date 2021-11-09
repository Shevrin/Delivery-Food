const auth = () => {

	const modalAuth = document.querySelector('.modal-auth')
	const btnAuth = document.querySelector('.button-auth')
	const btnCart = document.getElementById('cart-button')
	const closeAuth = document.querySelector('.close-auth')
	const loginForm = document.getElementById('logInForm')
	const inputLogin = document.getElementById('login')
	const inputPassword = document.getElementById('password')
	const btnOut = document.querySelector('.button-out')
	const userName = document.querySelector('.user-name')

	const loginFunc = (user) => {
		btnAuth.style.display = 'none'
		btnOut.style.display = 'flex'
		userName.style.display = 'flex'
		userName.textContent = user.login
		modalAuth.style.display = 'none'
		btnCart.style.display = 'flex'
	}

	const loginOutFunc = () => {
		btnAuth.style.display = 'block'
		btnOut.style.display = 'none'
		userName.style.display = 'none'
		userName.textContent = ''
		localStorage.removeItem('user')
		btnCart.style.display = 'none'
	}

	btnAuth.addEventListener('click', () => {
		modalAuth.style.display = 'flex'
	})

	closeAuth.addEventListener('click', () => {
		modalAuth.style.display = 'none'
	})

	loginForm.addEventListener('submit', (event) => {
		event.preventDefault()
		const user = {
			login: inputLogin.value.trim(),
			password: inputPassword.value,
		}
		// if (user.login != '') {
		localStorage.setItem('user', JSON.stringify(user))
		loginFunc(user)
		// }
	})

	btnOut.addEventListener('click', () => {
		loginOutFunc()
	})

	if (localStorage.getItem('user')) {
		loginFunc(JSON.parse(localStorage.getItem('user')))
	}
}

auth()