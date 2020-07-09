// Global state of the app
// Exposing it to the window for development purposes.
// @todo Move it inside the IIFE in production.
const state = {
	tab: 'mobile',
	loading: false,
	timeoutFunction: null,
}

;(function () {
	const update = {
		nav: () => {
			const tabPhone = document.getElementById('tabPhone')
			const tabEmail = document.getElementById('tabEmail')

			if (state.tab === 'mobile') {
				if (!tabPhone.classList.contains('active')) {
					tabPhone.classList.add('active')
					tabEmail.classList.remove('active')
				}
			} else {
				if (!tabEmail.classList.contains('active')) {
					tabEmail.classList.add('active')
					tabPhone.classList.remove('active')
				}
			}
		},
		illustration: async () => {
			const illustration = document.getElementById('illustration')

			if (state.tab === 'mobile') {
				update.animation.hide(illustration)
				setTimeout(() => {
					illustration.src = `assets/illustration${
						state.tab[0].toUpperCase() + state.tab.slice(1)
					}.svg`
					update.animation.show(illustration)
				}, 300)
			} else {
				update.animation.hide(illustration)
				setTimeout(() => {
					illustration.src = `assets/illustration${
						state.tab[0].toUpperCase() + state.tab.slice(1)
					}.svg`
					update.animation.show(illustration)
				}, 300)
			}
		},
		animation: {
			show: (element) => {
				element.style.opacity = 1
			},
			hide: (element) => {
				element.style.opacity = 0
			},
			showFieldSet: (element) => {
				element.style.display = 'block'
				setTimeout(() => {
					element.style.opacity = '1'
				}, 50)
			},
			hideFieldSet: (element) => {
				element.style.opacity = '0'
				setTimeout(() => {
					element.style.display = 'none'
				}, 50)
			},
		},
		form: () => {
			const phoneFormGroup = document.getElementById('phoneFormGroup')
			const emailFormGroup = document.getElementById('emailFormGroup')

			const phoneInput = document.getElementById('number')
			const emailInput = document.getElementById('emailInput')

			if (state.tab === 'mobile') {
				emailInput.required = false
				update.animation.hideFieldSet(emailFormGroup)
				if (state.timeoutFunction) clearTimeout(state.timeoutFunction)
				state.timeoutFunction = setTimeout(() => {
					phoneInput.required = true
					update.animation.showFieldSet(phoneFormGroup)
				}, 300)
			} else {
				phoneInput.required = false
				update.animation.hideFieldSet(phoneFormGroup)
				if (state.timeoutFunction) clearTimeout(state.timeoutFunction)
				state.timeoutFunction = setTimeout(() => {
					emailInput.required = true
					update.animation.showFieldSet(emailFormGroup)
				}, 300)
			}
		},
		displayErrors: (errorObject) => {
			const { password, repeatPassword, phone, email, terms } = errorObject

			if (password)
				document.getElementById('errorPassword').innerText = password
			if (repeatPassword)
				document.getElementById(
					'errorRepeatPassword'
				).innerText = repeatPassword
			if (phone) document.getElementById('errorPhone').innerText = phone
			if (email) document.getElementById('errorEmail').innerText = email
			if (terms) document.getElementById('errorTerms').innerText = terms
		},
		clearErrors: () => {
			document.getElementById('errorPhone').innerText = ''
			document.getElementById('errorEmail').innerText = ''
			document.getElementById('errorPassword').innerText = ''
			document.getElementById('errorRepeatPassword').innerText = ''
			document.getElementById('errorTerms').innerText = ''
		},
	}

	const validate = {
		password: () => {
			const password = document.getElementById('password').value
			let errorMessage = false

			if (validator.isEmpty(password)) {
				errorMessage = 'This field is required!'
			}

			return errorMessage
		},
		repeatPassword: () => {
			const password = document.getElementById('password').value
			const repeatPassword = document.getElementById('repeatPassword').value
			let errorMessage = false

			if (validator.isEmpty(repeatPassword)) {
				errorMessage = 'This field is required!'
			}

			if (password !== repeatPassword) {
				errorMessage = 'Passwords do not match!'
			}

			return errorMessage
		},
		phone: () => {
			const phone = document.getElementById('number').value
			let errorMessage = false

			if (validator.isEmpty(phone)) {
				errorMessage = 'This field is required!'
			} else {
				if (!validator.isMobilePhone(phone)) {
					errorMessage = 'Invalid phone number!'
				}
			}

			return errorMessage
		},
		email: () => {
			const email = document.getElementById('emailInput').value

			let errorMessage = false

			if (validator.isEmpty(email)) {
				errorMessage = 'This field is required!'
			} else {
				if (!validator.isEmail(email)) {
					errorMessage = 'Invalid email!'
				}
			}

			return errorMessage
		},
		terms: () => {
			const terms = document.getElementById('terms').checked

			if (terms) {
				return false
			} else {
				return 'You need to agree to the terms and conditions!'
			}
		},
	}

	async function updateDOM() {
		// Update the tabs in navigation
		update.nav()

		// Update the illustration
		await update.illustration()

		// Update the form (number / email)
		update.form()
	}

	// Set up event listeners on the navigation
	const headerLinks = document.getElementById('headerLinks')

	headerLinks.addEventListener('click', async function (e) {
		if (e.target.id === 'mobile') {
			e.preventDefault()
			// Update UI if state differs
			if (state.tab !== 'mobile') {
				state.tab = 'mobile'
				await updateDOM()
			}
		} else if (e.target.id === 'email') {
			e.preventDefault()
			// Update UI if state differs
			if (state.tab !== 'email') {
				state.tab = 'email'
				await updateDOM()
			}
		}
	})

	// On submit
	const form = document.getElementById('form')

	form.addEventListener('submit', function (e) {
		e.preventDefault()

		// Clear errors
		update.clearErrors()

		// Validate fields
		// If the result is false, there's no error.
		const validationErrors = {
			password: validate.password(),
			repeatPassword: validate.repeatPassword(),
			phone: state.tab === 'mobile' ? validate.phone() : false,
			email: state.tab === 'email' ? validate.email() : false,
			terms: validate.terms(),
		}

		// Check if each validation passes,
		// Get all values in an array
		const validationErrsValues = Object.values(validationErrors)

		if (validationErrsValues.every((v) => v === false)) {
			// Everything is passing, redirect to success page
			window.location.href = `/success.html`
		} else {
			// Display errors
			update.displayErrors(validationErrors)
		}

		// @todo Show loading animation

		console.log(validationErrors)
	})
})()
