import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Form, FormControl, InputGroup, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../../actionDispatchers/userActions';
import { useHistory } from 'react-router-dom';

function Header (props) {
  
  const login = useSelector(state => state.user.login)
  const register = useSelector(state => state.user.register)


  const history = useHistory();
  const dispatcher = useDispatch()

  const verifiedUser = () => {
    try {
      const { verifiedUser } = login;
      if (verifiedUser)
        return verifiedUser;
      throw new Error
    } catch (error) {
      const { registeredUser }  = register
      return registeredUser;
    }
  }

  // useEffect(() => {
  //   if(verifiedUser())
  //     history.push('/')
  //   return () => {
  //     // cleanup
  //   };
  // }, [])

  

  console.log(verifiedUser())

  let catgories =  [
    "Category # 1",
    "Category # 2",
    "Category # 3",
    "Category # 4",
    "Category # 5",
    "Category # 6"
  ]; //tbr

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="success" variant="dark" sticky="top" className="custom-nav-bar">
            <Navbar.Brand href='/' className="vcenter-item">
                <img
                    alt=""
                    src="./images/logos/Logo1.jpg"
                    width="30"
                    height="30"
                    className="d-inline-block"
                />
                &nbsp;<span>DnT Stores</span>
            </Navbar.Brand>   
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                <Nav className="">
                    <Nav.Link href='/'>Shop</Nav.Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                      {
                        catgories.map(category => 
                          <NavDropdown.Item key={category} href={category}>
                            {category}
                          </NavDropdown.Item>)                        
                      }                      
                      <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">View All</NavDropdown.Item>
                  </NavDropdown>
                </Nav> 
                <Nav className="justify-content-end">
                    <Nav.Link href='/cart'>
                      Cart &nbsp;
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </Nav.Link>
                    {
                      verifiedUser()
                        ?
                        <NavDropdown 
                          title={verifiedUser().name}
                          alignRight
                        >

                          <NavDropdown.Item href="/account">
                            Account
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => {
                            dispatcher(logout());
                            history.push('/')
                            }
                          }>
                            Logout
                          </NavDropdown.Item>                       
                        </NavDropdown>
                        :                   
                        <Nav.Link href='/login'>Login</Nav.Link>
                    }                    
                </Nav>   
            </Navbar.Collapse> 

          </Navbar>     
    </>
  )
}

export default Header