import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { saveDeliveryDetails } from '../../../actionDispatchers/cartActions';
import { getAllOrderslist, getMyOrderslist } from '../../../actionDispatchers/orderActions';
import { deleteProduct, editProduct, getProductsList } from '../../../actionDispatchers/productsActions';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';



function ViewProducts({handleToggleSidebar}) {


    const user = useSelector(state => state.user)
    const productsList = useSelector(state => state.productsList)
    const history = useHistory();

    const { login: { verifying, verifiedUser, errorUser } }  = user;
    const { loading, products } = productsList;

    console.log(products)

    const dispatcher = useDispatch()
    
    const viewOrderDetailsHandler = (orderID) => () => {
      history.push('/view-order' + orderID)
    }

    useEffect(() => {
        if (verifiedUser)
            dispatcher(getProductsList())
        return () => {
            // cleanup
        }
    }, [])

    

  const columns = [
    {
      dataField: 'image',
      text: 'Thumbnail',
      formatter: cell=>{
        return (
          <a>
            <div className="thumbnail-box">
              
                <img src={cell}/>
            
            </div>
          </a>
        )
      }
    }, {
      dataField: '_id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'category',
      text: 'Category'
    }, {
      dataField: 'brand',
      text: 'Brand'
    }
    , 
    {
      dataField: "price",
      text: 'Price',
      formatter: cell=>'$'+cell
    }
    , {
      dataField: 'rating',
      text: 'Rating',
      formatter: cell=>cell+' '+'stars'
    },
    {
      dataField: 'deliveryDetails.isDelivered',
      text: 'Delivery Status',
      formatter: cell=>cell?'Delivered':'Not Delivered'
    },
    {
      text: 'Actions',
      classes: 'text-nowrap',
      formatter: _=>{
        return (
          <>
            <Button variant='warning mr-1 w-50'>Edit</Button>
            <Button variant='danger w-50'>Delete</Button>
          </>
        )
      }
    }
  ];

  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FontAwesomeIcon icon={faBars} />
      </div> 
      <Container>
        {
          products
          ?
          <BootstrapTable
            keyField="id"
            data={ products }
            columns={ columns }
            striped
            hover
            condensed
            classes="table-responsive"
          />
          :
          <div></div>
        }
      </Container>
    </main>
  )
  }

  export default ViewProducts