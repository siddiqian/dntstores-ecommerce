import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { saveDeliveryDetails } from '../../../actionDispatchers/cartActions'
import { nextStep } from "../../../actionDispatchers/wizardStepsActions"
export default () => {
  const [emailConfirm, setEmailConfirm] = useState('')
  const [compState, setCompState] = useState()
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: {
        streetAddress: null,
        city: null,
        country: null
    },
    mobileNum: null
})


  
  const dispatcher = useDispatch()

  const nextHandler = (e) => {
    e.preventDefault();
    // if ()
    dispatcher(saveDeliveryDetails(deliveryDetails))
    dispatcher(nextStep())              
  }

 

  return (
    <Container className="delivery-details-container p-4">
      <Row className="d-flex justify-content-center" fluid>
        <Col>
          {/* <Form onSubmit={(e) => submitHandler(e)}> */}
          <Form onSubmit={nextHandler}>
            <h3 className="d-flex justify-content-center mb-4">Delivery Details</h3>

            <InputGroup className="mb-2 mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-success">Street Address</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                id="inlineFormInputGroupUsername2" 
                placeholder="House #, Street #..." 
                onChange={(e) => 
                  setDeliveryDetails({address: {...deliveryDetails.address, streetAddress: e.target.value}})
                }
                required
              />              
            </InputGroup>

            <InputGroup className="mb-2 mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-success">City</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                id="inlineFormInputGroupUsername2" 
                placeholder="City..." 
                onChange={(e) => 
                  setDeliveryDetails({address: {...deliveryDetails.address, city: e.target.value}})
                }
                required
              />
            </InputGroup>

            <InputGroup className="mb-2 mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-success">Country</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                id="inlineFormInputGroupUsername2" 
                placeholder="Country..." 
                onChange={(e) => 
                  setDeliveryDetails({address: {...deliveryDetails.address, country: e.target.value}})
                }
                required
              />
            </InputGroup> 
            <InputGroup className="mb-2 mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-success">Mobile #</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                id="inlineFormInputGroupUsername2" 
                placeholder="Mobile Number..." 
                onChange={(e) => 
                  setDeliveryDetails({...deliveryDetails, mobileNum: e.target.value})
                }
                required
              />
            </InputGroup>            
          {/* </Form>  
          </Col>
        </Row>  
        <Row>*/}
          <div className="d-flex justify-content-end"> 
            <Button
              variant="success"
              type="submit"
              className="w-50"
            >
              Next 
            </Button>
          </div>
            </Form>
          </Col>
        </Row>
      </Container>
      /* <Button 
      onClick={() =>  {

        }
      }
    >
      Previous
    </Button>
    <Button 
      onClick={ () =>  setCompState(2)
      }
    >
      Next
    </Button> */
    
  )
}
