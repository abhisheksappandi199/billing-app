import React, { Component } from 'react'
import {connect } from 'react-redux'
import {Modal,Button,Table} from 'react-bootstrap'
import {startGetcustomer,startAddCustomer,startUpdateCustomer,startRemoveCustomer} from '../actions/customerAction'
import {AiFillDelete,AiFillEye} from 'react-icons/ai'
import { MdModeEdit} from 'react-icons/md'
import logo from '../images/rsz_login.png'

class Customers extends Component {
     constructor(props){
         super(props)
         this.state={
             id:'',
             name:'',
             mobile:'',
             email:'',
             user:'',
             createdAt:'',
             updatedAt:'',
             setShow : false,
            show:false,
            setShow1 : false,
            show1 : false,
            setShow2 : false,
            show2 : false
         }
     }
     handleClose =() =>{
        this.setState((prev)=>{
            return {
                setShow : !prev.setShow
            }
        })
       // this.setState({name:'',mobile:'',email:''})
    }
    handleShow =()=>{
        this.setState({setShow:true})
    }
    handleClose1 =() =>{
        this.setState((prev)=>{
            return {
                setShow1 : !prev.setShow1
            }
        })
    }
    handleShow1 =()=>{
        this.setState({setShow1:true})
    }
    handleClose2 =() =>{
        this.setState((prev)=>{
            return {
                setShow2 : !prev.setShow2
            }
        })
    }
    handleShow2 =()=>{
        this.setState({setShow2:true})
    }
    componentDidMount(){
        if(this.props.customer.length == 0){
            this.props.dispatch(startGetcustomer())
        }
        // const image =<div className='imgage' style={{float:'right'}}><img src={logo} /></div>
        // document.body.style.backgroundImage = image

    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formdata ={
            name : this.state.name,
            mobile : this.state.mobile,
            email : this.state.email
        }
        //this.setState({name:'',mobile:'',email:''})
        this.props.dispatch(startAddCustomer(formdata))
        
    }
    handleSubmit2=(e)=>{
        e.preventDefault()
        const formdata ={
            id:this.state.id,
            name : this.state.name,
            mobile : this.state.mobile,
            email : this.state.email
        }
        //this.setState({name:'',mobile:'',email:''})
        this.props.dispatch(startUpdateCustomer(this.state.id ,formdata))
     
    }
    handleClick =()=>{
        this.setState((prev)=>{
            return {
                show : !prev.show
            }
        })
    }
    handleShowEach=(id)=>{
        const cust = this.props.customer.find(e => e._id == id)
        console.log(cust);
        
    }
    handleEdit1=(obj)=>{
        this.handleClose1()
        this.setState({
            name:obj.name,
            mobile:obj.mobile,
            email:obj.email,
            user :obj.user,
            createdAt:obj.createdAt,
            updatedAt:obj.updatedAt
        })
    }
    handleEdit2=(obj)=>{
        this.handleClose2()
        this.setState({
            id:obj._id,
            name:obj.name,
            mobile:obj.mobile,
            email:obj.email,
            user :obj.user,
            createdAt:obj.createdAt,
            updatedAt:obj.updatedAt
        })
    }
    handleClick1=(e)=>{
        e.preventDefault()
        alert('fjv')
        console.log('clicked');
        
    }
    handleDelete=(id)=>{
        this.props.dispatch(startRemoveCustomer(id))
    }
    render() {
       
        return (
            <div>
                { localStorage.getItem("authToken")  ? 
                 <div>
                    <br/>
                <h2 align='center' style={{color :'green'}}>Customers</h2>
                <div className='container'>
                <div className='row'>
                <div style={{float : 'right'}}>
                    <Button variant="primary" onClick={this.handleClose}>
                    Create 
                </Button>

                <Modal show={this.state.setShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.handleSubmit}> 
                            <h2>Add Customer Details</h2><br/>
                            <div className="form-group">
                                <input
                                className='form-control' 
                                type='text'
                                name='name'
                                placeholder='Enter the name'
                                value={this.state.name}
                                onChange={this.handleChange}
                                /><br/>
                                
                                <input
                                className='form-control' 
                                type='text'
                                name='mobile'
                                placeholder='Phone no.'
                                value={this.state.mobile}
                                onChange={this.handleChange}
                                /><br/>
                            
                                <input
                                className='form-control' 
                                type='text'
                                placeholder='Enter the email'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleChange}
                                /><br/>

                                <input
                                className='btn btn-primary btn-sm col-md-8'
                                type='submit'
                                value='add customer'
                                onClick={this.handleClose}
                                />
                            </div>
                            </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary"  onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                </div>
    
                <div className='col-sm-12'>
                <h2>Get Customer Details : ({this.props.customer.length})</h2><br/>
                <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>customer name</th>
                            <th>Mobile</th>
                            <th>email</th>
                            
                            <th>actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                              this.props.customer.map(e =>
                                 (<tr key={e._id}>
                                     <td>{e.name}</td>
                                     <td>{e.mobile}</td>
                                     <td>{e.email}</td>
                                     
                                     <td>
                                         <AiFillDelete size={24} color='black' onClick={()=>{this.handleDelete(e._id)}} />
                                            
                                        <AiFillEye size={24} color='black' variant="primary" onClick={()=>{this.handleEdit1(e)}} />
                                        <Modal show={this.state.setShow1} onHide={this.handleClose1}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Customer Details :</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h5 style={{color : ' #4d2800'}} align='center'>
                                                <label>name :</label>{this.state.name}<br/>
                                                <label>mobile :</label>{this.state.mobile}<br/> 
                                                <label>email :</label> {this.state.email}<br/>
                                                <label>user :</label>{this.state.user} <br/>
                                                <label>createdAt :</label> {this.state.createdAt}<br/>
                                                <label>updatedAt :</label> {this.state.updatedAt}<br/>
                                                </h5>     
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose1}>
                                                Close
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <MdModeEdit variant="primary" size={24} color='black'  onClick={()=>{this.handleEdit2(e)}}/>
                                        <Modal show={this.state.setShow2} onHide={this.handleClose2} >
                                            <Modal.Header closeButton>
                                            <Modal.Title>Udate</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <form onSubmit={this.handleSubmit2}> 
                                                    <h2>Edit Customer Details</h2><br/>
                                                    <div className="form-group">
                                                        <input
                                                        className='form-control' 
                                                        type='text'
                                                        name='name'
                                                        placeholder='Enter the name'
                                                        value={this.state.name}
                                                        onChange={this.handleChange}
                                                        /><br/>
                                                        
                                                        <input
                                                        className='form-control' 
                                                        type='text'
                                                        name='mobile'
                                                        placeholder='Phone no.'
                                                        value={this.state.mobile}
                                                        onChange={this.handleChange}
                                                        /><br/>
                                                    
                                                        <input
                                                        className='form-control' 
                                                        type='text'
                                                        placeholder='Enter the email'
                                                        name='email'
                                                        value={this.state.email}
                                                        onChange={this.handleChange}
                                                        /><br/>

                                                        <input
                                                        className='btn btn-primary btn-sm col-md-8'
                                                        type='submit'
                                                        value='edit customer'
                                                        onClick={this.handleClose2}
                                                        />
                                                    </div>
                                                    </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary"  onClick={this.handleClose2}>
                                                Close
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        
                                     </td>
                                 </tr>))
                          }
                        </tbody>
                      </Table>
                </div>
                </div>
                </div>
                 </div>
                 :
                 <h3 align='center' style={{color : 'red'}}>please Login...!!!</h3>}
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        customer : state.customer
    }
}
export default connect(mapStateToProps)(Customers)