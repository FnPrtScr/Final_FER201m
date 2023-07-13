import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import NotiHome from '../components/Noti.home.component'
const Navbarr = () => {
    return (
        <div className='container-fluid'>

            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Navbar.Brand href="/api/v1/app">Reminders</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NotiHome/>
                    </Nav>
                    <Nav>

                        <Nav.Link href="#">
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navbarr
