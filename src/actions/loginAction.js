import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const setlogin = (data) =>{
    return {type:'LOGIN' , payload:data}
}

export const startPostLogin = (logindata) =>{
    return (dispatch) =>{
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login',logindata)
        .then((response)=>{
            const data = response.data
            dispatch(setlogin(data))
            console.log(data)
            localStorage.setItem("token", JSON.stringify(data.token))
            if(data.token){
                {Swal.fire('Login sucessful')}
            }
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
}