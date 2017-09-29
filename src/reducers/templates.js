export default function reducer(state = {
 data: {
 	lookbook: {
	brandName: '',
	collectionName: '',
	products: [],
	template: 0,
	_id: ''
		}
	}, 
saveResponse: false }, action) {
	switch (action.type) {
		case "COLLECT_CREATE_DATA":
			return Object.assign({}, state, {data: action.payload})
		case "SAVE_CREATE_DATA":
			return Object.assign({}, state, {saveResponse: action.payload})
		case "FETCH_LOOKBOOK":
			console.log('fetching lb', action.payload)
			return Object.assign({}, state, {data: action.payload.data})
		// case "FETCH_CUSTOMIZATIONS":
		// 	return Object.assign({}, state, {customizations: action.payload})
		default:
			return state
	}
}