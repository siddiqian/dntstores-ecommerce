import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


function Profile({handleToggleSidebar}) {

    const user = useSelector(state => state.user)

    const { login: { verifying, verifiedUser, error } }  = user;

    console.log(verifiedUser)

    const [name, setName] = useState(verifiedUser.name);
    const [email, setEmail] = useState(verifiedUser.email)
    const [password, setPassword] = useState(verifiedUser.password);
    const [repassword, setRepassword] = useState(verifiedUser.repassword);

  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FontAwesomeIcon icon={faBars} />
      </div>       

      <Container className="profile-component mt-5">
        <Row className="d-flex justify-content-center">
          <Col xs={10} sm={8} xl={6}>
            <Form 
              /* onSubmit={(e) => submitHandler(e)} */
            >

              <h3>Profile </h3>

              <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="name"
                    name="name"
                    value={name} 
                    className="form-control" 
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)} 
                  />
              </Form.Group>

              <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    value={email}
                    className="form-control" 
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)} 
                  />
              </Form.Group>

              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password"
                    className="form-control" 
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)} 
                  />
              </Form.Group>
              <Button type="submit" variant="success" disabled block>Update</Button>
            </Form>        
            {/* <div className="" block>
              <div className="d-flex justify-content-center">
                {
                  registering && !errorRegister
                  && 
                  <p>
                    <Spinner animation="grow" variant="success" /> Registering...
                  </p>
                }
              </div>
              {errorRegister && <div>{<Alert />}</div>}
            </div> */}
          </Col>
        </Row>  
      </Container>
    </main>
  )
}

export default Profile