import React from 'react'
import { useState, useEffect } from 'react';
import Navbarr from './Navbar.component'
import { Col, Navbar, Row, Button, Form, Container, FormLabel, Tabs, Tab, NavItem, ListGroup, TabContainer } from 'react-bootstrap'

const DashboardAdmin = () => {
    const [key, setKey] = useState('home');

    return (
        <>
            <Navbarr />
            <Container fluid>
                <Tabs style={{ marginTop: '50px' }} defaultActiveKey="home" transition={false} id="noanim-tab-example">
                    <Tab eventKey="home" title="Dashboard">
                        A
                    </Tab>
                    <Tab eventKey="profile" title="User">
                        B
                    </Tab>
                    <Tab eventKey="contact" title="Notification">
                        C
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}

export default DashboardAdmin