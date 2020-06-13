import {createStore , combineReducers ,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import registerReducer from '../reducers/registerReducer'
import loginReducer from '../reducers/loginReducer'
import locationReducer from '../reducers/locationReducer'
import customerReducer from '../reducers/customerReducer'
import productReducer from '../reducers/productReducer'
import billReducer from '../reducers/billReducer'

const configureStore = () =>{
    const store = createStore(combineReducers({
        register : registerReducer ,
        login : loginReducer,
        location : locationReducer,
        customer : customerReducer ,
        product : productReducer ,
        bill : billReducer  
    }), applyMiddleware(thunk))
    return store
}
export default configureStore