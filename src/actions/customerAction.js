import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const get = (user) =>{
    return {type:'GET' ,payload:user}
}
export const add = (user) =>{
    return {type:'ADD' ,payload:user}
}
export const update = (_id ,obj) =>{
    return {type:'UPDATE' , payload:{_id,obj}}
}
export const remove = (id) =>{
    return {type:'REMOVE' , payload:id}
}
export const startGetcustomer = () =>{
    return (dispatch) =>{
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',{
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
export const startAddCustomer = (data)=>{
    return (dispatch) =>{
        axios.post('http://dct-billing-app.herokuapp.com/api/customers',data,{
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
export const startUpdateCustomer = (_id,obj) =>{
    return (dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${_id}`,obj,{
            headers : {
                'Authorization' : 'Bearer '+ localStorage.getItem("authToken")
            }
        })
        .then((response)=>{
            const user = response.data
            if(!user.errors){
                dispatch(update(_id,user))
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Update sucessful',
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
export const startRemoveCustomer = (id) =>{
    return (dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,{
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