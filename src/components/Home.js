import React, { Component } from 'react'
import {connect} from 'react-redux'

 class Home extends Component {

    render() {
        return (
            <div align='center'>
                <br/><br/>
                {
                    localStorage.getItem("authToken")  ? 
                    <>
                    <br/><br/>
                    <h2  style={{color : 'green'}}>Dashboard - Status</h2>
                    <h5>Customer - { this.props.customer.length }</h5>
                    <h5>products - {this.props.product.length}</h5>
                    <h5>Bills - {this.props.bill.length}</h5>
                    </> 
                    :
                    <h3 align='center' style={{color : 'red'}}>please Login...!!!</h3>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        customer: state.customer,
        product : state.product,
        bill: state.bill
    }
}

export default connect(mapStateToProps)(Home)
