import actionTypes from '../constants/constant'

export function login(email, password) {
    return dispatch => {
      dispatch(setLoginPending(true));
      dispatch(setLoginSuccess(false));
      dispatch(setLoginError(null));
  
      callLoginApi(email, password, error => {
        dispatch(setLoginPending(false));
        if (!error) {
          dispatch(setLoginSuccess(true));
        
        } else {
          dispatch(setLoginError(error));
        }
      });
    }
  }
  
  function setLoginPending(isLoginPending) {
    return {
      type: actionTypes.SET_LOGIN_PENDING,
      isLoginPending
    };
  }
  
  function setLoginSuccess(isLoginSuccess) {
    return {
      type: actionTypes.SET_LOGIN_SUCCESS,
      isLoginSuccess
    };
  }
  
  function setLoginError(loginError) {
    return {
      type: actionTypes.SET_LOGIN_ERROR,
      loginError
    }
  }
  
  function callLoginApi(email, password, callback) {

    fetch('http://localhost:8000/login/'+email+'/'+password,{
         method:'get',
      })
      .then((response)=>response.json())
      .then((response)=>{
          if (email === response.data.email && password === response.data.password) {
            return callback(null);
          } else {
            return callback(new Error('Invalid email and password'));
          }   
    })
  }
  

  export function register(firstname,lastname,email,password,imagename) {
    var res=[]
    var formData = new FormData()
       formData.append("productImage",imagename);
       
    fetch('http://localhost:8000/upload',{
      method:'POST',
      body:formData
    }).then((response)=>response.json())
      .then((response)=>{
        fetch('http://localhost:8000/register',{
          method:'post',
          headers:{
            'Accept':'application/json',
             'Content-Type': 'application/json',
          },
           body:JSON.stringify({
              firstname:firstname,
              lastname:lastname,
              email:email,
              password:password,
              productImage:response.path
            }),
        }).then((response)=>response.json())
        .then((response)=>{
          console.log("dhkjhdkjhdfkjd",response)
          res.push(response)
        })
    })
        return dispatch => {
            dispatch({type:actionTypes.REGISTERUSER,res})
    }
  }
  //USED TO WORK WITH LOCAL STORAGE
    // var a = [];
    // a = JSON.parse(localStorage.getItem('session'));
    // a.push(user);
    // localStorage.setItem('session', JSON.stringify(a));
    // return dispatch => {
    //   // dispatch({type:actionTypes.REGISTERUSER,firstname:firstname,lastname:lastname,email:email,password:password})
    //    dispatch({type:actionTypes.REGISTERUSER,res})


    // }
  // }