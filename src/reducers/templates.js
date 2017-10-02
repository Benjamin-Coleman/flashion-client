export default function reducer(state = {
 data: {
 	lookbook: {
		brandName: '',
		collectionName: '',
		products: [],
		template: 0,
		_id: '',
		styles: {},
		}
	}, 
saveResponse: false }, action) {
	switch (action.type) {
		case "COLLECT_CREATE_DATA":
			return Object.assign({}, state, {data: action.payload})
		case "SAVE_CREATE_DATA":
			return Object.assign({}, state, {saveResponse: action.payload})
		case "FETCH_LOOKBOOK":
			console.log('fetching lb', action.payload)
			return Object.assign({}, state, {data: action.payload.data})
		case "UPDATE_PRODUCT_OPACITY":
			return Object.assign({}, state, {data: {
				...state.data,
				lookbook: {
					...state.data.lookbook,
				 styles: {
				 	...state.data.lookbook.styles,
				 	opacity: action.payload
					 }
					}
				}
			})
		case "UPDATE_PRODUCT_COLOR":
			return Object.assign({}, state, {data: {
				...state.data,
				lookbook: {
					...state.data.lookbook,
				 styles: {
				 	...state.data.lookbook.styles,
				 	color1: action.payload
					 }
					}
				}
			})
		case "UPDATE_IMAGE_GRAYSCALE":
			return Object.assign({}, state, {data: {
				...state.data,
				lookbook: {
					...state.data.lookbook,
				 styles: {
				 	...state.data.lookbook.styles,
				 	imageGrayscale: action.payload
					 }
					}
				}
			})
			case "UPDATE_IMAGE_APPEAR_DURATION":
			return Object.assign({}, state, {data: {
				...state.data,
				lookbook: {
					...state.data.lookbook,
				 styles: {
				 	...state.data.lookbook.styles,
				 	imageAppearDuration: action.payload
					 }
					}
				}
			})
			case "UPDATE_INFO_APPEAR_DURATION":
			return Object.assign({}, state, {data: {
				...state.data,
				lookbook: {
					...state.data.lookbook,
				 styles: {
				 	...state.data.lookbook.styles,
				 	infoAppearDuration: action.payload
					 }
					}
				}
			})			
			case "UPDATE_FONT_FAMILY":
			return Object.assign({}, state, {data: {
				...state.data,
				lookbook: {
					...state.data.lookbook,
				 styles: {
				 	...state.data.lookbook.styles,
				 	fontFamily: action.payload
					 }
					}
				}
			})
		default:
			return state
	}
}