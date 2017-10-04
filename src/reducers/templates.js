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
		case "LOOKBOOK_DELETED":
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
			case "UPDATE_PRODUCT_INFO_POSITION":
			function updateProducts(products, updatingIndex, positionX, positionY) {
				return products.map( (product, index) => {
					// this is comparing number versus string 
					if(index != updatingIndex){
						return product
					}

					return {
						...product,
						infoPositionX: positionX,
						infoPositionY: positionY
					}
				})
			}

			const updatedInfoPositionProducts = updateProducts(state.data.lookbook.products, action.index, action.posX, action.posY)
			console.log("** UPDATED POSITIONS", updatedInfoPositionProducts)
			return Object.assign({}, state, {data: {
				...state.data,
				lookbook: {
					...state.data.lookbook,
				 products: [...updatedInfoPositionProducts]
					}
				}
			})
			case "UPDATE_PRODUCT_IMAGE_POSITION":
			function updateProducts(products, updatingIndex, position) {
				return products.map( (product, index) => {
					// this is comparing number versus string 
					if(index != updatingIndex){
						return product
					}

					return {
						...product,
						imagePositionX: position
					}
				})
			}

			const updatedImagePositionProducts = updateProducts(state.data.lookbook.products, action.index, action.pos)
			return Object.assign({}, state, {data: {
				...state.data,
				lookbook: {
					...state.data.lookbook,
				 products: [...updatedImagePositionProducts]
					}
				}
			})
		default:
			return state
	}
}