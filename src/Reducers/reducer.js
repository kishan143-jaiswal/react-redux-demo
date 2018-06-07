import actionTypes from '../constants/constant'

export default(state = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null
  }, action)=> {
    switch (action.type) {
      case actionTypes.SET_LOGIN_PENDING:

        return({
            ...state,
            isLoginPending: action.isLoginPending
        });
  
      case actionTypes.SET_LOGIN_SUCCESS:
        return ({
            ...state,
          isLoginSuccess: action.isLoginSuccess
        });
  
      case actionTypes.SET_LOGIN_ERROR:
        return ({
            ...state,
          loginError: action.loginError
        });
  
      default:
        return state;
    }
  }
