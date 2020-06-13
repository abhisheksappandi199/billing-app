import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'


export const get = (user) =>{
    return {type:'GET_PRODUCT' ,payload:user}
}
export const add = (user) =>{
    return {type:'ADD_PRODUCT' ,payload:user}
}
export const update = (_id ,obj) =>{
    return {type:'UPDATE_PRODUCT' , payload:{_id,obj}}
}
export const remove = (id) =>{
    return {type:'REMOVE_PRODUCT' , payload:id}
}
export const startGetproduct = () =>{
    return (dispatch) =>{
        axios.get('http://dct-billing-app.herokuapp.com/api/products',{
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
export const startAddproduct = (data)=>{
    return (dispatch) =>{
        axios.post('http://dct-billing-app.herokuapp.com/api/products',data,{
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
                    title: 'product addded sucessfully',
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
export const startUpdateProduct = (_id,obj) =>{
    return (dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${_id}`,obj,{
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
export const startRemoveproduct = (id) =>{
    return (dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,{
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