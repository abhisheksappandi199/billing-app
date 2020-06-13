import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'


export const get = (user) =>{
    return {type:'GET_BILL' ,payload:user}
}
export const add = (user) =>{
    return {type:'ADD_BILL' ,payload:user}
}
export const remove = (id) =>{
    return { type :'REMOVE_BILL' , payload:id}
}
export const startGetbill = () =>{
    return (dispatch) =>{
        axios.get('http://dct-billing-app.herokuapp.com/api/bills',{
            headers : {
                'Authorization' : 'Bearer '+ localStorage.getItem("authToken")
            }
        })
        .then((response)=>{
            const user = response.data
            //console.log(user);
            
            dispatch(get(user))
        })
        .catch((error)=>[
            alert(error.message)
        ])
    }
}
export const startAddBill = (data)=>{
    return (dispatch) =>{
        axios.post('http://dct-billing-app.herokuapp.com/api/bills',data,{
            headers : {
                'Authorization' : 'Bearer '+ localStorage.getItem("authToken")
            }
        })
        .then((response)=>{
            const user = response.data
            console.log(user);
            if(!user.errors){
                dispatch(add(user))
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Customer addded sucessfully',
                    showConfirmButton: false,
                    timer: 800
                  })
            }
            
        })
        .catch((error)=>[
            alert(error.message)
        ])
    }
}
export const startRemoveBill = (id) =>{
    return (dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,{
            headers : {
                'Authorization' : 'Bearer '+ localStorage.getItem("authToken")
            }
        })
        .then((response)=>{
            const user = response.data
            if(!user.errors){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'deketed sucessful',
                    showConfirmButton: false,
                    timer: 800
                  })
                dispatch(remove(id))
            }
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
}