import axios from 'axios'

export function login(userData, history) {
	return function (dispatch) {
		const url = 'http://localhost:3000/api/login'
		const body = JSON.stringify(userData)
		const headers = {
			method: 'post',
			body: body,
			headers: {
				"Content-Type":"application/json",
				"Accept":"application/json"
			}
		}

		// fetch(url, headers)
		// 	.then((res) => res.json())
		// 	.then((json) => {
		// 		if (json.jwt) {
		// 			dispatch({type: "LOGIN", payload: json})
		// 			history.push('/', json.success)
		// 		}

		// 		else {
		// 			dispatch({type: "FAILED_LOGIN", payload: json.message})
		// 			history.push('/login')
		// 		}
		// 	})
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

		const body = JSON.stringify(userData)

		const headers = {
			method: 'POST',
			body: body,
			headers: {
				
				"Accept":"application/json"
			}
		}

		// fetch(url, headers)
		// 	.then((res) => res.json())
		// 	.then((json) => {
		// 		dispatch({type: "LOGIN", payload: json})
		// 		history.push('/', json.success)
		// 	})
		axios.post(url, userData)
			.then(res => {
				console.log(res.data)
				dispatch({type: "LOGIN", payload: res.data})
				history.push('/', res.data)
			})
	}
}

// export function getUserData(jwt){
//     return function(dispatch) {
//       const url = 'http://localhost:3000/api/v1/currentuser'

//       const headers = {
//         method: 'get',
//         headers: {
//           "Authorization":`Bearer ${jwt}`,
//           "Accept":"application/json"
//         }
//       }

//       fetch(url, headers)
//       .then(res => res.json())
//       .then(json => {
//         if (json.lookbooks) {
//           dispatch({type: "GET_USER", payload: json})
//         }
//       })
//     }
// }

// export function getUserData() {

// 	var instance = axios.create({
// 		// url: 'http://localhost:3000/api/currentuser',
// 		auth: `Bearer ${localStorage.getItem("jwt")}`
// 	})

// 	return function(dispatch) {
// 		const url = 'http://localhost:3000/api/currentuser'

// 		// axios.get({url: url, auth: `Bearer ${localStorage.getItem("jwt")}`})
// 		// 	.then(res => {
// 		// 		dispatch({ type: "GET_USER", payload: res})
// 		// 	})
// 		instance.get(url).then(res => {
// 				dispatch({ type: "GET_USER", payload: res})
// 			})
// 	}
// }

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