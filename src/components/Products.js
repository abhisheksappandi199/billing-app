import React, { Component } from 'react'
import {connect } from 'react-redux'
import {Modal,Button,Table} from 'react-bootstrap'
import {startGetproduct,startAddproduct,startRemoveproduct,startUpdateProduct} from '../actions/productAction'
import {AiFillDelete,AiFillEye} from 'react-icons/ai'
import { MdModeEdit} from 'react-icons/md'

 class Products extends Component {
    constructor(props){
        super(props)
        this.state={
            id:'',
            name:'',
            price:'',
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
    componentDidMount(){
        if(this.props.product.length == 0){
            this.props.dispatch(startGetproduct())
        }
    }
    handleClose =() =>{
        this.setState((prev)=>{
            return {
                setShow : !prev.setShow
            }
        })
    }
    handleShow =()=>{
        this.setState({setShow:true})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formdata ={
            name : this.state.name,
            price : this.state.price
        }
        this.setState({name:'',price:''})
        this.props.dispatch(startAddproduct(formdata))
        
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleDelete=(id)=>{
        this.props.dispatch(startRemoveproduct(id))
    }
    handleEdit1=(obj)=>{
        this.handleClose1()
        this.setState({
            name:obj.name,
            price:obj.price,
            user :obj.user,
            createdAt:obj.createdAt,
            updatedAt:obj.updatedAt
        })
    }
    handleClose1 =() =>{
        this.setState((prev)=>{
            return {
                setShow1 : !prev.setShow1
            }
        })
    }
    handleEdit2=(obj)=>{
        this.handleClose2()
        this.setState({
            id:obj._id,
            name:obj.name,
            price:obj.price,
            user :obj.user,
            createdAt:obj.createdAt,
            updatedAt:obj.updatedAt
        })
    }
    handleClose2 =() =>{
        this.setState((prev)=>{
            return {
                setShow2 : !prev.setShow2
            }
        })
    }
    handleSubmit2=(e)=>{
        e.preventDefault()
        const formdata ={
            id:this.state.id,
            name : this.state.name,
            price : this.state.price
        }
        //this.setState({name:'',mobile:'',email:''})
        this.props.dispatch(startUpdateProduct(this.state.id ,formdata))
     
    }
    render() {
        return (
            <div>
                {
                    localStorage.getItem("authToken") ? <div>
                    <br/>
                <h2 align='center' style={{color :'green'}}>Products</h2>
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
                            <h2>Add Product Details</h2><br/>
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
                                placeholder='Enter the price'
                                name='price'
                                value={this.state.price}
                                onChange={this.handleChange}
                                /><br/>

                                <input
                                className='btn btn-primary btn-sm col-md-8'
                                type='submit'
                                value='add '
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
                <h2>Get Product Details : ({this.props.product.length})</h2><br/>
                <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>product name</th>
                            <th>Price</th>
                            <th>actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                              this.props.product.map(e =>
                                 (<tr key={e._id}>
                                     <td>{e.name}</td>
                                     <td>{e.price}</td>
                                     
                                     <td>
                                         <AiFillDelete size={24} color='black' onClick={()=>{this.handleDelete(e._id)}} />

                                         <AiFillEye size={24} color='black' variant="primary" onClick={()=>{this.handleEdit1(e)}} />
                                         <Modal show={this.state.setShow1} onHide={this.handleClose1}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Products Details :</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h5 style={{color : ' #4d2800'}} align='center'>
                                                <label>name :</label>{this.state.name}<br/>
                                                <label>price :</label> {this.state.price}<br/>
                                                <label>user :</label>{e.user} <br/>
                                                <label>createdAt :</label> {e.createdAt}<br/>
                                                <label>updatedAt :</label> {e.updatedAt}<br/>
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
                                                    <h2>Edit product Details</h2><br/>
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
                                                        placeholder='Enter the price'
                                                        name='price'
                                                        value={this.state.price}
                                                        onChange={this.handleChange}
                                                        /><br/>

                                                        <input
                                                        className='btn btn-primary btn-sm col-md-8'
                                                        type='submit'
                                                        value='edit product'
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
                    <h3 align='center' style={{color : 'red'}}>please Login...!!!</h3>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        product : state.product
    }
}
export default connect(mapStateToProps)(Products)