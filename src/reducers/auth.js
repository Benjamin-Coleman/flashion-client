export default function reducer(state = 
	{ 
		user: {
			id: 0,
			lookbooks: [],
			email: '',
			username: '',
		},
		errors: []
	}, action) {
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem('jwt', action.payload.jwt)
			return Object.assign({}, state, {
				user: {
					lookbooks: action.payload.user.local.lookbooks,
					username: action.payload.user.local.username,
					id: action.payload.user._id
				},
				errors: []
			})
		case "SIGN_UP":
			return Object.assign({}, state, {
				user: {...action.payload.user}
			})
		case "LOG_OUT":
		    localStorage.removeItem('jwt')
			return Object.assign({}, state, {...state})
		case "FAILED_LOGIN":
			return Object.assign({}, state, {user: {...state.user}, errors: action.payload.data.errors})
		case "GET_USER":
			return Object.assign({}, state, {user: action.payload})	
		case "LOOKBOOK_DELETED":
			return Object.assign({}, state, {user: {...state.user, lookbooks: action.payload.data.lookbooks}})
		default:
			return state
	}
}

//test token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTljYzBlM2E5NDQyMDQzMTgwYzQ3ZWM1IiwiaWF0IjoxNTA2NjMzMjI2fQ.cv3JEqjknT0IYtaqVJXv1ohMJ67D71jsG_VErQ9EeDM
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTljYzBlM2E5NDQyMDQzMTgwYzQ3ZWM1IiwiaWF0IjoxNTA2NjMzMjQ4fQ.201DWQAJL95nHOjtVZjq3vgJ0OVFBgO9VgcvZft6ZcM
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTljYzBlM2E5NDQyMDQzMTgwYzQ3ZWM1IiwiaWF0IjoxNTA2NjMzMjg0fQ.78jiBs28EtQ2nNXSRFZXp6d6LxXckmRvIzXodd7gnLY