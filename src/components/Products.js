import React, { Component } from 'react'
import {connect } from 'react-redux'
import {Modal,Button,Table} from 'react-bootstrap'
import {startGetproduct,startAddproduct,startRemoveproduct,startUpdateProduct} from '../actions/productAction'
import {AiFillDelete,AiFillEye} from 'react-icons/ai'
import { MdModeEdit} from 'react-icons/md'
import Moment from 'react-moment'

 class Products extends Component {
    constructor(props){
        super(props)
        this.state={
            id:'',
            name:'',
            price:'',
            setShow : false,
            setShowEye : false,
            setEdit : false,
            search:"",
            modaldata:{}
        }
    }
componentDidMount(){
    if(this.props.product.length === 0){
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
handleDelete=(id)=>{
    this.props.dispatch(startRemoveproduct(id))
}
handleShoweye=(obj)=>{
    this.handleCloseEye()
    this.setState({
        modaldata : obj
    })
}
handleCloseEye =() =>{
    this.setState((prev)=>{
        return {
            setShowEye : !prev.setShowEye
        }
    })
}
handleEdit=(obj)=>{
    this.handleEditClose()
    this.setState({
        id:obj._id,
        name:obj.name,
        price:obj.price
    })
}
handleEditClose =() =>{
    this.setState((prev)=>{
        return {
            setEdit : !prev.setEdit
        }
    })
}
handleEditCloseState =()=>{
    this.setState((prev)=>{
        return {
            setEdit : !prev.setEdit,
            id:'', name:'' ,price: ''
        }
    })
}

handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
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

handleSubmit2=(e)=>{
    e.preventDefault()
    const formdata ={
        id:this.state.id,
        name : this.state.name,
        price : this.state.price
    }
    this.props.dispatch(startUpdateProduct(this.state.id ,formdata))
    this.setState({name:'',price:''})
}

render() {
return (
    <div>
        {
        localStorage.getItem("authToken") ? <div>
        <br/><br/><br/><br/>
        <h2 align='center' style={{color :'green'}}>Products</h2>
        <input style={{right:-340}} className='form-control col-sm-6 form-control-sm' type="text" value={this.state.search} onChange={this.handleChange} name="search" placeholder="enter product name" /><br/>
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
                    this.props.product.filter(pud => pud.name.includes(this.state.search)).map(e =>
                        (<tr key={e._id}>
                            <td>{e.name}</td>
                            <td>{e.price}</td>
                            
                            <td>
                                <AiFillDelete size={24} color='black' onClick={()=>{this.handleDelete(e._id)}} />

                                <AiFillEye size={24} color='black' variant="primary" onClick={()=>{this.handleShoweye(e)}} />
                                {
                                    this.state.modaldata._id === e._id && (
                                        <Modal show={this.state.setShowEye} onHide={this.handleCloseEye}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Products Details :</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h5 style={{color : ' #4d2800'}}>
                                            <label className='col-md-4'>name </label>:{" "}{this.state.modaldata.name}<br/>
                                            <label className='col-md-4'>price </label>:{" "} {this.state.modaldata.price}<br/>
                                            <label className='col-md-4'>user</label>:{" "}{this.state.modaldata.user} <br/>
                                            <label className='col-md-4'>Created_at </label>:{" "}{<Moment format="YYYY-MM-DD HH:mm">{this.state.modaldata.createdAt}</Moment>}<br/>
                                            <label className='col-md-4'>Updated_at </label>:{" "} {<Moment format="YYYY-MM-DD HH:mm">{this.state.modaldata.updatedAt}</Moment>}<br/>
                                            </h5>     
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleCloseEye}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                        </Modal>
                                    )
                                }

                            <MdModeEdit variant="primary" size={24} color='black'  onClick={()=>{this.handleEdit(e)}}/>
                            {
                                this.state.id === e._id && (
                                    <Modal show={this.state.setEdit} onHide={this.handleEditCloseState} >
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
                                                onClick={this.handleEditClose}
                                                />
                                            </div>
                                            </form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary"  onClick={this.handleEditCloseState}>
                                        Close
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                                )
                            }
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