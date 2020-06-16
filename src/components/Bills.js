import React, { Component } from 'react'
import {connect } from 'react-redux'
import {Modal,Button,Table} from 'react-bootstrap'
import {startGetbill,startAddBill,startRemoveBill} from '../actions/billAction'
import {AiFillDelete,AiFillEye} from 'react-icons/ai'
import { MdModeEdit} from 'react-icons/md'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

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
           show:false,
           setShow1 : false,
           show1 : false,
           setShow2 : false,
           show2 : false
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
       console.log(formdata);
        //this.setState({name:'',mobile:'',email:''})
        this.props.dispatch(startAddBill(formdata))
    }
    handleDelete=(id)=>{
        this.props.dispatch(startRemoveBill(id))
    }
    handleEdit1=(obj)=>{
        this.handleClose1()
        console.log(obj);
        
        this.setState({
            id:obj._id,
            date:obj.date,
            customer:obj.customer,
            lineItems:obj.lineItems,
            user:obj.user,
            createdAt:obj.createdAt,
            updatedAt:obj.updatedAt,
            total:obj.total,
            quantity:obj.lineItems.quantity
        })
    }
    handleClose1 =() =>{
        this.setState((prev)=>{
            return {
                setShow1 : !prev.setShow1
            }
        })
    }
   
    handlecustomer=(customer)=>{
        this.setState({customer})
    }
    handleproduct=(pppp)=>{
        this.setState(prevState => ({
            lineItems: prevState.lineItems.map(
            obj => Object.assign(obj, { product : pppp.value }) 
          )
        }));
    }
    handlequantity=(pppp)=>{
        this.setState(prevState => ({
            lineItems: prevState.lineItems.map(
            obj => Object.assign(obj, { quantity : pppp.value }) 
          )
        }));
    }
    handleAdditem=(e)=>{
        e.preventDefault()
        this.setState((prevState) => ({
            lineItems: [...prevState.lineItems, {product:"", quantity:""}]
          }))
    }
    handleRemovitem=(e)=>{
        e.preventDefault()
        this.setState((prevState) => ({
            lineItems: prevState.lineItems.filter(e => e.product == '')
          }))
    }
    render() {
        return (
            <div>
            {
                localStorage.getItem("authToken") ? <div>
                <br/> 
                <h2 align='center' style={{color :'green'}}>Bill</h2>
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
                            <h2>Add Bill Details</h2>
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
                                <button className='btn btn-success btn-sm' onClick={this.handleAdditem}>add</button>{"  "}
                                {
                                    this.state.lineItems.map((val,index)=>{
                                        return (<div>
                                            <label className="badge badge-primary">product</label>
                                            <button className='btn btn-danger btn-sm' onClick={this.handleRemovitem}>remove</button>

                                            <Select value={this.state.lineItems.product} onChange={this.handleproduct}
                                            options={this.props.product.map(e =>{
                                                    return {value: e._id, label: e.name}
                                                })}
                                            />  
                                        
                                            
                                            <label className="badge badge-primary">quantity</label>
                                            <Select value={this.state.lineItems.quantity} onChange={this.handlequantity} 
                                            options={this.state.arr.map(e =>{
                                                    return {value: e , label: e}
                                                })}
                                            />
                                            {/* <select className='form-control'  value={this.state.lineItems.quantity} onChange={this.handlequantity} name='quantity'> 
                                                <option >select</option>
                                                {
                                                    this.state.arr.map(e => {
                                                        return (
                                                            <option value={e} key={e}>{e}</option>
                                                        )
                                                    })
                                                }
                                            </select><br/> */}
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
                    <th>quantity</th>
                    <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.bill.map(e =>
                            (<tr key={e._id}>
                                <td>{e.customer}</td>
                                <td>{e.createdAt}</td>
                                <td>{e.total}</td>
                                <td>{e.lineItems.map(ele => <li>{ele.quantity}</li>)}</td>
                                <td>
                                <AiFillDelete size={24} color='black' onClick={()=>{this.handleDelete(e._id)}} />
                               
                                <AiFillEye size={24} color='black' variant="primary" onClick={()=>{this.handleEdit1(e)}} />
                                        <Modal show={this.state.setShow1} onHide={this.handleClose1}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Bill Details :</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h5 style={{color : ' #4d2800'}} align='center'>
                                                <label>id :</label>{this.state.id}<br/>
                                                <label>date :</label>{this.state.date}<br/> 
                                                <label>customer :</label>{this.state.customer}<br/>
                                                <label>LineItem :</label> <ul>
                                                {/* {this.state.lineItems.map(e=>{
                                                    return (
                                                    <div>
                                                    <li >{e.hasOwnProperty('_id') && <label>id :{e._id}</label>}</li>
                                                    <li >{e.hasOwnProperty('price') && <label>price :{e.price}</label>}</li>
                                                    <li >{e.hasOwnProperty('product') && <label>product :{e.product}</label>}</li>
                                                    <li >{e.hasOwnProperty('quantity') && <label>quantity :{e.quantity}</label>}</li>
                                                    <li >{e.hasOwnProperty('subTotal') && <label>subTotal :{e.subTotal}</label>}</li>
                                                    </div>
                                                    ) 
                                                })} */}
                                                </ul> <br/>
                                                <label>user :</label>{this.state.user} <br/>
                                                <label>createdAt :</label> {this.state.createdAt}<br/>
                                                <label>updatedAt :</label> {this.state.updatedAt}<br/>
                                                <label>quantity :</label> {this.state.quantity}<br/>
                                                <label>total :</label> {this.state.total}<br/>
                                                </h5>     
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose1}>
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
        bill : state.bill ,
        product : state.product ,
        customer : state.customer
    }
}
export default connect(mapStateToProps)(Bills)