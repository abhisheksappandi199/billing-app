import React, { Component } from 'react'
import {BrowserRouter as Router , Route , Link ,Redirect} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'


 class App extends Component {
    render() {
        return (
            <div>
               <Router>
                   

                   <Route path='/register' component={Register}/>
                   <Route path='/login' component={Login}/>
                   <Redirect exact from="/register" to="login" />
               </Router>
            </div>
        )
    }
}
export default App