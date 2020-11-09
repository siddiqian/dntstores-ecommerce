import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../actionDispatchers/userActions';
import { alertService } from '../external dependencies/_services';
import { Alert } from '../external dependencies/_components';
import { errorDisplayContent } from '../functions/notifs/error';


function LoginScreen(props) {

    const user = useSelector(state => state.user)
    const errors = useSelector(state => state.errors)
    const history =  useHistory()

    const { errorLogin } = errors;

    console.log(props.location)

    const { login: { verifying, verifiedUser, error } }  = user;

    console.log(verifiedUser)

    const [password, setPassword] = useState();
    const [email, setEmail] = useState()

    useEffect(() => {
      if (errorLogin)
        alertService.error(errorDisplayContent(errorLogin), { autoClose: true, keepAfterRouteChange: false})
      return () => {
        // cleanup
      }
    }, [errorLogin])

    useEffect(() => {

      if(verifiedUser) 
        history.push(redirect)
      
      return () => {
          // cleanup
      }
  }, [verifiedUser])

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(email,password)
        dispatcher(login(email, password));
    }

    const dispatcher = useDispatch();   

  return (
      <Container className="login-container p-4">
        <Row className="d-flex justify-content-center">
          <Col xs={10} sm={8} xl={6}>
            <Form onSubmit={(e) => submitHandler(e)}>
              <h3>Sign In</h3>

              <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email"
                    name="email" 
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

              <Form.Group>
                <Form.Check 
                  inline label="Remember Me" 
                  type="checkbox" 
                />
              </Form.Group>

              <Button type="submit" variant="success" block>Login</Button>
              <p className="forgot-password text-right">
                  Forgot <a href="#">password?</a>
              </p>
            </Form>        
            <div className="" block>
              <div className="d-flex justify-content-center">
                {
                  verifying && !errorLogin
                  && 
                  <p>
                    <Spinner animation="grow" variant="success" /> Verifying...
                  </p>
                }
              </div>
              {errorLogin && <div>{<Alert />}</div>}
            </div>
            <div className="d-flex justify-content-center">
              <p className="">
                New to Ecommerce? <Link to={redirect === '/' ? "/register" : "/register?redirect=" + redirect}>
                                    Register
                                  </Link>       
              </p>
            </div> 
          </Col>
        </Row>  
      </Container>                   
        /* <div className="login-screen">
              <div className="login-form-container">
                  <form onSubmit={(e) => submitHandler(e)} className="login-form">
                      <ul className="login-form-items-list">
                          <li>
                              <label>Email</label>
                              <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                          </li>
                          <li>
                            <label>Password</label>
                            <input type='password' name='password' id='passwrod' onChange={(e) => setPassword(e.target.value)}/>
                        </li>
                        <li>
                            <button className="login-button">Login</button>
                        </li>
                        <li>
                            {verifying && <div>Verifying...</div>}
                            {error && <div>{error}</div>}
                        </li>
                        <li>
                            New to Ecommerce
                        </li>
                        <li>
                            <Link to={redirect === '/' ? "/register" : "/register?redirect=" + redirect}>
                                Register
                            </Link>
                        </li>
                    </ul>
                </form>

            </div>

        </div>
        
        </Container> */
    )
}

export default LoginScreen