import { NEXT_STEP, PREVIOUS_STEP } from "../constants/actionTypes";

const wizardStepReducer = (state=0, action) => {
  switch(action.type) {
    case NEXT_STEP:
      return state+1;
    case PREVIOUS_STEP:
      return state-1;      
    default:
      return state;
    }    
}

export default wizardStepReducer;

