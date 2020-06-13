const initialstate = []
const customerReducer = (state = initialstate ,action) =>{
    switch(action.type){
        case 'GET':{
            return [ ...action.payload]
        }
        case 'ADD':{
            return [...state , action.payload]
        }
        case 'UPDATE':{
            return state.map((message)=>{
                if(message._id === action.payload._id){
                    return {...message ,...action.payload.obj}
                }else
                {
                    return {...message}
                }

            })
        }
        case 'REMOVE':{
            return state.filter(e => e._id != action.payload)
        }
        default : {
            return [...state]
        }
    }
}
export default customerReducer