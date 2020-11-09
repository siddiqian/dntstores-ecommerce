import Axios from "axios";

const { PRODUCTS_LIST_REQUEST_SUCCESSFUL, 
    PRODUCTS_LIST_REQUEST_FAIL, 
    PRODUCTS_LIST_REQUEST_PROCESSING, 
    PRODUCT_DETAILS_REQUEST_PROCESSING, 
    PRODUCT_DETAILS_REQUEST_SUCCESSFUL, 
    PRODUCT_DETAILS_REQUEST_FAIL, 
    CREATE_PRODUCT_REQUEST_PROCESSING, 
    CREATE_PRODUCT_REQUEST_SUCCESSFUL, 
    CREATE_PRODUCT_REQUEST_FAIL, 
    EDIT_PRODUCT_REQUEST_PROCESSING,
    EDIT_PRODUCT_REQUEST_SUCCESSFUL,
    EDIT_PRODUCT_REQUEST_FAIL,
    DELETE_PRODUCT_REQUEST_PROCESSING,
    DELETE_PRODUCT_REQUEST_SUCCESSFUL,
    DELETE_PRODUCT_REQUEST_FAIL} = require("../constants/actionTypes");

const createProduct = (productFromData) => async(dispatch, getState) => {
  console.log(productFromData)
    dispatch({type: CREATE_PRODUCT_REQUEST_PROCESSING})
    try{
        // console.log(product)

        const { user: { login: { verifiedUser } } } = getState();

        // console.log(verifiedUser)

        const token = verifiedUser.token;
        // console.log(token)


        const { data } = await Axios.post('/api/products/create-product', productFromData, {
            headers: { 
              Authorization: 'Bearer' + ' ' + token,
              'content-type': 'multipart/form-data'
            }
        })
        const createdProduct = data;
        console.log(createdProduct)
        dispatch({type: CREATE_PRODUCT_REQUEST_SUCCESSFUL, payload: createdProduct})
    } catch (error) {
        console.log('is this error')
        dispatch({type: CREATE_PRODUCT_REQUEST_FAIL, payload: error.response.data.message})
    }
}

const getProductsList = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCTS_LIST_REQUEST_PROCESSING });
    try{
        // console.log("ProductScreen State")
        // console.log(getState())
        // console.log("inside dispatch")
        // console.log(dispatch)
        
        const { data } = await Axios.get('/api/products');
        dispatch({ type: PRODUCTS_LIST_REQUEST_SUCCESSFUL, payload: data });
        // console.log(getState)
        // console.log(getState())
        // let currentState = getState();
        // SVGElementInstanceList()

    }
    
    catch(error) {
        console.log(error)
        dispatch({ type: PRODUCTS_LIST_REQUEST_FAIL, payload: error.message })
    }
}

const getSingleProductDetails = (product_id) => async (dispatch, getState) => {
    try{
        // console.log("ProductScreen State")
        // console.log(getState())
        // console.log("inside dispatch")
        // console.log(dispatch)
        console.log("HIHIHIHIHI")

       
        dispatch({ type: PRODUCT_DETAILS_REQUEST_PROCESSING });
        const { data } = await Axios.get('/api/products/' + product_id);
            console.log("LOLOLOLOLO")
            // // throw {error: "Timeout"}
            // console.log(data);
        

        dispatch({ type: PRODUCT_DETAILS_REQUEST_SUCCESSFUL, payload: data });
        // console.log(getState)
        // console.log(getState())
        // let currentState = getState();
        // SVGElementInstanceList()

    }
    
    catch(error) {
        console.log(error)
        dispatch({ type: PRODUCT_DETAILS_REQUEST_FAIL, payload: error.response.data.message })
    }
}

const editProduct = (product) => async(dispatch, getState) => {

    dispatch({ type: EDIT_PRODUCT_REQUEST_PROCESSING });

    try{

        const { user: { login: { verifiedUser } } } = getState();

        // console.log(verifiedUser)

        const token = verifiedUser.token;
        // console.log(token)

   
        const { data } = await Axios.put('/api/products/' + product._id, product, {
            headers: { Authorization: 'Bearer' + ' ' + token }});
       
        console.log(data)

        dispatch({ type: EDIT_PRODUCT_REQUEST_SUCCESSFUL, payload: data });
    }
    
    catch(error) {
        console.log(error)
        dispatch({ type: EDIT_PRODUCT_REQUEST_FAIL, payload: error.response.data.message })
    }

}



const deleteProduct = (productID) => async(dispatch, getState) => {

    dispatch({ type: DELETE_PRODUCT_REQUEST_PROCESSING });

    try{

        const { user: { login: { verifiedUser } } } = getState();

        // console.log(verifiedUser)

        const token = verifiedUser.token;
        // console.log(token)

   
        const { data } = await Axios.delete('/api/products/' + productID, {
            headers: { Authorization: 'Bearer' + ' ' + token }});
       
        console.log(data)

        dispatch({ type: DELETE_PRODUCT_REQUEST_SUCCESSFUL, payload: data });
    }
    
    catch(error) {
        console.log(error)
        dispatch({ type: DELETE_PRODUCT_REQUEST_FAIL, payload: error.response.data.message })
    }
}

export { getProductsList, getSingleProductDetails, createProduct, editProduct, deleteProduct }