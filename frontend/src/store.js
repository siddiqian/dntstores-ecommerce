import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import { createProductReducer, deleteProductReducer, editProductReducer, productsListReducer, singleProductDetailsReducer } from './reducers/productReducers';
import { allOrdersListReducer, createOrderReducer, getOrderDetailsReducer, myOrdersListReducer } from './reducers/orderReducers';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';
import errorsReducer from './reducers/errorReducer';
import wizardStepReducer from './reducers/wizardStepReducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const verifiedUser = Cookie.getJSON("verifiedUser") || null;

const reducer = combineReducers({
  deleteProduct: deleteProductReducer,
  productEdit: editProductReducer,
  productCreate: createProductReducer,
  productsList: productsListReducer,
  singleProductDetails: singleProductDetailsReducer,
  orderCreate: createOrderReducer,
  myOrdersList: myOrdersListReducer,
  allOrdersList: allOrdersListReducer,
  getOrderDetails: getOrderDetailsReducer,
  cart: cartReducer,  
  user: userReducer,
  errors: errorsReducer,
  wizardStep: wizardStepReducer
})              


const initialState = { 
  cart: { cartItems, 
    deliveryDetails: {}, 
    paymentMethod: {} },
  errors: {},
  user: { 
    login: { verifiedUser }, 
    register: { registeredUser: null } 
  },
  wizardStep: 0 
};
// const initialState = {};
console.log(initialState)
const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhanced(applyMiddleware(thunk)));
// console.log(reducer)

export default store;