export default function reducer(state = 
	{ 
		data: {
			lookbooks: [],
			user: {
				email: '',
				id: 0,
				username: ''
			}
		} 
	}, action) {
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem('jwt', action.payload.jwt)
			return {data: action.payload.user}
		case "SIGN_UP":
			return Object.assign({}, state, {data: action.payload})
		case "LOG_OUT":
		    localStorage.removeItem('jwt')
			return {data:{}} 
		case "GET_USER":
			return Object.assign({}, state, {data: action.payload})	
		default:
			return state
	}
}