// Global state of the app
export const state = {
	tab: 'mobile',
	loading: false,
	timeoutFunction: null,
}

import eventListeners from './scripts/eventListeners.js'
;(function () {
	eventListeners()
})()
