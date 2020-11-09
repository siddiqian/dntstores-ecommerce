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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'



function OrdersCustomers({handleToggleSidebar}) {


    const user = useSelector(state => state.user)
    const allOrdersList = useSelector(state => state.allOrdersList)
    const history = useHistory();

    const { login: { verifying, verifiedUser, errorUser } }  = user;
    const { fetching, allOrders, errorMyOrders } = allOrdersList;

    console.log(allOrdersList)
 
    const dispatcher = useDispatch()
    
    const viewOrderDetailsHandler = (orderID) => () => {
      history.push('/view-order' + orderID)
    }

    useEffect(() => {
        if (verifiedUser)
            dispatcher(getAllOrderslist())
        return () => {
            // cleanup
        }
    }, [])

    

    const columns = [{
      dataField: '_id',
      text: 'Order ID'
    }, {
      dataField: 'createdAt',
      text: 'Date'
    }, {
      dataField: 'orderedProducts.length',
      text: 'Total Items'
    }, {
      dataField: 'charges.totalCharges',
      text: 'Total Bill'
    }
    , {
      dataField: "paymentDetails.isPaid",
      text: 'Paid Status',
      formatter: cell=>cell?'Paid':'Unpaid'
    }
    , {
      dataField: 'paymentDetails.isPaid',
      text: 'Payment Date',
      formatter: cell=>cell?'Payment Date':'Unpaid'
    },
    {
      dataField: 'deliveryDetails.isDelivered',
      text: 'Delivery Status',
      formatter: cell=>cell?'Delivered':'Not Delivered'
    },
    {
      dataField: 'deliveryDetails.isDelivered',
      text: 'Delivery Date',
      formatter: cell=>cell?'Delivery Date':'Not Delivered'
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
          allOrders
          ?
          <BootstrapTable
            keyField="id"
            data={ allOrders }
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

export default OrdersCustomers