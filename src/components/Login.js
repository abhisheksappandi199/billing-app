import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import {connect } from 'react-redux'
import {startPostLogin} from '../actions/loginAction'
import logo from '../images/rsz_login.png'
import {AiOutlineEye,AiFillEye} from "react-icons/ai"


 class Login extends Component {
     constructor(){
         super()
         this.state={
             email:'',
             password:'',
             toggleShow:false
         }
     }
     handleSubmit=(e)=>{
        e.preventDefault()
        const logindata = {
            email : this.state.email,
            password : this.state.password
        }
        console.log(logindata);
        this.setState({email:'' , password:''})
        //redirect
        const redirect = () =>{
            return this.props.history.push('/')
        }
        this.props.dispatch(startPostLogin(logindata,redirect))

     }
     handleChange=(e)=>{
         this.setState({[e.target.name] : e.target.value})
     }
     handleShow=(e)=>{
        e.preventDefault()
         this.setState((prev)=>{
             return {
                 toggleShow : !prev.toggleShow
             }
         })
     }
    render() {
        return (
            <div className='container'>
            <div className='row'>
            <div className='col-sm-8'><div className='imgage' style={{float:'right'}}><img src={logo} /></div></div>
            <div className='col-sm-4'><br/><br/>
            <h1 align='center'>Login</h1><br/><br/>
            
             <form onSubmit={this.handleSubmit}> 
             <div className="form-group">
                
                <input
                className='form-control' 
                type='text'
                name='email'
                placeholder='enter the email'
                value={this.state.email}
                onChange={this.handleChange}
                />
                <br/>

                <input
                className='form-control' 
                type={this.state.toggleShow ? 'text' : 'password'}
                placeholder='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                />{this.state.toggleShow ? <AiFillEye size={24} color='black' onClick={this.handleShow}/> : <AiOutlineEye size={24} color='black' onClick={this.handleShow}/>}
                {/* <small><Link to='/register'>Forget password?</Link></small> */}
                <br/><br/>
                { 
                    this.props.login.errors && (<small style={{color : 'red'}}>*{this.props.login.errors}</small>)
                }
                
                <input
                className='btn btn-primary btn-sm col-md-8'
                type='submit'
                value='Login'
                /><br/>
                <small><Link to='/register'>New to App?Register..</Link></small>
            </div>
            </form>
            </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        login : state.login
    }
}
export default connect(mapStateToProps)(Login)