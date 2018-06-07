import actionTypes from '../constants/constant'


const initialState={
   user:{
    firstname:'',
    lastname:'',
    email:'',
    password:''
   }
  }

  export default(state =initialState , action)=> {
    switch (action.type) {
      case actionTypes.REGISTERUSER:

        return({
            ...state,
            user: [...state.user, action.res]
         
        });
      default:
        return state;
    }
  }
