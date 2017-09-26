export default function reducer(state = 
	{ 
		data: {
			lookbooks: [],
			user: {
				email: '',
				id: 0,
				username: '',
				errors: ''
			}
		} 
	}, action) {
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem('jwt', action.payload.jwt)
			return Object.assign({}, state, {data: action.payload})
		case "SIGN_UP":
			return Object.assign({}, state, {data: action.payload})
		case "LOG_OUT":
		    localStorage.removeItem('jwt')
			return Object.assign({}, state, {...state})
		case "FAILED_LOGIN":
			return Object.assign({}, state, {data: {...state.data, user: {...state.user, errors: action.payload}}})
		case "GET_USER":
			return Object.assign({}, state, {data: action.payload})	
		default:
			return state
	}
}