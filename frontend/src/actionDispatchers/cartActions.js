import Axios from "axios"
import { 
  ADD_ITEM_TO_CART_REQUEST_PROCESSING,
  REMOVE_ITEM_FROM_CART, 
  SAVE_DELIVERY_DETAILS, 
  SAVE_PAYMENT_METHOD, 
  DELETE_CART,
  SET_ADD_TO_CART_ERROR,
  ADD_ITEM_TO_CART_REQUEST_SUCCESS
  } from "../constants/actionTypes"
import Cookie from "js-cookie";



const addToCart = (product_id, qty) => async (dispatch, getState) => {

  var addedToCartProduct = null;

  dispatch({type: ADD_ITEM_TO_CART_REQUEST_PROCESSING})

    try {
      const addedToCartProductObj = await Axios.get('/api/products/' + product_id);
      if (addedToCartProductObj) {
        addedToCartProduct = { ...addedToCartProductObj.data };      
        if (addedToCartProduct) {
          const cartItemDetails = {
            product_id: addedToCartProduct._id,
            name: addedToCartProduct.name,
            image: addedToCartProduct.image,
            price: addedToCartProduct.price,
            availableQty: addedToCartProduct.availableQty,
            qty
          }     
            
          console.log(cartItemDetails)

          
          dispatch({type: ADD_ITEM_TO_CART_REQUEST_SUCCESS, payload: cartItemDetails})

          const { cart: { cartItems } } = getState();

          console.log(cartItems)

          Cookie.set("cartItems", JSON.stringify(cartItems));
        } else  throw new Error('Error in server')
      } else throw new Error('Error in adding the item to the cart');        
    } catch (error) {

        const errorAddingToCart 
        = 
        error.message
        ?
        error.message
        :
        error.response.data.message;

        console.log(errorAddingToCart)

        dispatch({type: SET_ADD_TO_CART_ERROR, payload: {
          errorID: product_id,
          errorName: "Error Adding to Cart",
          errorMessage: errorAddingToCart          
        }})
    }
}

const updateItemOfCart = (product_id, newQty, previousQty) => async (dispatch, getState) => {

  var updatedItem = null;
  var updatedProduct = null;

  dispatch({type: ADD_ITEM_TO_CART_REQUEST_PROCESSING})

    try {
      const updatedItemObj = await Axios.get('/api/products/' + product_id);
      if (updatedItemObj) {
        updatedItem = { ...updatedItemObj.data };
        const updatedProduct_id = updatedItem._id;
        const updatedQty = {
          updatedQty: 
          parseInt(updatedItem.availableQty)-(parseInt(newQty)-parseInt(previousQty))
        };           
        
        const updatedProductObj 
        = 
        await Axios.put('/api/products/update-qty/' + updatedProduct_id, updatedQty)
        if(updatedProductObj) { 
          updatedProduct = { ...updatedProductObj.data };         
          if (updatedItem && updatedProduct) {
            const cartItemDetails = {
              product_id: updatedItem._id,
              name: updatedItem.name,
              image: updatedItem.image,
              price: updatedItem.price,
              availableQty: updatedItem.availableQty,
              qty: newQty
            }     
              
            console.log(cartItemDetails)

            
            dispatch({type: ADD_ITEM_TO_CART_REQUEST_SUCCESS, payload: cartItemDetails})

            const { cart: { cartItems } } = getState();

            console.log(cartItems)

            Cookie.set("cartItems", JSON.stringify(cartItems));
            }
          }
        else  throw new Error('Error in updating qty')
        }
      else throw new Error('Error in adding the item to the cart');        
    } catch (error) {

        const errorAddingToCart 
        = 
        error.message
        ?
        error.message
        :
        error.response.data.message;

        console.log(errorAddingToCart)

        dispatch({type: SET_ADD_TO_CART_ERROR, payload: {
          errorID: product_id,
          errorName: "Error Adding to Cart",
          errorMessage: errorAddingToCart          
        }})
    }
}


const removeFromCart = (product_id, qty) => async (dispatch, getState) => {
  var removedFromCartProduct = null;
  var updatedProduct = null;
  try {
    const removedFromCartProductObj = await Axios.get('/api/products/' + product_id);
    if (removedFromCartProductObj) {
      removedFromCartProduct = { ...removedFromCartProductObj.data };
         
        if (removedFromCartProduct) {
         
          dispatch({type: REMOVE_ITEM_FROM_CART, payload: product_id})
          
          } else  throw new Error('Error in updating qty')

        } else throw new Error('Error in adding the item to the cart');        

     
      } catch (error) {

      const errorAddingToCart 
      = 
      error.message
      ?
      error.message
      :
      error.response.data.message;

      console.log(errorAddingToCart)

      dispatch({type: SET_ADD_TO_CART_ERROR, payload: {
        errorID: product_id,
        errorName: "Error Adding to Cart",
        errorMessage: errorAddingToCart          
      }})
  }
}


const saveDeliveryDetails = (deliveryDetails) => (dispatch) => {
    dispatch({type: SAVE_DELIVERY_DETAILS, payload: deliveryDetails})
}

const savePaymentMethod = (paymentMethod) => (dispatch) => {
    console.log(paymentMethod)
    dispatch({type: SAVE_PAYMENT_METHOD, payload: paymentMethod})
}

const deleteCart =  () => (dispatch) => {
    Cookie.remove("cartItems");
    dispatch({type: DELETE_CART})
}


export { addToCart, updateItemOfCart, removeFromCart, saveDeliveryDetails, savePaymentMethod, deleteCart }