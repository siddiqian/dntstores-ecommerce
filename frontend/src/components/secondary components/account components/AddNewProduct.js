import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { saveDeliveryDetails } from '../../../actionDispatchers/cartActions';
import { getMyOrderslist } from '../../../actionDispatchers/orderActions';
import { createProduct, deleteProduct, editProduct, getProductsList } from '../../../actionDispatchers/productsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


function AddNewProduct({handleToggleSidebar}) {


  const productCreate = useSelector(state => state.productCreate)
  const { creating, createdProduct, error } = productCreate;
  const history = useHistory();

  const [product, setProduct] = useState({
      name: null,
      image: null,
      brand: null,
      price: null,
      category: null,
      availableQty: null,
      description: null,
      rating: null,
      noReviews: null,        
  })

  const dispatcher = useDispatch()

          // console.log({...product})
  const submitHandler = (e) => {
      e.preventDefault();
      console.log(product)
      console.log(product.image)
      const productFromData = new FormData();
      productFromData.append('name', product.name)
      productFromData.append('image', product.image)
      productFromData.append('brand', product.brand)
      productFromData.append('price', product.price)
      productFromData.append('category', product.category)
      productFromData.append('availableQty', product.availableQty)
      productFromData.append('description', product.description)
      console.log(productFromData)
      dispatcher(createProduct(productFromData))
      e.target.reset();
  }

  const uploadImageFileHandler = () => {
  }

  console.log(productCreate)

  return (
    <main>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div> 
        <h1>Add New Product</h1> 
        <Form className="" onSubmit={(e) => submitHandler(e)}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Product Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="text" 
                placeholder="Product's Name..."
                name="name"
                id="name"
                onChange={(e) => {
                  setProduct({...product, name: e.target.value})
                  }
                }
               />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Image
            </Form.Label>
            <Col sm={10}>
              <input 
                type="file"
                id="custom-file"
                onChange={(e)=>{
                  e.target.label="Selected"
                  setProduct({...product, image: e.target.files[0]})
                }}
                custom
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="text" 
                placeholder="Product's Category..."
                name="brand"
                id="category"
                onChange={(e) => {
                  setProduct({...product, category: e.target.value})
                  }
                }
               />
            </Col>
          </Form.Group> 
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Brand
            </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="text" 
                placeholder="Product's Brand..."
                name="brand"
                id="brand"
                onChange={(e) => {
                  setProduct({...product, brand: e.target.value})
                  }
                }
               />
            </Col>
          </Form.Group> 
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="number" 
                placeholder="Price..."
                name="price"
                id="price"
                onChange={(e) => {
                  setProduct({...product, price: e.target.value})
                  }
                }
               />
            </Col>
          </Form.Group> 
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Availbale Qty
            </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="number" 
                placeholder="Available Qty..."
                name="available-qty"
                id="available-qty"
                onChange={(e) => {
                  setProduct({...product, availableQty: e.target.value})
                  }
                }
               />
            </Col>
          </Form.Group> 
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control 
                as="textarea" 
                placeholder="Product's Description"
                name="description"
                id="description"
                onChange={(e) => {
                  setProduct({...product, description: e.target.value})
                  }
                }
               />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" variant="success" block>Create Product</Button>
            </Col>
          </Form.Group>
        </Form>     
    </main>
    )

}

export default AddNewProduct