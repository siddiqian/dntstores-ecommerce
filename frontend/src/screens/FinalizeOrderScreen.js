import React, { useState } from 'react'
import MultiStep from '../components/main components/MultiStep'
// import './css/custom.css'
// import './css/normilize.css'
// import './css/skeleton.css'
import LoginStep from '../components/secondary components/wizard steps/LoginStep'
import DeliveryDetailsStep from '../components/secondary components/wizard steps/DeliveryDetailsStep'
import PaymentMethodStep from '../components/secondary components/wizard steps/PaymentMethodStep'
import FinalizeOrderStep from '../components/secondary components/wizard steps/FinalizeOrderStep'

import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'



const prevStyle = {'background': '#33c3f0', 'border-width': '2px'}
const nextStyle = {'background': '#33c3f0',  'border-width': '2px'}

const FinalizeOrderScreen = (props) => {

  const user = useSelector(state => state.user)

  const { login: { verifying, verifiedUser, error } }  = user;

  console.log(verifiedUser)

  const steps = 
    (verifiedUser)
    ?
    [
      { name: 'Dlivery Details', component: <DeliveryDetailsStep /> },
      { name: 'Payment Method', component: <PaymentMethodStep /> },
      { name: 'Finalize Order', component: <FinalizeOrderStep /> }
    ]
    :
    [
      { name: 'Login', component: <LoginStep /> },
      { name: 'Dlivery Details', component: <DeliveryDetailsStep /> },
      { name: 'Payment Method', component: <PaymentMethodStep /> },
      { name: 'Finalize Order', component: <FinalizeOrderStep /> }
    ];

    console.log(steps)

  return (
    
    <Container className='finalize-order-container d-flex flex-column align-items-center'>
      <Row className="w-100">
        <Col>
          <MultiStep steps={steps} showNavigation={true} />
        </Col>
      </Row>
    </Container>
  )
}

export default FinalizeOrderScreen;