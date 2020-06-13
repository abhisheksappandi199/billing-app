import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {startpostRegister} from '../actions/registerAction'
import {startGetLocation} from '../actions/locationAction'
import {AiOutlineEye,AiFillEye} from "react-icons/ai"
import{ TiLocationOutline,TiLocation} from 'react-icons/ti'
import logo from '../images/rsz_login.png'

 class Register extends Component {
     constructor(){
         super()
         this.state={
            username:'',
            email:'',
            password:"",
            businessname:'',
            address:'',
            toggleShow:false,
            locationadd:false
         }
     }
     handleSubmit=(e)=>{
        e.preventDefault()
        const registerdata = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password,
            businessName : this.state.businessname,
            address : this.props.location ? this.props.location: this.state.address
        }
        console.log(registerdata);
        this.setState({username:'',email:'',password:"",businessname:'',address:''})
        //redirect
        const redirect = () =>{
            return this.props.history.push('/login')
        }
        this.props.dispatch(startpostRegister(registerdata , redirect))
        //this.props.dispatch(startpostRegister(registerdata , this.props))
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
     handleLocate=(e)=>{
        e.preventDefault()
        //this.refs.btn.setAttribute("disabled", "disabled")
         this.props.dispatch(startGetLocation())
         this.setState({address:this.props.location})
         this.setState((prev)=>{
             return {
                locationadd : !prev.locationadd
             }
         })
     }
    render() {
        return (
            <div className='container'>
            <div className='row'>
            <div className='col-sm-8'><div className='imgage' style={{float:'right'}}><img src={logo} /></div></div>
            <div className='col-sm-4'><br/>
            <h1 align='center'>Welcome</h1>
            <h2 align='center'>Register</h2><br/>
             <form onSubmit={this.handleSubmit}> 
             <div className="form-group">
             <input
                className='form-control' 
                type='text'
                name='username'
                placeholder='Username'
                value={this.state.username}
                onChange={this.handleChange}
                />
                { 
                    this.props.register.errors && 
                    this.props.register.errors.username && (<small style={{color : 'red'}}>*{this.props.register.errors.username.message}</small>)
                } <br/>

                <input
                className='form-control' 
                type='text'
                name='email'
                placeholder='enter the email'
                value={this.state.email}
                onChange={this.handleChange}
                />
                { 
                    this.props.register.errors && this.props.register.errors.email && 
                    (<small style={{color : 'red'}}>*{this.props.register.errors.email.message}</small>) 
                }<br/>

                <input
                className='form-control' 
                type={this.state.toggleShow ? 'text' : 'password'}
                placeholder='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                />{this.state.toggleShow ? <AiFillEye size={24} color='black' onClick={this.handleShow}/> : <AiOutlineEye size={24} color='black' onClick={this.handleShow}/>}
                { 
                    this.props.register.errors && this.props.register.errors.password &&
                    (<small style={{color : 'red'}}>*{this.props.register.errors.password.message}</small>)
                }<br/>

                <input
                className='form-control' 
                type='text'
                placeholder='Enter the Businessname'
                name='businessname'
                value={this.state.businessname}
                onChange={this.handleChange}
                />
                { 
                    this.props.register.errors && this.props.register.errors.businessName &&
                    (<small style={{color : 'red'}}>*{this.props.register.errors.businessName.message}</small>)
                }<br/>

                <input
                className='form-control' 
                type='text'
                placeholder='Enter the Address'
                name='address'
                value={this.props.location ? this.props.location: this.state.address}
                onChange={this.handleChange}
                />{this.state.locationadd ? <TiLocation size={24} color='black' onClick={this.handleLocate}/> : <TiLocationOutline size={24} color='black' onClick={this.handleLocate}/>}
                { 
                    this.props.register.errors && this.props.register.errors.address &&
                    (<small style={{color : 'red'}}>*{this.props.register.errors.address.message}</small>)
                }<br/>

                <input
                className='btn btn-primary btn-sm col-md-8'
                type='submit'
                value='Register'
                /><br/>
                <small><Link to='/login'>already user?login..</Link></small>
            </div>
            </form>
            
            </div>
            </div>
            </div>
        )
    }
}
const mapStateToPrps = (state) =>{
    return {
        register : state.register,
        location : state.location
    }
}
export default connect(mapStateToPrps)(Register)