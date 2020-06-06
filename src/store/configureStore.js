import {createStore , combineReducers ,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import registerReducer from '../reducers/registerReducer'
import loginReducer from '../reducers/loginReducer'
import locationReducer from '../reducers/locationReducer'

const configureStore = () =>{
    const store = createStore(combineReducers({
        register : registerReducer ,
        login : loginReducer,
        location : locationReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore