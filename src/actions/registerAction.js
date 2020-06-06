import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const setRegister = (data) =>{
    return {type:'REGISTER' , payload : data}
}

export const startpostRegister = (registerdata) =>{
    return (dispatch) =>{
        axios.post('http://dct-billing-app.herokuapp.com/api/users/register',registerdata)
        .then((response)=>{
            const data = response.data
            dispatch(setRegister(data))
            console.log(data)
            if(data._id){
                {Swal.fire('Register sucessful')}
            } 
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}