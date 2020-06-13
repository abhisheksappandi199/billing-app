const loginReducer = (state = {}, action) =>{
    switch(action.type){
        case 'LOGIN_ERROR' : {
            return {...action.payload}
        }
        case 'LOGIN_TOKEN' : {
           return {...action.payload}
        }
        default : { 
            return {...state}
        }
    }
}
export default loginReducer