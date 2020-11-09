import { 
  REMOVE_ITEM_FROM_CART, 
  SAVE_PAYMENT_METHOD, 
  SAVE_DELIVERY_DETAILS, 
  DELETE_CART, 
  ADD_ITEM_TO_CART_FAIL,  
  ADD_ITEM_TO_CART_REQUEST_SUCCESS
} from '../constants/actionTypes'
import Cookie from "js-cookie";




function cartReducer(state = {}
, action) {
  switch(action.type) {
    // case ADD_ITEM_TO_CART_REQUEST_PROCESSING:
    //   return {errorAddingToCart: {
    //     erroredProduct_id: null,
    //     error: null}}
    case ADD_ITEM_TO_CART_REQUEST_SUCCESS:
      const itemToBeAdded = action.payload;
      // console.log(cartItems) 

      const isItemPresent = state.cartItems.find(cartItem => cartItem.product_id === itemToBeAdded.product_id)
      console.log(isItemPresent) 
      if(isItemPresent)
        return {
          cartItems:
          state.cartItems.map(cartItem => cartItem.product_id === isItemPresent.product_id ? itemToBeAdded : cartItem) 
        }  
      return {cartItems: [...state.cartItems, itemToBeAdded]}

    case  ADD_ITEM_TO_CART_FAIL:
      return {errorAddingToCart: action.payload}
    
    case REMOVE_ITEM_FROM_CART:
      const productToBeRemoved_id = action.payload;
      const updatedCartItems = state.cartItems.filter(item => item.product_id !== productToBeRemoved_id);            
      Cookie.set("cartItems", JSON.stringify(updatedCartItems));
      return {cartItems: updatedCartItems}
    
    case SAVE_DELIVERY_DETAILS:
      return {...state, deliveryDetails: action.payload}
      
    case SAVE_PAYMENT_METHOD:
      return {...state, paymentMethod: action.payload}

    case DELETE_CART:
      return {...state, cartItems: [], deliveryDetails: {}, paymentMethod: {}}
    default:
      return state;
    }
}

export default cartReducer;
 