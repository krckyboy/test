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
	}

	const validate = {
		passwords: () => {
			const password = document.getElementById('password').value
			const repeatPassword = document.getElementById('repeatPassword').value

			const errObj = {
				password: false,
				repeatPassword: false,
				passwordsMatch: false,
			}

			if (validator.isEmpty(password)) {
				errObj.password = 'Please enter password.'
			}

			if (validator.isEmpty(repeatPassword)) {
				errObj.repeatPassword = 'Please repeat password.'
			}

			if (!errObj.password && !errObj.repeatPassword) {
				if (password !== repeatPassword) {
					errObj.passwordsMatch = 'Passwords should match.'
				}
			}

			// Get all values in an array
			const errObjValues = Object.values(errObj)

			// Return false if no error
			// Return the errObj if validation fails
			if (errObjValues.every((v) => v === false)) {
				return false
			} else {
				return errObj
			}
		},
		phone: () => {
			const phone = document.getElementById('number').value

			const errObj = {
				number: false,
				invalidNumber: false,
			}

			if (validator.isEmpty(phone)) {
				errObj.number = 'Please enter phone number.'
			} else {
				if (!validator.isMobilePhone(phone)) {
					errObj.invalidNumber = 'Please enter valid phone number.'
				}
			}

			// Get all values in an array
			const errObjValues = Object.values(errObj)

			// Return false if no error
			// Return the errObj if validation fails
			if (errObjValues.every((v) => v === false)) {
				return false
			} else {
				return errObj
			}
		},
		email: () => {
			const email = document.getElementById('emailInput').value

			const errObj = {
				email: false,
				invalidEmail: false,
			}

			if (validator.isEmpty(email)) {
				errObj.email = 'Please enter your email.'
			} else {
				if (!validator.isEmail(email)) {
					errObj.invalidEmail = 'Please enter valid email.'
				}
			}

			// Get all values in an array
			const errObjValues = Object.values(errObj)

			// Return false if no error
			// Return the errObj if validation fails
			if (errObjValues.every((v) => v === false)) {
				return false
			} else {
				return errObj
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

		// Validate fields
		// If the result is false, there's no error.
		const validationErrors = {
			password: validate.passwords(),
			phone: state.tab === 'mobile' ? validate.phone() : false,
			email: state.tab === 'email' ? validate.email() : false,
		}

		// Check if validation passes
		let validationPasses = null

		// Get all values in an array
		const validationErrsValues = Object.values(validationErrors)

		// Return false if no error
		// Return the errObj if validation fails
		if (validationErrsValues.every((v) => v === false)) {
			validationPasses = true
		} else {
			validationPasses = false
		}

		// Show loading animation
		// @todo

		// If validation fails, show errors
		if (validationPasses) {
			window.location.href = `/success.html`
		}

		// If validation passes, redirect to success page

		console.log(validationPasses)
	})
})()
