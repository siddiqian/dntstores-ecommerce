import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import CreateProductScreen from '../CreateProductScreen'
import ProductsListScreen from './AdminAccount/ProductsListScreen'
import Profile from './Profile'

// import Sonnet from 'react-bootstrap/Sonnet'



function AdminAccount(props) {

    console.log('profile')
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Add New Product</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Manage Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Orders</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Profile/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <CreateProductScreen/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <ProductsListScreen />
                            {/* <Sonnet /> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                2
                            {/* <Sonnet /> */}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default AdminAccount