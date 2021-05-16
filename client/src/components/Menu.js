import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./styles/Menu.css";

class Menu extends Component {
    render() {
        return (
            <Navbar
                collapseOnSelect
                expand="lg"
                bg="primary"
                variant="dark"
                fixed="top"
            >
                <Navbar.Brand href="#home">
                    <b>Gaming Shop</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Games</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Nav.Link href="#cart">My cart</Nav.Link>
                        <FormControl
                            type="text"
                            placeholder="Enter game name..."
                            className="mr-sm-2"
                        />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Menu;
