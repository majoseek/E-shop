import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import "./styles/Uppermenu.css";
import { Link } from "react-router-dom";
class Uppermenu extends Component {
    render() {
        return (
            <Navbar
                collapseOnSelect
                expand="lg"
                bg="primary"
                variant="dark"
                fixed="top"
            >
                <Navbar.Brand as={Link} to="/">
                    <b>Gaming Shop</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/games">
                            Games
                        </Nav.Link>
                        <Nav.Link as={Link} to="/checkout">
                            Checkout
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/register"
                            hidden={this.props.logged_in}
                        >
                            Register
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/login"
                            hidden={this.props.logged_in}
                        >
                            Login
                        </Nav.Link>
                    </Nav>
                    <Form inline>
                        <Nav.Link onClick={this.props.open_cart}>
                            My cart
                            <Badge className="m-2 p-1" variant="light">
                                {this.props.products.length}
                            </Badge>
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/"
                            hidden={!this.props.logged_in}
                            onClick={() => {
                                this.props.log_out();
                            }}
                        >
                            Logout
                        </Nav.Link>
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
export default Uppermenu;
