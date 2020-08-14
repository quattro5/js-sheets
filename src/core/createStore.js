// eslint-disable-next-line max-len
export function createStore(rootReducer, initialState = {}) {
	let state = rootReducer({ ...initialState }, { type: '__INIT__' })
	let subscribers = []

	return {
		subscribe(fn) {
			subscribers.push(fn)
			return {
				unsubscribe() {
					subscribers = subscribers.filter(sub => sub !== fn)
				}
			}
		},
		dispatch(action) {
			state = rootReducer(state, action)
			subscribers.forEach(sub => sub(state))
		},
		getState() {
			return JSON.parse(JSON.stringify(state))
		}
	}
}
