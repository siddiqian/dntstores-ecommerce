import React, { useEffect, useState } from 'react'
import { Button, Carousel, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import reactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, updateItemOfCart, removeFromCart } from '../actionDispatchers/cartActions';
import selectorOptionsQty from '../functions/selectorOptionsQty';

function CartScreen(props) {
    
// console.log(product_id)

const cart= useSelector(state => state.cart);
const { cartItems } = cart;
const dispatcher = useDispatch();

const removeItemFromCartHandler = (product_id, qty) => {
    dispatcher(removeFromCart(product_id, qty))
}

const checkoutHandler = () => {
    props.history.push('/login?redirect=finalize-order')
}


console.log(cartItems)

console.log(cartItems)

  return (
    (typeof cartItems !== 'undefined')
    ?
    (cartItems.length !== 0)
    ?
    <Container className="cart-screen p-4">
      <h2 className="mb-3 pt-2">Shopping Cart</h2>
      <Container className="cart-container pb-2" fluid>
        <Container className="cart-items-list">
          {
            cartItems.map(item =>              
              <Row key={item.product_id} className="pt-5 pb-5 border-top border-bottom">
                <Col sm={6} className="d-flex flex-column justify-content-between">
                  <Carousel indicators={false}>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={"/"+item.image}
                        alt="First slide"
                      />
                    </Carousel.Item>              
                  </Carousel>
                  <Button 
                    variant="danger"
                    className="mt-2 mb-2"
                    onClick={() => {removeItemFromCartHandler(item.product_id, item.qty)}}
                    block
                  >
                    Remove From Cart
                  </Button>
                  <InputGroup className="w-100">
                    <Form.Control
                      as="select"
                      className="mr-sm-2"
                      id="qty"
                      value={item.qty}
                      onChange={(e) => 
                        dispatcher(addToCart(item.product_id, e.target.value))
                      }           
                      custom
                    >
                      {
                        selectorOptionsQty(item.availableQty)
                      }
                    </Form.Control>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="bg-warning">Change Qty</InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Col>
                <Col sm={6} className="d-flex flex-column justify-content-between">
                  <div className="display-4 mx-auto">{item.name}</div>
                  <ListGroup horizontal={'sm'} className="my-2">
                    <ListGroup.Item className="w-100" variant="success">Price</ListGroup.Item>
                    <ListGroup.Item 
                      className="w-100 d-flex justify-content-end" 
                      variant="warning"
                    >
                      ${item.price}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal={'sm'} className="my-2">
                    <ListGroup.Item className="w-100" variant="success">Category</ListGroup.Item>
                    <ListGroup.Item 
                      className="w-100 d-flex justify-content-end" 
                      variant="warning"
                      action
                      href="/#category-items"
                    >
                      {item.category}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal={'sm'} className="my-2">
                    <ListGroup.Item className="w-100" variant="success">Brand</ListGroup.Item>
                    <ListGroup.Item 
                      className="w-100 d-flex justify-content-end" 
                      variant="warning"
                      action
                      href="/#brand-items"
                    >
                      {item.brand}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal={'sm'} className="my-2">
                    <ListGroup.Item className="w-100" variant="success">Availability Status</ListGroup.Item>
                    <ListGroup.Item 
                      className="w-100 d-flex justify-content-end" 
                      variant="warning"
                    >
                      {
                        item.availableQty
                        ?
                        "Available"
                        :
                        "Out of Stock"
                      }
                    </ListGroup.Item>
                  </ListGroup>
                  <Container fluid className="product-details-stars-rating">    
                    <reactStars
                      count={5}
                      value={item.rating}
                      size={24}
                      activeColor="#ffd700"
                      isHalf
                    /> <span>{item.rating} stars</span>
                    <p>from {item.noReviews} Reviews</p>
                    <Button variant="warning" block>View Reviews</Button> 
                  </Container>            
                </Col>
              </Row>  
                          
            )            
          }                       
        </Container>                  
        <Container className="cart-action-box mt-5">
          <ListGroup horizontal={'sm'} className="my-2">
            <ListGroup.Item className="w-100" variant="success">
              <h4>
                Total Bill ( 
                    {
                        cartItems.reduce((acc, current) => Number(acc) + Number(current.qty), 0) + " "
                    }                    
                    items)
              </h4>                  
            </ListGroup.Item>
            <ListGroup.Item 
              className="w-100 d-flex justify-content-end" 
              variant="warning"
            >
              <h4>
                $
                {
                    cartItems.reduce((acc, current) => acc + current.price * current.qty, 0)
                }
              </h4>
            </ListGroup.Item>
          </ListGroup>
          <Button 
            variant="success"          
            onClick = { _ => props.history.push('/')} 
            className="continue-shopping-button"
            block
          > 
            <h4>Continue Shopping</h4>
          </Button>
          <Button 
            variant="warning"          
            onClick = {checkoutHandler} 
            className="proceed-to-checkout-button"
            block
          > 
            <h4>Proceed To Checkout</h4>
          </Button>
        </Container>
      </Container>
    </Container>                
        :
        <div>The Cart is Empty</div>
        :
        <div>Loading...</div>    
    )
}

export default CartScreen