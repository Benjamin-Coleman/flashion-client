import axios from 'axios'

function fetchTemplate(templateId) {

	return function(dispatch) {
		fetch(`localhost:3000/${templateId}`)
			.then(res => res.json())
			.then(json => dispatch({ type: "FETCH_TEMPLATE", payload: json}))
	}
}

export function fetchLookbook(lookbookId){
	return function(dispatch) {
		const url = `http://localhost:3000/api/lookbooks/${lookbookId}`
		// const options = {
		// 	header: { "Content-Type": "application/json", "Accept": "application/json"}
		// }
		axios.get(url)
			.then((res) => dispatch({ type:"FETCH_LOOKBOOK", payload: res}))
	}
}

export function fetchCustomizations(lookbookId){
	return function(dispatch) {
		const url = `http://localhost:3000/api/v1/customizations/${lookbookId}`
		const options = {
			header: { "Content-Type": "application/json", "Accept": "application/json"}
		}
		fetch(url, options)
			.then((res) => res.json())
			.then((json) => {
				dispatch({ type:"FETCH_LOOKBOOK", payload: json})
			})
	}
}

export const collectCreateData = (data) => {
	return {
		type: 'COLLECT_CREATE_DATA',
		payload: data
	}
}

export function saveCreateData(data, user_id, history) {
	console.log(data, user_id)
	return function(dispatch) {
		const url = `http://localhost:3000/api/lookbooks/new`
		axios.post(url, {...data, user: user_id})
			.then(res => {
				console.log(res)
				dispatch({ type: "SAVE_CREATE_DATA", payload: res})
				history.push(`/lookbooks/${res.data._id}`)
			})
	}
}

export function saveEditedLookbook(data, history) {
	console.log(data, data.lookbookId)
	return function(dispatch) {
		const url = `http://localhost:3000/api/lookbooks/${data.lookbook._id}/edit`
		axios.post(url, {...data})
			.then(res => {
				console.log(res)
				dispatch({ type: "LOOKBOOK_UPDATED", payload: res})
			})
	}
}

export function updateProductOpacity(data) {
	return { type: "UPDATE_PRODUCT_OPACITY", payload: data}
}

export function updateProductColor(data) {
	return { type: "UPDATE_PRODUCT_COLOR", payload: data}
}

export function updateImageGrayscale(data) {
	return { type: "UPDATE_IMAGE_GRAYSCALE", payload: data}
}

export function updateImageAppearDuration(data) {
	return { type: "UPDATE_IMAGE_APPEAR_DURATION", payload: data}
}

export function updateInfoAppearDuration(data) {
	return { type: "UPDATE_INFO_APPEAR_DURATION", payload: data}
}




