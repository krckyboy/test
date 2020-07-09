export default {
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
