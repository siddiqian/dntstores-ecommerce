import Axios from "axios";
import {
  GET_ALL_ORDERS_REQUEST_FAIL,
  GET_ALL_ORDERS_REQUEST_PROCESSING,
  GET_ALL_ORDERS_REQUEST_SUCCESS,
    GET_MY_ORDERS_REQUEST_FAIL,
    GET_MY_ORDERS_REQUEST_PROCESSING,
    GET_MY_ORDERS_REQUEST_SUCCESS,
    GET_ORDER_DETAILS_REQUEST_FAIL,
    GET_ORDER_DETAILS_REQUEST_PROCESSING,
    GET_ORDER_DETAILS_REQUEST_SUCCESS,
    ORDER_CREATE_REQUEST_FAIL,
    ORDER_CREATE_REQUEST_PROCESSING, ORDER_CREATE_REQUEST_SUCCESS, SET_CREATE_ORDER_ERROR
} from '../constants/actionTypes'


const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST_PROCESSING, payload: order });
    try {
        const { user: { login: { verifiedUser } } } = getState();
        const token = verifiedUser.token;

        const { data } = await Axios.post("/api/orders/create-order", order, {
        headers: {
            Authorization: ' Bearer ' + token
            }
        });
    
        
    dispatch({ type: ORDER_CREATE_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const errorCraeteOrder 
    = 
    error.message
    ?
    error.message
    :
    error.response.data.message;

    console.log(errorCraeteOrder)

    dispatch({type: SET_CREATE_ORDER_ERROR, payload: {
      errorID: null,
      errorName: "Logout Error",
      errorMessage: errorCraeteOrder
      }  
    })
  }    
}

const getMyOrderslist = () =>  async (dispatch, getState) => {
    try {
        dispatch({type: GET_MY_ORDERS_REQUEST_PROCESSING})
        const { user: { login: { verifiedUser } } } = getState();
        const token = verifiedUser.token;

        const { data } = await Axios.get('/api/orders/my-orders', {
            headers: {
                Authorization: 'Bearer' + ' ' + token
            }
        })
        dispatch({type: GET_MY_ORDERS_REQUEST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_MY_ORDERS_REQUEST_FAIL, payload: error.message})
    }
}

const getAllOrderslist = () =>  async (dispatch, getState) => {
  try {
      dispatch({type: GET_ALL_ORDERS_REQUEST_PROCESSING})
      const { user: { login: { verifiedUser } } } = getState();
      const token = verifiedUser.token;

      const { data } = await Axios.get('/api/orders/all-orders', {
          headers: {
              Authorization: 'Bearer' + ' ' + token
          }
      })
      dispatch({type: GET_ALL_ORDERS_REQUEST_SUCCESS, payload: data})
  } catch (error) {
      dispatch({type: GET_ALL_ORDERS_REQUEST_FAIL, payload: error.message})
  }
}


// const listMyOrders = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: MY_ORDER_LIST_REQUEST });
//     const { userSignin: { userInfo } } = getState();
//     const { data } = await Axios.get("/api/orders/mine", {
//       headers:
//         { Authorization: 'Bearer ' + userInfo.token }
//     });
//     dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
//   } catch (error) {
//     dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
//   }
// }

// const listOrders = () => async (dispatch, getState) => {

//   try {
//     dispatch({ type: ORDER_LIST_REQUEST });
//     const { userSignin: { userInfo } } = getState();
//     const { data } = await Axios.get("/api/orders", {
//       headers:
//         { Authorization: 'Bearer ' + userInfo.token }
//     });
//     dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
//   } catch (error) {
//     dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
//   }
// }

const getSingleOrderDetails = (orderID) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST_PROCESSING});
    const { user: { login: { verifiedUser } } } = getState();
    const token = verifiedUser.token;

    const { data } = await Axios.get("/api/orders/" + orderID, {
      headers:
        { Authorization: 'Bearer ' + token }
    });
    console.log(data.body)
    dispatch({ type: GET_ORDER_DETAILS_REQUEST_SUCCESS, payload: data.body })
  } catch (error) {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST_FAIL, payload: error.message });
  }
}

// const payOrder = (order, paymentResult) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
//     const { userSignin: { userInfo } } = getState();
//     const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
//       headers:
//         { Authorization: 'Bearer ' + userInfo.token }
//     });
//     dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
//   } catch (error) {
//     dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
//   }
// }

// const deleteOrder = (orderId) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
//     const { userSignin: { userInfo } } = getState();
//     const { data } = await Axios.delete("/api/orders/" + orderId, {
//       headers:
//         { Authorization: 'Bearer ' + userInfo.token }
//     });
//     dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
//   } catch (error) {
//     dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
//   }
// }
export { createOrder, getMyOrderslist, getAllOrderslist, getSingleOrderDetails };