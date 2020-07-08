import React, { Component } from 'react'
import {BrowserRouter as Router , Route , Link ,Switch} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import {connect} from 'react-redux'
import {RiAccountCircleLine} from "react-icons/ri"
import {TiHome} from 'react-icons/ti'
import Customers from './components/Customers'
import Products from './components/Products'
import Bills from './components/Bills'
import {Modal,Button} from 'react-bootstrap'
import Moment from 'react-moment'
import 'antd/dist/antd.css'

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
return (
    <div>  
        <Router>
            <Link to='/' align='left'  style={{ padding:'10px'}}><TiHome size={38} color='black'/></Link>
            {
            Object.keys(this.props.login).length > 1 &&  localStorage.getItem("authToken") ? 
            (<>
                <div style={{position :'absolute', top:10, right:10}}>
                <Link to='#'>
                    <>
                        <RiAccountCircleLine size={32} color='black' onClick={this.handleClose1}/>
                        <Modal show={this.state.setShow1} onHide={this.handleClose1}>
                        <Modal.Header closeButton>
                        <Modal.Title>Account Details :</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5 style={{color : ' #4d2800'}}>
                            <label className='col-md-4'>Username </label>:{" "}{this.props.login.username} <br/>
                            <label className='col-md-4'>email </label>:{" "}{this.props.login.email}<br/> 
                            <label className='col-md-4'>businessName </label> :{" "}{this.props.login.businessName}<br/>
                            <label className='col-md-4'>address </label>:{" "}{this.props.login.address} <br/>
                            <label className='col-md-4'>createdAt </label> :{" "}{<Moment format="YYYY-MM-DD HH:mm">{this.props.login.createdAt}</Moment>}<br/>
                            <label className='col-md-4'>updatedAt </label> :{" "}{<Moment format="YYYY-MM-DD HH:mm">{this.props.login.updatedAt}</Moment>}<br/>
                            </h5>      
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose1}>
                            Close
                        </Button>
                        </Modal.Footer>
                        </Modal>
                    </>
                </Link>{" "}
                <Link align='right' to='/login'><button onClick={this.handleLogout} className='btn btn-outline-danger btn-sm'>Log out</button></Link>        
                </div>
                <div style={{position :'absolute', top:0 , left:500}}>
                <h1>welcome {this.props.login.username}</h1><br/>
                <Link to='/dashboard'><button className='btn btn-outline-secondary btn-sm'>Dashboard</button></Link> | {" "}
                <Link to='/customers'><button className='btn btn-outline-secondary btn-sm'>Customer</button></Link> | {" "}
                <Link to='/products'><button className='btn btn-outline-secondary btn-sm'>Product</button></Link> | {" "}
                <Link to='/bills'><button className='btn btn-outline-secondary btn-sm'>Bill</button></Link>
                {/* <Link to='/dummy'><button className='btn btn-outline-secondary btn-sm'>Dummy</button></Link> | {" "} */}
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
                <Route path='/dashboard' component={Home}/>
                <Route path='/customers' component={Customers}/>
                <Route path='/products' component={Products}/>
                <Route path='/bills' component={Bills}/>
                {/* <Route path='/dummy' component={Dummy}/> */}
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