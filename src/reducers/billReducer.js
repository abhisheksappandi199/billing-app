const billReducer = (state =[] , action) =>{
    switch(action.type){
        case 'GET_BILL':{
             return [ ...action.payload]
        }
        case 'REMOVE_BILL':{
            return state.filter(e => e._id != action.payload)
        }
        case 'ADD_BILL':{
            return [...state , action.payload]
        }
        default :{
            return [...state]
        }
    }
}
export default billReducer