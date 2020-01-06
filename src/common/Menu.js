import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthApi from '../auth/AuthApi';

class Menu extends React.Component {

    handleClick(event) {
    event.preventDefault();
    AuthApi.logout();    
    }

    render() {

        return (
            <Navbar expand="lg" bg='secondary' variant="dark">
                <Navbar.Brand href="#home">FootApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Menu" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#transfers">Transfers</NavDropdown.Item>
                            <NavDropdown.Item href="#players">Players</NavDropdown.Item>
                            <NavDropdown.Item href="#tournaments">Tournaments</NavDropdown.Item>
                            <NavDropdown.Item href="#footer">Footer</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2} href="#memes">
                           {localStorage.getItem('userName')}
                        </Nav.Link>
                        <Nav.Link href="#deets" onClick={this.handleClick.bind(this)}>Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Menu;