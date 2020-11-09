import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actionDispatchers/userActions';
import { errorDisplayContent } from '../functions/notifs/error';
import { alertService } from '../external dependencies/_services';

function RegisterScreen(props) {

    const user = useSelector(state => state.user)
    const { register: { registering, registeredUser, error } } = user;

    const errors = useSelector(state => state.errors)
    const { errorRegister } = errors;


    console.log(`registerd user ${registeredUser}`)

    // console.log(registeredUser)

    const [name, setName] = useState();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatcher(register(name, email, password));
    }

    const dispatcher = useDispatch();

    useEffect(() => {
      if (errorRegister)
        alertService.error(errorDisplayContent(errorRegister), { autoClose: true, keepAfterRouteChange: false})
      return () => {
        // cleanup
      }
    }, [errorRegister])

    useEffect(() => {

        if(registeredUser)
            // cons
            props.history.push(redirect)
        
        return () => {
            // cleanup
        }
    }, [registeredUser])

    return (
    <Container className="login-container p-4">
      <Row className="d-flex justify-content-center">
        <Col xs={10} sm={8} xl={6}>
          <Form onSubmit={(e) => submitHandler(e)}>

            <h3>Register</h3>

            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="name"
                  name="name" 
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
            <Button type="submit" variant="success" block>Register</Button>
          </Form>        
          <div className="" block>
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
          </div>
          <div className="d-flex justify-content-center">
            <p className="">
            Already Registerd? <Link to={redirect === '/' ? "login" : "login?redirect=" + redirect}>
                                  Login
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
                            <label>Name</label>
                            <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}/>
                        </li>
                        <li>
                            <label>Email</label>
                            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                        </li>
                        <li>
                            <label>Password</label>
                            <input type='password' name='password' id='passwrod' onChange={(e) => setPassword(e.target.value)}/>
                        </li>
                        <li>
                            <label>Repassword</label>
                            <input type='repassword' name='repassword' id='repasswrod' onChange={(e) => setRepassword(e.target.value)}/>
                        </li>
                        <li>
                            <button className="login-button">Register</button>
                        </li>
                        <li>
                            {registering && <div>Registering...</div>}
                            {error && <div>{error}</div>}
                        </li>
                        <li>
                            Already Registerd
                        </li>
                        <li>
                            <Link to={redirect === '/' ? "login" : "login?redirect=" + redirect}>
                                Login
                            </Link>
                        </li>
                    </ul>
                </form>

            </div>

        </div> */
    )
}

export default RegisterScreen