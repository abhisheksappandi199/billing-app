import React, { Component } from 'react'
import {connect } from 'react-redux'
import {Modal,Button,Table} from 'react-bootstrap'
import {startGetbill,startAddBill,startRemoveBill} from '../actions/billAction'
import {AiFillDelete,AiFillEye} from 'react-icons/ai'
import Select from 'react-select'
import Moment from 'react-moment'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

class Bills extends Component {
    constructor(props){
        super(props)
        this.state={
            arr:[1,2,3,4,5],
            id:'',
            date:'',
            customer:'select',
            product:'select',
            lineItems:[{product :"" , quantity:""}],
            user:'',
            createdAt:'',
            updatedAt:'',
            total:'',
            quantity:'',
            setShow : false,
            setShowEye : false,
            modalData:{},
            sortbytotal : false,
            sortbyDate:false,
            datePicker:[],
            bool : false
        }
    }
    componentDidMount(){
        if(this.props.bill.length == 0){
            this.props.dispatch(startGetbill())
        }
    }
    handleClose=() =>{
        this.setState((prev)=>{
            return {
                setShow : !prev.setShow
            }
        })
    }
    handleDelete=(id)=>{
        this.props.dispatch(startRemoveBill(id))
    }
    handleShoweye=(obj)=>{
        this.handleCloseEye()
        this.setState({
            modalData : obj
        })
    }
    handleCloseEye =() =>{
        this.setState((prev)=>{
            return {
                setShowEye : !prev.setShowEye,
                product : this.props.product
            }
        })
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        //this.state.lineItems.push({"product" : this.state.product.value , "quantity": this.state.quantity})
        const formdata ={
            customer : this.state.customer.value,
            date : this.state.date,
            lineItems : this.state.lineItems
        }
       console.log(formdata)
        this.props.dispatch(startAddBill(formdata))
    }
    handlecustomer=(customer)=>{
        this.setState({customer})
    }  
    // handle input change
    handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...this.state.lineItems];
        list[index][name] = value;
        this.setState({lineItems:list})
    }
    // handle click event of the Remove button
    handleRemoveClick = index => {
         //e.preventDefault()
         console.log(...this.state.lineItems);
         
        const list = [...this.state.lineItems];
        console.log(list);
        
        list.splice(index, 1)
        console.log(list)
        this.setState({lineItems:list})
        return false
    };
    
    // handle click event of the Add button
    handleAddClick = () => {
        this.setState({lineItems : [...this.state.lineItems, { product: "", quantity: "" }]})
    }
    handleSortByTotal = () =>{      
        this.setState((prev)=>{
            return {
                sortbytotal : !prev.sortbytotal
            }
        })  
        //this.forceUpdate()
    }
    handlesortbytotal = () =>{
        this.setState((prev)=>{
            return {
                sortbyDate : !prev.sortbyDate
            }
        })  
    }
    handleDatePicker = (date, dateString) =>{
        console.log(dateString[0],dateString[1],this.state.bool)
        this.setState({datePicker : dateString })
        console.log(dateString[0],dateString[1],this.state.bool)
    }
    handlesortDate = () =>{
        this.setState({bool:true,sortbyDate:false,sortbytotal:false})
        console.log(this.state.bool)    
    }
    render() {
        const date1 =this.state.datePicker[0]
        const date2 = this.state.datePicker[1]
        const daterender = this.state.bool && this.props.bill.filter((function (bill){ var date = new Date(bill.date)
                            return (date >= new Date(date1) && date <= new Date(date2))
                        }))
        return (
            <div>
            {
                localStorage.getItem("authToken") ? <div>
                <br/><br/><br/><br/>
                <h2 align='center' style={{color :'green'}}>Bill</h2>
                <div className='container'>
                <div className='row'>
                <div style={{float : 'right'}}>
                <Button variant="primary" size="sm" onClick={this.handleClose}>Create</Button>{" "}
                <Button variant="outline-dark" size="sm" onClick={this.handleSortByTotal}>Sort by Total</Button>{" "}
                {
                    this.state.sortbyDate 
                    ? <><RangePicker onChange={this.handleDatePicker}/>{" "}<Button variant="outline-success" size="sm" onClick={this.handlesortDate}>ok</Button></> 
                    : <Button variant="outline-dark" size="sm" onClick={this.handlesortbytotal}>Sort by Date</Button>
                }

                <Modal show={this.state.setShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Bill Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <label className="badge badge-primary" >Customer</label>
                        <Select value={this.state.customer} onChange={this.handlecustomer} 
                            options={this.props.customer.map(e =>{
                                return {value: e._id, label: e.name}
                            })}
                        /> 
                            
                        <label className="badge badge-primary">Date</label>
                        <input
                        className='form-control' 
                        type='date'
                        name='date'
                        value={this.state.date}
                        onChange={this.handleChange}
                        /><br/>
                        <label align='center' className='badge badge-secondary'>LINEITEMS</label><br/>                            
                        {
                            this.state.lineItems.map((obj,i)=>{
                                return (<div key={i}>
                                    <label className="badge badge-primary">product</label>
                                    <select name='product' value={obj.product} onChange={e => this.handleInputChange(e, i)}>
                                        <option value="select">select</option>
                                            {this.props.product.map(e =>{
                                                return  <option value={e._id} key={e._id}>{e.name}</option>
                                            })}
                                    </select>  
                                
                                    
                                    <label className="badge badge-primary">quantity</label>
                                    <select name='quantity' value={obj.quantity} onChange={e => this.handleInputChange(e, i)} >
                                        <option value="select">select</option>
                                        {this.state.arr.map(e =>{
                                            return <option value={e} key={e}>{e}</option>
                                        })}
                                    </select> {" "}
                                    {this.state.lineItems.length !== 1  && <button className='btn btn-danger btn-sm' onClick={(e) => this.handleRemoveClick(i)}>remove</button>}{" "}
                                    {this.state.lineItems.length - 1 === i && <button className='btn btn-success btn-sm' onClick={this.handleAddClick}>Add</button>}
                                </div>)
                            })
                        }
                        <input
                        className='btn btn-primary btn-sm col-md-8'
                        type='submit'
                        value='add Bill'
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
                <h2>Get Bill Details : ({this.props.bill.length})</h2><br/>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>customer name</th>
                    <th>createdAt</th>
                    <th>Total Amount</th>
                    <th>product(Qty)</th>
                    <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    (this.state.sortbytotal ? this.props.bill.sort((a,b)=> a.total - b.total) :( this.state.bool ? daterender  : this.props.bill ))
                    .map(e =>
                        (<tr key={e._id}>
                            {/* <td>{e.customer}</td> */}
                            <td>{this.props.customer.length > 0 && e.customer ? (this.props.customer.find(ele => ele._id === e.customer).name) : e.customer}</td>
                            <td>{<Moment format="DD-MM-YYYY">{e.date}</Moment>}</td>
                            <td>Rs.{e.total}/-</td>
                            {/* <td>{e.lineItems.map(ele => <li key={ele.product}>{ele.product}</li>)}</td> */}
                            <td>{e.lineItems.map((ele,index) => <li key={index}>{this.props.product.length > 0 && ele.product ? (this.props.product.find(prod => prod._id === ele.product).name) : ele.product }-({ele.quantity})</li>)}</td>
                            <td>
                            <AiFillDelete size={24} color='black' onClick={()=>{this.handleDelete(e._id)}} />
                            
                            <AiFillEye size={24} color='black' variant="primary" onClick={()=>{this.handleShoweye(e)}} />
                            {
                            this.state.modalData._id === e._id && (
                                <Modal show={this.state.setShowEye} onHide={this.handleCloseEye}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Bill Details :</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h5>
                                        <label className='col-md-4'>date </label>:{" "}{<Moment format="DD-MM-YYYY">{this.state.modalData.date}</Moment>}<br/> 
                                        <label className='col-md-4'>customer </label>:{" "}{this.props.customer.length > 0 && (this.props.customer.find(ele => ele._id === this.state.modalData.customer).name)}<br/>
                                        <label className='col-md-4' style={{color:'green'}}>LineItem </label>{" "} <ul>
                                        {this.state.modalData.lineItems.map(e=>{
                                            return (
                                            <>
                                            <hr/>
                                            <li >{e.hasOwnProperty('product') && <label>product :{" "}{this.props.product.length > 0 && (this.props.product.find(ele => ele._id === e.product)).name}</label>}</li>
                                            <li >{e.hasOwnProperty('price') && <label>price :{" "}Rs.{e.price}/-</label>}</li>
                                            <li >{e.hasOwnProperty('quantity') && <label>quantity :{" "}{e.quantity}</label>}</li>
                                            <li >{e.hasOwnProperty('subTotal') && <label>subTotal :{" "}Rs.{e.subTotal}/-</label>}</li>
                                            </>
                                            ) 
                                        })}
                                        </ul>
                                        <hr/> 
                                        <label className='col-md-4'>createdAt</label>:{" "} {<Moment format="DD-MM-YYYY">{this.state.modalData.createdAt}</Moment>}<br/>
                                        <label className='col-md-4'>updatedAt </label>:{" "} {<Moment format="DD-MM-YYYY">{this.state.modalData.updatedAt}</Moment>}<br/>    
                                        <label className='col-md-4'>total </label>:{" "} Rs.{this.state.modalData.total}/-<br/>
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
        bill : state.bill ,
        product : state.product ,
        customer : state.customer
    }
}
export default connect(mapStateToProps)(Bills)