const productReducer = (state =[] ,action) =>{
    switch(action.type){
        case 'GET_PRODUCT':{
            return [ ...action.payload]
        }
        case 'ADD_PRODUCT':{
            return [...state , action.payload]
        }
        case 'UPDATE_PRODUCT':{
            return state.map((message)=>{
                if(message._id === action.payload._id){
                    return {...message ,...action.payload.obj}
                }else
                {
                    return {...message}
                }

            })
        }
        case 'REMOVE_PRODUCT':{
            return state.filter(e => e._id != action.payload)
        }
        default : {
            return [...state]
        }
    }
}
export default productReducer