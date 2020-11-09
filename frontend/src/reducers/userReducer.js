const { USER_LOGIN_REQUEST_PROCESSING, USER_LOGIN_REQUEST_SUCCESSFUL, USER_LOGIN_REQUEST_FAIL, LOGOUT } = require("../constants/actionTypes");
const { USER_REGISTER_REQUEST_PROCESSING, USER_REGISTER_REQUEST_SUCCESSFUL, USER_REGISTER_REQUEST_FAIL } = require("../constants/actionTypes");

const userReducer = (state={login: {}, register: {}}, action) => {
  switch(action.type) {
    case USER_LOGIN_REQUEST_PROCESSING:
        return {...state, login: {verifying: true}};
    case USER_LOGIN_REQUEST_SUCCESSFUL:
        return {...state, login: {verifying: false, verifiedUser: action.payload}};
    case USER_LOGIN_REQUEST_FAIL:
        return {...state, login: {verifying: false, error: action.payload}}
//------------For Register--------------------------------------------------------------
    case USER_REGISTER_REQUEST_PROCESSING:
        return {...state, register: {registering: true}};
    case USER_REGISTER_REQUEST_SUCCESSFUL:
        // console.log(action.payload)
        return {...state, register: {registering: false, registeredUser: action.payload}};
    case USER_REGISTER_REQUEST_FAIL:
        return {...state, register: {registering: false, error: action.payload}}
    case LOGOUT:
      return {login: {}, register: {}}
    default:
        return state;
    }    
}

export default userReducer;

