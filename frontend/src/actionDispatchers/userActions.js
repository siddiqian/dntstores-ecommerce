import Cookie from "js-cookie";
const { default: Axios } = require("axios");
const { LOGOUT, SET_LOGOUT_ERROR, SET_REGISTER_ERROR, USER_LOGIN_REQUEST_SUCCESSFUL, USER_LOGIN_REQUEST_PROCESSING, USER_REGISTER_REQUEST_PROCESSING, USER_REGISTER_REQUEST_SUCCESSFUL, USER_REGISTER_REQUEST_FAIL, SET_LOGIN_ERROR } = require("../constants/actionTypes");


const login = (email, password) => async (dispatch, getState) => {
  dispatch({type: USER_LOGIN_REQUEST_PROCESSING})
  try{
      const { data } = await Axios.post('/api/users/login-request', {email: email, password: password})
      const verifiedUser = data;
      // console.log(data)
      dispatch({type: USER_LOGIN_REQUEST_SUCCESSFUL, payload: verifiedUser}) 
      Cookie.set('verifiedUser', JSON.stringify(verifiedUser))

  } catch (error) {
      const errorLogin 
      = 
      error.message
      ?
      error.message
      :
      error.response.data.message;

      console.log(errorLogin)
      dispatch({type: SET_LOGIN_ERROR, payload: {
        errorID: null,
        errorName: "Login Error",
        errorMessage: errorLogin
      }
    })
  }
}

const logout = () => async(dispatch) => {
  try{
    Cookie.remove("verifiedUser");
    dispatch({type: LOGOUT})
  } catch (error) {
    dispatch({type: SET_LOGOUT_ERROR, payload: {
      errorID: null,
      errorName: "Logout Error",
      errorMessage: "Error Logging out"
      }
    })
  }
}

const register = (name, email, password) => async (dispatch, getState) => {
  dispatch({type: USER_REGISTER_REQUEST_PROCESSING})
  try{
      const { data } = await Axios.post('/api/users/register', {name, email, password})
      const registeredUser = data;
      //  console.log(data)
      dispatch({type: USER_REGISTER_REQUEST_SUCCESSFUL, payload: registeredUser}) 
      Cookie.set('verifiedUser', JSON.stringify(registeredUser))

  } catch(error) {
      const errorRegister 
      = 
      error.message
      ?
      error.message
      :
      error.response.data.message;

      console.log(errorRegister)
      dispatch({type: SET_REGISTER_ERROR, payload: {
        errorID: null,
        errorName: "Register Error",
        errorMessage: errorRegister
      }
    })
  }
}

export { login , register, logout };
