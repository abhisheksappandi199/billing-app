import React, { Component } from 'react'
import {BrowserRouter as Router , Route , Link ,Switch} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import {connect} from 'react-redux'
import {RiAccountCircleLine} from "react-icons/ri"
import {WiAlien} from 'react-icons/wi'
import Account from './components/Account'
import Customers from './components/Customers'
import Products from './components/Products'
import Bills from './components/Bills'
import {Modal,Button,Table} from 'react-bootstrap'
import dummy from './components/dummy'

class App extends Component {
    constructor(){
        super()
        this.state={
            setShow1:false,
            logout:false
        }
    }
    handleLogout=()=>{
        localStorage.clear()
        this.setState({logout:true})
     }
     handleClose1 =() =>{
        this.setState((prev)=>{
            return {
                setShow1 : !prev.setShow1
            }
        })
    }
render() {
    if (!(localStorage.getItem("authToken") == true || localStorage.getItem("authToken")== false)) {
        // init variable/set default variable for item
       
    }
    
return (
    <div>  
        <Router>
            <Link to='/dummy'>dummy</Link>
            <Link to='/' align='left'  style={{ padding:'10px'}}><WiAlien size={72} color='black'/></Link>
            {
            Object.keys(this.props.login).length > 1 &&  localStorage.getItem("authToken") ? 
            (<>
                <div align='right' style={{ padding:'10px'}}>
                <Link to='/login'><button onClick={this.handleLogout} className='btn btn-outline-danger btn-sm'>Log out</button></Link>
                </div>
                <div align='right' style={{float:'right', margin:'10px'}}>
                <Link to='#'>
                    <div>
                        <RiAccountCircleLine size={32} color='black' onClick={this.handleClose1}/>
                        <Modal show={this.state.setShow1} onHide={this.handleClose1}>
                        <Modal.Header closeButton>
                        <Modal.Title>Login Details :</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5 style={{color : ' #4d2800'}} align='center'>
                            <label>Username :</label>{this.props.login.username} <br/>
                            <label>email :</label>{this.props.login.email}<br/> 
                            <label>businessName :</label> {this.props.login.businessName}<br/>
                            <label>address :</label>{this.props.login.address} <br/>
                            <label>createdAt :</label> {this.props.login.createdAt}<br/>
                            <label>updatedAt :</label> {this.props.login.updatedAt}<br/>
                            </h5>      
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose1}>
                            Close
                        </Button>
                        </Modal.Footer>
                        </Modal>
                    </div>
                </Link>
                <h5 style={{color : 'green'}}>{!this.state.logout && <p>you are loggedin..</p>}</h5>
                </div>
                

                <div align='center'>
                <h1>welcome {this.props.login.username}</h1>
                <Link to='/customers'><button className='btn btn-outline-secondary btn-sm'>Customer</button></Link> | {" "}
                <Link to='/products'><button className='btn btn-outline-secondary btn-sm'>Product</button></Link> | {" "}
                <Link to='/bills'><button className='btn btn-outline-secondary btn-sm'>Bill</button></Link>
                </div>   
            </>)
             :
            (<div>
                <Link to='/register'><button className='btn btn-outline-secondary btn-sm'>Register</button></Link> | {" "}
                <Link to='/login'><button className='btn btn-outline-secondary btn-sm'>Login</button></Link>
            </div>)
            } 
            <Switch>
                <Route path='/' component={Home} exact={true}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                {/* <Route path='/accounts' component={Account}/> */}
                <Route path='/customers' component={Customers}/>
                <Route path='/products' component={Products}/>
                <Route path='/bills' component={Bills}/>
                <Route path='/dummy' component={dummy}/>
             </Switch>     
        </Router>
    </div>
)
}
}
const mapStateToProps = (state) =>{
    return {
        login : state.login
    }
}
export default connect(mapStateToProps)(App)