function fetchTemplate(templateId) {

	return function(dispatch) {
		fetch(`localhost:3000/${templateId}`)
			.then(res => res.json())
			.then(json => dispatch({ type: "FETCH_TEMPLATE", payload: json}))
	}
}

export const collectCreateData = (data) => {
	return {
		type: 'COLLECT_CREATE_DATA',
		payload: data
	}
}