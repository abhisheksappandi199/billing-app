import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const setuserlogin = (data) =>{
    return {type:'LOGIN_ERROR' , payload:data}
}

export const userdata = (data) =>{
    return {type:'LOGIN_TOKEN' , payload:data}
}

export const startGetUser = () =>{
    return (dispatch)=>{
        axios.get(`http://dct-billing-app.herokuapp.com/api/users/account`,{
                    headers : {
                        'Authorization' : 'Bearer '+ localStorage.getItem("authToken")
                    }
                })
                .then((response)=>{
                    const user = response.data
                    dispatch(userdata(user))
                })
                .catch((error)=>{
                    alert(error.message)
                })
    }
}

export const startPostLogin = (logindata,redirect) =>{
    return (dispatch) =>{
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login',logindata)
        .then((response)=>{
            const data = response.data
            //dispatch(setuserlogin(data))
            //console.log(data)
            
            if(data.hasOwnProperty('errors'))
            {
                dispatch(setuserlogin(data))
            }
            else{
                {Swal.fire('Login sucessful')}
                localStorage.setItem("authToken", data.token)
                axios.get(`http://dct-billing-app.herokuapp.com/api/users/account`,{
                    headers : {
                        'Authorization' : 'Bearer '+ localStorage.getItem("authToken")
                    }
                })
                .then((response)=>{
                    const user = response.data
                    //console.log(user);
                    dispatch(userdata(user))
                    redirect()
                })
                .catch((error)=>{
                    alert(error.message)
                })
               
            }
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
}