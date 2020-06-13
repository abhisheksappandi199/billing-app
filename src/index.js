import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import 'sweetalert2/src/sweetalert2.scss'
import {startGetUser } from './actions/loginAction'
import {startGetcustomer} from './actions/customerAction'
import {startGetproduct} from './actions/productAction'
import {startGetbill} from './actions/billAction'

const store = configureStore()
console.log('initial state',store.getState())

store.subscribe(()=>{
    console.log(store.getState())
})
//handle page reload
if(localStorage.getItem("authToken")){
    store.dispatch(startGetUser())
    store.dispatch(startGetcustomer())
    store.dispatch(startGetproduct())
    store.dispatch(startGetbill())
}
const jsx = (
    <Provider store={store}><App/></Provider>
)
ReactDOM.render(jsx,document.getElementById('root'))