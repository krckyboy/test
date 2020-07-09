import { state } from '../main.js'

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

		if (password) document.getElementById('errorPassword').innerText = password
		if (repeatPassword)
			document.getElementById('errorRepeatPassword').innerText = repeatPassword
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
	showLoading: () => {
		const spinner = document.getElementById('spinner')
		const mainContainer = document.getElementById('main')
		const submitButton = document.getElementById('submit')

		submitButton.disabled = true
		submitButton.classList.add('disabled')
		spinner.classList.remove('hide')
		spinner.classList.remove('offTheScreen')
		mainContainer.classList.add('dimmed')
	},
	hideLoading: () => {
		const spinner = document.getElementById('spinner')
		const mainContainer = document.getElementById('main')
		const submitButton = document.getElementById('submit')

		submitButton.disabled = false
		submitButton.classList.remove('disabled')
		spinner.classList.add('hide')
		spinner.classList.add('offTheScreen')
		mainContainer.classList.remove('dimmed')
	},
	updateDOM: async () => {
		// Update the tabs in navigation
		update.nav()

		// Update the illustration
		await update.illustration()

		// Update the form (number / email)
		update.form()
	},
}

export default update
