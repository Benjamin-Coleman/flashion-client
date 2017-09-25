export function setImageToUpload(headers, imageData){
	return function (dispatch) {
		const url = 'http://localhost:3000/api/v1/testimageupload'
		const body = JSON.stringify(imageData)
		const options = {
			method: 'post',
			body: body,
			headers: headers
		}
		fetch(url, options)
			.then((res) => res.json())
			.then((json) => {
				console.log(json)
			})
	}
}