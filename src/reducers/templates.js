export default function reducer(state = { data: {}, saveResponse: false, customizations: {} }, action) {
	switch (action.type) {
		case "COLLECT_CREATE_DATA":
			return Object.assign({}, state, {data: action.payload})
		case "SAVE_CREATE_DATA":
			return Object.assign({}, state, {saveResponse: action.payload})
		case "FETCH_LOOKBOOK":
			console.log('fetching lb')
			return Object.assign({}, state, {data: action.payload})
		case "FETCH_CUSTOMIZATIONS":
			return Object.assign({}, state, {customizations: action.payload})
		default:
			return state
	}
}