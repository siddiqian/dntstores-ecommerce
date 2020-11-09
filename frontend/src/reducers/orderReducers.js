import { GET_ALL_ORDERS_REQUEST_FAIL, GET_ALL_ORDERS_REQUEST_PROCESSING, GET_ALL_ORDERS_REQUEST_SUCCESS, GET_MY_ORDERS_REQUEST_FAIL, GET_MY_ORDERS_REQUEST_PROCESSING, GET_MY_ORDERS_REQUEST_SUCCESS, GET_ORDER_DETAILS_REQUEST_FAIL, GET_ORDER_DETAILS_REQUEST_PROCESSING, GET_ORDER_DETAILS_REQUEST_SUCCESS, ORDER_CREATE_REQUEST_FAIL, ORDER_CREATE_REQUEST_PROCESSING, ORDER_CREATE_REQUEST_SUCCESS } from "../constants/actionTypes";
  
  
function createOrderReducer(state = {}, action) {
    switch (action.type) {
      case ORDER_CREATE_REQUEST_PROCESSING:
        return { creating: true };
      case ORDER_CREATE_REQUEST_SUCCESS:
        return { creating: false, createdOrder: action.payload.body , success: true };
      case ORDER_CREATE_REQUEST_FAIL:
        return { creating: false, error: action.payload };
      default: return state;
    }
}

function myOrdersListReducer(state = {myOrders: []}, action) {
    switch (action.type) {
        case GET_MY_ORDERS_REQUEST_PROCESSING:
            return { fetching: true };
        case GET_MY_ORDERS_REQUEST_SUCCESS:
            return { fetching: false, myOrders: action.payload };
        case GET_MY_ORDERS_REQUEST_FAIL:
            return { fetching: false, error: action.payload };
        default: return state;
    }
}

function allOrdersListReducer(state = {myOrders: []}, action) {
  switch (action.type) {
      case GET_ALL_ORDERS_REQUEST_PROCESSING:
          return { fetching: true };
      case GET_ALL_ORDERS_REQUEST_SUCCESS:
          return { fetching: false, allOrders: action.payload };
      case GET_ALL_ORDERS_REQUEST_FAIL  :
          return { fetching: false, error: action.payload };
      default: return state;
  }
}



function getOrderDetailsReducer(state = {}, action) {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST_PROCESSING:
            return { fetching: true };
        case GET_ORDER_DETAILS_REQUEST_SUCCESS:
            return { fetching: false, order: action.payload };
        case GET_ORDER_DETAILS_REQUEST_FAIL:
            return { fetching: false, error: action.payload };
        default: return state;
    }
}
  
  
//   function orderDetailsReducer(state = {
//     order: {
//       orderItems: [],
//       delivery: {},
//       payment: {}
//     }
//   }, action) {
//     switch (action.type) {
//       case ORDER_DETAILS_REQUEST:
//         return { loading: true };
//       case ORDER_DETAILS_SUCCESS:
//         return { loading: false, order: action.payload };
//       case ORDER_DETAILS_FAIL:
//         return { loading: false, error: action.payload };
//       default: return state;
//     }
//   }
  
  

  
//   function orderListReducer(state = {
//     orders: []
//   }, action) {
//     switch (action.type) {
//       case ORDER_LIST_REQUEST:
//         return { loading: true };
//       case ORDER_LIST_SUCCESS:
//         return { loading: false, orders: action.payload };
//       case ORDER_LIST_FAIL:
//         return { loading: false, error: action.payload };
//       default: return state;
//     }
//   }
  
//   function orderPayReducer(state = {
//     order: {
//       orderItems: [],
//       delivery: {},
//       payment: {}
//     }
//   }, action) {
//     switch (action.type) {
//       case ORDER_PAY_REQUEST:
//         return { loading: true };
//       case ORDER_PAY_SUCCESS:
//         return { loading: false, success: true };
//       case ORDER_PAY_FAIL:
//         return { loading: false, error: action.payload };
//       default: return state;
//     }
//   }
  
//   function orderDeleteReducer(state = {
//     order: {
//       orderItems: [],
//       delivery: {},
//       payment: {}
//     }
//   }, action) {
//     switch (action.type) {
//       case ORDER_DELETE_REQUEST:
//         return { loading: true };
//       case ORDER_DELETE_SUCCESS:
//         return { loading: false, success: true };
//       case ORDER_DELETE_FAIL:
//         return { loading: false, error: action.payload };
//       default: return state;
//     }
//   }
  export {
    createOrderReducer, myOrdersListReducer, getOrderDetailsReducer, allOrdersListReducer
  }