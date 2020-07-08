import React from 'react'
import {Modal,Button,ButtonToolbar} from 'react-bootstrap'
import {connect} from 'react-redux'
import Moment from 'react-moment'

class MyVerticallyCenteredModal extends React.Component {
render() {
	return (
		<Modal
			{...this.props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-vcenter">
					Account Details
			</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h5 style={{color : ' #4d2800'}} >
				<label className='col-md-4'>Username </label>:{" "}{this.props.data.username} <br/>
				<label className='col-md-4'>email </label>:{" "}{this.props.data.email}<br/> 
				<label className='col-md-4'>businessName </label> :{" "}{this.props.data.businessName}<br/>
				<label className='col-md-4'>address </label>:{" "}{this.props.data.address} <br/>
				<label className='col-md-4'>createdAt </label> :{" "}{<Moment format="YYYY-MM-DD HH:mm">{this.props.data.createdAt}</Moment>}<br/>
				<label className='col-md-4'>updatedAt </label> :{" "}{<Moment format="YYYY-MM-DD HH:mm">{this.props.data.updatedAt}</Moment>}<br/>
				</h5>     
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
}
}

class Account extends React.Component {
	constructor(...args) {
		super(...args);

		this.state = { modalShow: false };
}

render() {
let modalClose = () => this.setState({ modalShow: false });
	return (
		<div align='center'>
						
			<ButtonToolbar>
			<Button
				size="sm"
				variant="outline-primary"
				onClick={() => this.setState({ modalShow: true })}
			>
				modal
			</Button>

			<MyVerticallyCenteredModal
				show={this.state.modalShow}
				onHide={modalClose}
				data={this.props.login}
			/>
		</ButtonToolbar>
		</div>
	)
}
}
const mapStateToProps = (state) =>{
    return {
        login : state.login
    }
}

export default connect(mapStateToProps)(Account)  

// import React, { Component } from 'react'
// import {Modal,Button,Row,Col,Form} from 'react-bootstrap'

// class Account extends Component {
//     constructor(props){
//         super(props)
//         this.state={
//             setShow : false,
//             show:false
//         }
//     }
//     handleClose =() =>{
//         this.setState((prev)=>{
//             return {
//                 setShow : !prev.setShow
//             }
//         })
//     }
//     handleShow =()=>{
//         this.setState({setShow:true})
//     }
//     // const [show, setShow] = useState(false);

//     // const handleClose = () => setShow(false);
//     // const handleShow = () => setShow(true);

//     render() {
//         return(
//             <div>
//     	<Button variant="primary" onClick={this.handleClose}>
//         Launch demo modal
//       </Button>

//       <Modal show={this.state.setShow} onHide={this.handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={this.handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={this.handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//             </div>
//         )
//     }
// }

// export default Account