import React from 'react'
import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <BSNavbar bg="light" expand="lg">
            <Container>
                <BSNavbar.Brand href="#home">React Lab</BSNavbar.Brand>
                <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BSNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Link to='/crud' className='mr-3'>CRUD</Link>
                        <Link to='/chart'>Chart</Link>
                    </Nav>
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    )
}

export default Navbar
