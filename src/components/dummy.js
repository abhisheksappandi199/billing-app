import { Modal, Button } from 'antd';
import React, { Component } from 'react'

class Dummy extends React.Component {
  state = { visible: false ,data:""};

  showModal = (data) => {
    this.setState({
      visible: true,
      data
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={()=>{this.showModal("hi theer")}}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.state.data}</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default Dummy
// import React, { Component } from 'react'

// export default class dummy extends Component {
//   constructor(){
//     super()
//     this.state={
//       myname:[{first:"",last:""}]
//     }
//   }

// // handle input change
//  handleInputChange = (e, index) => {
//   const { name, value } = e.target;
//   const list = [...this.state.myname];
//   list[index][name] = value;
//   this.setState({myname:list})
// };
 
// // handle click event of the Remove button
//  handleRemoveClick = index => {
//   const list = [...this.state.myname];
//   console.log(list);
  
//   list.splice(index, 1);
//   console.log(list);
  
//   this.setState({myname:list})
// };
 
// // handle click event of the Add button
//  handleAddClick = () => {
//   this.setState({myname : [...this.state.myname, { first: "", last: "" }]})
// };
  
//   render() {
//     return (
//       <div>
//         {
//           this.state.myname.map((obj,i)=>{
//             return (
//               <div>
//                 <input
//                   name="first"
//                   value={obj.first}
//                   onChange={e => this.handleInputChange(e, i)}

//                 />
//                 <input
//                   name="last"
//                   value={obj.last}
//                   onChange={e => this.handleInputChange(e, i)}

//                 />
//                 <div className="btn-box">
//                   {this.state.myname.length !== 1 && <button onClick={() => this.handleRemoveClick(i)}>Remove</button>}
//                   {this.state.myname.length - 1 === i && <button onClick={this.handleAddClick}>Add</button>}
//                 </div>
//               </div>
//             )
//           })
//         }
//       </div>
//     )
//   }
// }
