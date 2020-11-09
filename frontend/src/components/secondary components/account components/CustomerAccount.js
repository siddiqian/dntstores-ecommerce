import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import MyOrdersScreen from './CustomerAccount/MyOrdersScreen'
// import MyOrdersScreen from './CustomerAccount/MyOrdersScreen'
import Profile from './Profile'

// import Sonnet from 'react-bootstrap/Sonnet'



function CustomerAccount(props) {

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
                                <Nav.Link eventKey="second">Orders</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Profile/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <MyOrdersScreen/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default CustomerAccount