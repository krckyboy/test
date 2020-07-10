import { state } from '../main.js'
import update from './update.js'
import validate from './validate.js'

export default () => {
	// Set up event listeners on the navigation
	const headerLinks = document.getElementById('headerLinks')
	headerLinks.addEventListener('click', async function (e) {
		if (e.target.id === 'mobile') {
			e.preventDefault()
			// Update UI if state differs
			if (state.tab !== 'mobile') {
				state.tab = 'mobile'
				await update.updateDOM()
			}
		} else if (e.target.id === 'email') {
			e.preventDefault()
			// Update UI if state differs
			if (state.tab !== 'email') {
				state.tab = 'email'
				await update.updateDOM()
			}
		}
	})

	// Set up listeners on submit button
	const form = document.getElementById('form')
	form.addEventListener('mouseover', function (e) {
		if (state.loading) {
			document.getElementById('submit').disabled = true
		}
	})

	form.addEventListener('submit', function (e) {
		e.preventDefault()

		// Clear errors
		update.clearErrors()

		// Validate fields. If the result is false, there's no error.
		const validationErrors = {
			password: validate.password(),
			repeatPassword: validate.repeatPassword(),
			phone: state.tab === 'mobile' ? validate.phone() : false,
			email: state.tab === 'email' ? validate.email() : false,
			terms: validate.terms(),
		}

		// Check if each validation passes
		const validationErrsValues = Object.values(validationErrors)

		// If everything is passing, redirect to success page
		if (validationErrsValues.every((v) => v === false)) {
			// Show loading animation
			update.showLoading()

			setTimeout(() => {
				update.hideLoading()
				window.location.href = `${window.location.pathname}success.html`
			}, 1500)
		} else {
			// Display errors
			update.displayErrors(validationErrors)
		}
	})
}
