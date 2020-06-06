import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'


import 'sweetalert2/src/sweetalert2.scss'

const store = configureStore()
const jsx = (
    <Provider store={store}><App/></Provider>
)
ReactDOM.render(jsx,document.getElementById('root'))