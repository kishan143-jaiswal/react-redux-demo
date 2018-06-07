import {combineReducers} from 'redux'
import reducer from './reducer'
import registerReducer from './registerReducer'


export default combineReducers({
    loginReducer:reducer,
    registerReducer:registerReducer
})