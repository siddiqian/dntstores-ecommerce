import Cookie from "js-cookie";
import { async } from "rxjs";
const { default: Axios } = require("axios");
const { LOGOUT, SET_LOGOUT_ERROR, SET_REGISTER_ERROR, USER_LOGIN_REQUEST_SUCCESSFUL, USER_LOGIN_REQUEST_PROCESSING, USER_REGISTER_REQUEST_PROCESSING, USER_REGISTER_REQUEST_SUCCESSFUL, USER_REGISTER_REQUEST_FAIL, SET_LOGIN_ERROR, NEXT_STEP, SET_WIZARD_ERROR, PREVIOUS_STEP } = require("../constants/actionTypes");


const nextStep = (currentStep) => async (dispatch, getState) => {
  try{
      dispatch({type: NEXT_STEP, payload: currentStep}) 

  } catch (error) {
      const errorWizard
      = 
      error.message
      ?
      error.message
      :
      error.response.data.message;

      console.log(errorWizard)
      dispatch({type: SET_WIZARD_ERROR, payload: {
        errorID: null,
        errorName: "Login Error",
        errorMessage: errorWizard
      }
    })
  }
}

const previousStep = (currentStep) => async (dispatch, getState) => {
  try{
      dispatch({type: PREVIOUS_STEP, payload: currentStep}) 

  } catch (error) {
      const errorWizard
      = 
      error.message
      ?
      error.message
      :
      error.response.data.message;

      console.log(errorWizard)
      dispatch({type: SET_WIZARD_ERROR, payload: {
        errorID: null,
        errorName: "Login Error",
        errorMessage: errorWizard
      }
    })
  }
}




export { nextStep , previousStep };
