import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import { addToCart } from '../../actionDispatchers/cartActions'
import moment from 'moment';
import { Badge, Button, Card, Container, Form, FormControl, InputGroup, ListGroup, ListGroupItem, Toast } from 'react-bootstrap';
import selectorOptionsQty from '../../functions/selectorOptionsQty';
import { useDispatch, useSelector } from 'react-redux';
import { alertService } from '../../external dependencies/_services';
import { Alert } from '../../external dependencies/_components';
import { errorDisplayContent } from '../../functions/notifs/error';
import SweetAlert from 'react-bootstrap-sweetalert';



// import {addItem, updateItem, removeItem} from './cartHelpers';

function ProductCard ({ 
  product, 
  showViewProductButton = true, 
  showAddToCartButton = true ,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f, // default value of function
  run = undefined // default value of undefined
}) {
  const [redirect, setRedirect] = useState(false);
  const [showAddToCartSuccessModalFlag, setShowAddToCartSuccessModalFlag] = useState(false)
  const [qty, setQty] = useState(0);
  const [availableQty, setAvailableQty] = useState(product.availableQty)
  const dispatcher = useDispatch()
  const history = useHistory();
  const errorAddToCart = useSelector(state => {
    try{
      if(state.errors.errorAddToCart.errorID == product._id)
        return state.errors.errorAddToCart
    } catch {
      return null
    }
  })

  console.log(errorAddToCart)
  // const errorRef = useRef()

  const showErrorFunction = () => {

  // alertService.success('Success!!', { autoClose: true, keepAfterRouteChange: false})
  }

  useEffect(() => {
    if (errorAddToCart)
      alertService.error(errorDisplayContent(errorAddToCart), { autoClose: true, keepAfterRouteChange: false})
    return () => {
      // cleanup
    }
  }, [errorAddToCart])

  const ShowImage = ({ item, url }) => (
    <div className="product-img">
      <img
        src={product.image}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" ,height:"200px"}}
      />
    </div>
  );

  const showViewButton = (showViewProductButton) => {
    return (
    showViewProductButton && (
        <Button 
          key={product._id}
          variant="outline-success"
          className="mb-2"
          onClick={_=>history.push(`/product/${product._id}`)}
          block
        >
          View Product
        </Button>
    )
)
};
  const showAddToCartSuccessModal = () => {
    return (
      <SweetAlert
        success 
        onCancel={() =>{ 
          setShowAddToCartSuccessModalFlag(false)
          }
        }
        customButtons={
          <React.Fragment>
            <Button 
              variant="success" 
              onClick = {() => {
                setShowAddToCartSuccessModalFlag(false)
                setAvailableQty(availableQty-qty)
                }
              }>
                Continue Shopping
            </Button>
            <Button 
              variant="outline-warning"
              onClick = {() => 
                {history.push('/cart')}
              }>
                View Cart
            </Button>
          </React.Fragment>
      }
    >
      Sucessfully Added to Cart
    </SweetAlert>
    )
  } 

  const addToCartHandler = () => {

    dispatcher(addToCart(product._id, qty?qty:1));

    setShowAddToCartSuccessModalFlag(true)

    // history.push('/cart')      

  };

  const shouldRedirect = redirect => {
    if(redirect) {
      return <Redirect to="/cart" />
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton &&
      (
        <InputGroup className="mb-3">
          <Form.Control
            as="select"
            className="mr-sm-2"
            id="qty"
            /* value={qty} */
            onChange={(e) => setQty(e.target.value)}           
            custom
          >
            <option value="0">Qty...</option>
            {
              selectorOptionsQty(product.availableQty)
            }
          </Form.Control>
          <InputGroup.Append>
            <Button 
              key={product._id}
              variant="warning" 
              onClick={addToCartHandler}
              disabled={product.availableQty?false:true}
            >
              Add to Cart
            </Button>
          </InputGroup.Append>
        </InputGroup>


      )
    )
  };

  const showStock = (availableQty) => {
    return availableQty > 0 ? 
      <Badge pill variant="success mb-2">
        Available
      </Badge>:
      <Badge pill variant="danger mb-2">
        Out of Stock
      </Badge>     
  };

  const handleChange = productId => e => {
    setRun(!run); // run useEffect in parent Cart
    // setCount(e.target.value < 1 ? 1 : e.target.value)
    if(e.target.value >= 1) {
        // updateItem(productId, e.target.value)
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            Adjust Quantity
          </span>
        </div>
        <input 
          type="number" 
          className="form-control"
          /* value={count} */
          onChange={handleChange(product._id)}
        />
      </div>
    </div>
    };

  
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton &&
        (
          <button 
            onClick={() => {
                {/* removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart */}
            }}
            className="btn btn-outline-danger ml-2 mt-2 mb-2"
          >
            Remove Product
          </button>
        )
    )
  };

  




  return(
    <Fragment key={product._id}>
      {showAddToCartSuccessModalFlag && showAddToCartSuccessModal()}

      <Card key={product._id}>
        <Card.Header className="text-center bg-success">
            <h4>{product.name}</h4>
        </Card.Header>
        <div className="border-bottom border-light border-2 responsive-image-box">
          <div className="image-content">
            <Card.Img src={product.image}/>
          </div>
        </div>
          <Card.Body className="card-body">
            {/* {shouldRedirect(redirect)} */}
            {/* <ShowImage item={product} url="product"/> */}
            <Card.Title>Description</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroupItem>${product.price}</ListGroupItem>
              <ListGroupItem>Brand: {product.brand}</ListGroupItem>
              <ListGroupItem>Category: {product.category && product.category.name}</ListGroupItem>
            </ListGroup>
                      
            {showStock(product.availableQty)}
            <br/>
            <Container fluid className="d-flex justify-content-center flex-wrap">
              {showViewButton(showViewProductButton)}
              {showAddToCart(showAddToCartButton)}
              {showRemoveButton(showRemoveProductButton)}
              {showCartUpdateOptions(cartUpdate)}
            </Container>
            {errorAddToCart && <Alert /> } 

   
        </Card.Body>
      </Card>
      
    </Fragment>          
  )
}
export default ProductCard