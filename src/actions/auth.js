export function login(userData, history) {
	return function (dispatch) {
		const url = 'http://localhost:3000/api/v1/login'
		const body = JSON.stringify(userData)
		const headers = {
			method: 'post',
			body: body,
			headers: {
				"Content-Type":"application/json",
				"Accept":"application/json"
			}
		}
		fetch(url, headers)
			.then((res) => res.json())
			.then((json) => {
				if (json.jwt) {
					dispatch({type: "LOGIN", payload: json})
					history.push('/', json.success)
				}

				else {
					dispatch({type: "FAILED_LOGIN", payload: json.message})
					history.push('/login')
				}
			})
	}
}

export function signup(userData, history) {

	return function(dispatch) {
		const url = 'http://localhost:3000/api/v1/signup'

		const body = JSON.stringify(userData)

		const headers = {
			method: 'post',
			body: body,
			headers: {
				"Content-Type":"application/json",
				"Accept":"application/json"
			}
		}

		fetch(url, headers)
			.then((res) => res.json())
			.then((json) => {
				dispatch({type: "LOGIN", payload: json})
				history.push('/', json.success)
			})
	}
}

export function getUserData(jwt){
    return function(dispatch) {
      const url = 'http://localhost:3000/api/v1/currentuser'

      const headers = {
        method: 'get',
        headers: {
          "Authorization":`Bearer ${jwt}`,
          "Accept":"application/json"
        }
      }

      fetch(url, headers)
      .then(res => res.json())
      .then(json => {
        if (json.lookbooks) {
          dispatch({type: "GET_USER", payload: json})
        }
      })
    }
}

export function logout() {
	return {type: "LOG_OUT"}
}