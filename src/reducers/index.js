import { combineReducers } from 'redux'
import viewport from './uiReducer'
import templates from './templates'
import auth from './auth'

const reducers = combineReducers({
	viewport,
	templates,
	auth
})

export default reducers