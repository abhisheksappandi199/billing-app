const registerReducer = (state = [] , action) =>{
    switch(action.type){
        case 'REGISTER' : {
            return {...action.payload}
        }
        default : {return [...state]}
    }
}
export default  registerReducer