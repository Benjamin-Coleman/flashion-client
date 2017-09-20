export default function reducer(state = { data: {} }, action) {
	switch (action.type) {
		case "COLLECT_CREATE_DATA":
			return Object.assign({}, state, {data: action.payload})
		default:
			return state
	}
}