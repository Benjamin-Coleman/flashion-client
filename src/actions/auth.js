import axios from 'axios'

export function login(userData, history) {
	return function (dispatch) {
		const url = 'http://localhost:3000/api/login'
		// const body = JSON.stringify(userData)
		// const headers = {
		// 	method: 'post',
		// 	body: body,
		// 	headers: {
		// 		"Content-Type":"application/json",
		// 		"Accept":"application/json"
		// 	}
		// }
		axios.post('http://localhost:3000/api/login', userData)
			.then(res => {if (res.data.success) {
					dispatch({type: "LOGIN", payload: res.data})
					history.push('/', res.statusText)
				}

				else {
					dispatch({type: "FAILED_LOGIN", payload: res})
					history.push('/login')
				}})
	}
}

export function signup(userData, history) {

	return function(dispatch) {
		const url = 'http://localhost:3000/api/signup'

		// const body = JSON.stringify(userData)

		// const headers = {
		// 	method: 'POST',
		// 	body: body,
		// 	headers: {
				
		// 		"Accept":"application/json"
		// 	}
		// }
		axios.post(url, userData)
			.then(res => {
				console.log(res.data)
				dispatch({type: "LOGIN", payload: res.data})
				history.push('/', res.data)
			})
	}
}

export function deleteLookbook(lookbookId, userId){
	return function(dispatch) {
		const url = `http://localhost:3000/api/lookbooks/${lookbookId}`
		axios.delete(url, {params: {userId: userId}})
			.then( res => {
				console.log('DELETE LB RES', res);
				dispatch({ type: "LOOKBOOK_DELETED", payload: res})
			})
	}
}

export function getUserData() {
	return function(dispatch) {
		fetch('http://localhost:3000/api/currentuser', {
			method: 'GET',
			headers: {
		        'Content-Type': 'application/json',
		        'Accept': 'application/json',
		        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
			}
		})
		.then(res => res.json())
		.then(json => {console.log(json); dispatch({ type: "GET_USER", payload: json})})
	}
}

export function logout() {
	return {type: "LOG_OUT"}
}