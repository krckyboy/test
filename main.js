// Global state of the app
// Exposing it to the window for development purposes.
// @todo Move it inside the IIFE in production.
const state = {
	tab: 'mobile',
	loading: false,
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

			if (state.tab === 'mobile') {
				update.animation.hideFieldSet(emailFormGroup)
				setTimeout(() => {
					update.animation.showFieldSet(phoneFormGroup)
				}, 300)
			} else {
				update.animation.hideFieldSet(phoneFormGroup)
				setTimeout(() => {
					update.animation.showFieldSet(emailFormGroup)
				}, 300)
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

		state.loading = false
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
})()
