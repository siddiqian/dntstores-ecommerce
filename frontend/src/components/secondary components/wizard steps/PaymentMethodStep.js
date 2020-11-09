import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { savePaymentMethod } from '../../../actionDispatchers/cartActions'
import { nextStep, previousStep } from '../../../actionDispatchers/wizardStepsActions'

export default () => {

  const [paymentMethod, setPaymentMethod] = useState('paypal')

  const dispatcher = useDispatch()

  const nextHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod)
    dispatcher(savePaymentMethod(paymentMethod))
    dispatcher(nextStep())              
}

  return (
    <Container className="payment-method-contianer p-4">
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <h3 className="mb-4">Select Payment Method</h3>
          <Form className="mb-4">
            <Form.Check 
              type="radio"
              name="payment-method"
              value="paypal"
              label="Paypal"
              onClick={(e) => {
                setPaymentMethod(e.target.value)
              }}
              defaultChecked
            />
            <Form.Check 
              type="radio"
              name="payment-method"
              value="stripe"
              label="Stripe"
              onClick={(e) => {
                setPaymentMethod(e.target.value)
              }}
            />
            <Form.Check 
              type="radio"
              name="payment-method"
              value="credit-card"
              label="Credit Card"
              onClick={(e) => {
                setPaymentMethod(e.target.value)
              }}
            />
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-between">
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
              onClick={(e) => {nextHandler(e)}} 
              className="w-50"       
            >
              Next 
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
