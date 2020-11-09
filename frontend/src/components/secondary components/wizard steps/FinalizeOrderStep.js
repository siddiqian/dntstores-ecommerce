import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Col, Container, ListGroup, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { previousStep } from '../../../actionDispatchers/wizardStepsActions'
import { createOrder } from '../../../actionDispatchers/orderActions';
import { deleteCart } from '../../../actionDispatchers/cartActions';
import { useHistory } from 'react-router-dom';


export default () => {
  const [checked, setChecked] = useState('')
  const dispatcher = useDispatch()
  const cart= useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate)
  const { creating, createdOrder, error } = orderCreate;

  console.log(createdOrder)

  const history = useHistory();

  const { cartItems, deliveryDetails, paymentMethod } = cart;

  const itemsPrice = cartItems.reduce((acc, current) => {
    return acc + current.price*current.qty
  },0)
  const deliveryCharges = 10;
  const totalCharges = itemsPrice + deliveryCharges;

  const finalizeOrderHandler = (e) => {
    e.preventDefault();
    dispatcher(createOrder({
      orderedProducts: cartItems, 
      deliveryDetails, 
      paymentMethod,
      charges: {itemsPrice, deliveryCharges, totalCharges}
    }))        
  }

  useEffect(() => {
    if (createdOrder) {
      dispatcher(deleteCart())
      history.push('/');
    }
    return () => {
        // cleanup
    }
  }, [createdOrder])

  return (
    <Container className="finalize-order-contianer p-4">
      <Row>
        <Col>
          <div className="finalize-order-delivery-details d-flex flex-column align-items-center">
            <h4>Delivery Details</h4>
            <Table striped bordered hover variant="success" className="mw-100 inline-block">
              <tbody>
                <tr>
                  <td>Street Address</td>
                  <td>
                    {
                      deliveryDetails.address.streetAddress
                    }
                  </td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>
                    {
                      deliveryDetails.address.city
                    }
                  </td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>
                    {
                      deliveryDetails.address.country
                    }
                  </td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>
                    {
                      deliveryDetails.mobileNum
                    }
                  </td>
                </tr>
              </tbody>
            </Table>                      
          </div>
          <div className="finalize-order-payment-method d-flex flex-column align-items-center">
            <h4>Payment Method</h4>
            <Table striped bordered hover variant="success" className="mw-100 inline-block">
              <tbody>
                <tr>
                  <td>Payment Method</td>
                  <td>
                    {
                      paymentMethod
                    }
                  </td>
                </tr>
              </tbody>                  
            </Table>                      
          </div>
          <div className="finalize-order-cart-container d-flex flex-column align-items-center">
            <h4>Cart Items</h4>
            <ul className="finalize-order-cart-items-list">
              {
                cartItems.map(item => 
                  <li>
                    <hr id="top-hr"/>
                    <div className = "cart-item">
                      <div className = "cart-product-thumbnail">
                        <img src={'.' + item.image} alt="Product Thumbnail"/>
                      </div>
                      <ul className = "cart-item-details">
                        <li>
                            Name: {item.name}
                        </li>
                        <li>
                            Unit Price: ${item.price}
                        </li>
                        <li>
                            Qty: {item.qty}                                           
                        </li>
                        <li>
                            Sub-Total: ${item.price*item.qty}
                        </li>
                      </ul>
                    </div>
                    <hr/>
                  </li>                        
                )                    
              }                       
            </ul>
          </div>            
          <div className="finalize-order-summary d-flex flex-column align-items-center">
            <Card className="bg-success w-100">
              <Card.Header >            
                <h4 className="d-flex flex-column align-items-center">
                  Summary
                </h4>
            </Card.Header>
              <Card.Body>
                <ListGroup horizontal={'sm'} className="my-2">
                  <ListGroup.Item className="w-100" variant="success">Items Price</ListGroup.Item>
                  <ListGroup.Item 
                    className="w-100 d-flex justify-content-end" 
                    variant="warning"
                  >
                    ${itemsPrice}              
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal={'sm'} className="my-2">
                  <ListGroup.Item className="w-100" variant="success">Delivery Charges</ListGroup.Item>
                  <ListGroup.Item 
                    className="w-100 d-flex justify-content-end" 
                    variant="warning"
                  >
                    ${deliveryCharges}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal={'sm'} className="my-2">
                  <ListGroup.Item className="w-100" variant="success">Total</ListGroup.Item>
                  <ListGroup.Item 
                    className="w-100 d-flex justify-content-end" 
                    variant="warning"
                  >
                    ${ totalCharges }
                  </ListGroup.Item>
                </ListGroup>              
              </Card.Body>
            </Card>
          </div>     
      </Col>
    </Row>
    <Row className="mt-5">
      <Col className="d-flex justify-content-between">
        <Button
          variant="warning"
          onClick={() => {
            dispatcher(previousStep())
          }}
          className="w-50 mr-1"       
        >
          Previous
        </Button>
        <Button
          variant="success"
          onClick={(e) => {finalizeOrderHandler(e)}} 
          className="w-50"       
        >
          Finalize Order 
        </Button>
      </Col>
    </Row>
  </Container>
  )
}
