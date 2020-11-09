import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { getSingleProductDetails } from '../actionDispatchers/productsActions';
import { Button, Carousel, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import selectorOptionsQty from '../functions/selectorOptionsQty';
import { addToCart } from '../actionDispatchers/cartActions';



function ProductDetailsScreen(props) {

  const [qty, setQty] = useState(1);

  const singleProductDetails = useSelector(state => state.singleProductDetails);
  const { loading, productDetails, error } = singleProductDetails;
  const dispatcher = useDispatch();
  const history = useHistory();

  useEffect(() => {

    dispatcher(getSingleProductDetails(props.match.params.product_id))

    return () => {
        // cleanup
    }
  }, [])

  const addToCartHandler = _ => {
    dispatcher(addToCart(productDetails._id, qty?qty:1));
    history.push('/cart')
  }


  return (  
    <Container className="product-details-screen p-4">
      {
      !loading
      ?!error
      ?((typeof productDetails !== 'undefined'))
      ?(!(Object.entries(productDetails).length === 0))
      ?<>
        <Container fluid className="p-4">
          <Row>
            <Col sm={6} className="d-flex flex-column justify-content-between">
              <Carousel indicators={false}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={"/"+productDetails.image}
                    alt="First slide"
                  />
                </Carousel.Item>              
              </Carousel>
              <Link to='/' className="w-100 text-decoration-none">
                <Button 
                  variant="danger"
                  className="mt-2 mb-2"
                  block
                >
                  Leave Back
                </Button>
              </Link>
              <InputGroup className="w-100">
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
                    selectorOptionsQty(productDetails.availableQty)
                  }
                </Form.Control>
                <InputGroup.Append>
                <Link to={`/cart/${productDetails._id}/search?qty=${qty}`} className="w-100 text-decoration-none">
                  <Button 
                    variant="warning"
                    disabled={productDetails.availableQty?false:true}
                    onClick={addToCartHandler}
                    >
                      Add to Cart
                  </Button>
                </Link>
                </InputGroup.Append>              
              </InputGroup>
            </Col>
            <Col sm={6} className="d-flex flex-column justify-content-between">
              <div className="display-4 mx-auto">{productDetails.name}</div>
              <ListGroup horizontal={'sm'} className="my-2">
                <ListGroup.Item className="w-100" variant="success">Price</ListGroup.Item>
                <ListGroup.Item 
                  className="w-100 d-flex justify-content-end" 
                  variant="warning"
                >
                  ${productDetails.price}
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
                  {productDetails.category}
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
                  {productDetails.brand}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal={'sm'} className="my-2">
                <ListGroup.Item className="w-100" variant="success">Availability Status</ListGroup.Item>
                <ListGroup.Item 
                  className="w-100 d-flex justify-content-end" 
                  variant="warning"
                >
                  {
                    productDetails.availableQty
                    ?
                    "Available"
                    :
                    "Out of Stock"
                  }
                </ListGroup.Item>
              </ListGroup>
              <Container fluid className="product-details-stars-rating">    
                <ReactStars
                  count={5}
                  value={productDetails.rating}
                  size={24}
                  activeColor="#ffd700"
                  isHalf
                /> <span>{productDetails.rating} stars</span>
                <p>from {productDetails.noReviews} Reviews</p>
                <Button variant="warning" block>View Reviews</Button> 
              </Container>            
            </Col>
          </Row>
          <Row className="mt-4">
            <h2>Detailed Description</h2>
            <Container>
              {productDetails.description}
            </Container>
            
          </Row>
        </Container>                                            
        </>
        :<div>Loading...</div>
        :<div>Loading....</div>
        :<div>{ error }</div>
        :<div>Loading....</div>
        }
    </Container> 
  )
}

export default ProductDetailsScreen;