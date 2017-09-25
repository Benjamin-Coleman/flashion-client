export default function reducer(state = 
	{ 
		data: {
		} 
	}, action) {
		case "SET_IMAGE":
			console.log(action.payload)
			return Object.assign({}, state, {data: action.payload})	
		default:
			return state
	}
}