import { combineReducers } from 'redux'
import viewport from './uiReducer'
import templates from './templates'

const reducers = combineReducers({
	viewport,
	templates
})

export default reducers