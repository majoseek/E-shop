import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Cart from "./Cart";
import "./styles/Menu.css";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart_display: { display: "none" },
        };
        this.open_cart = this.open_cart.bind(this);
        this.close_cart = this.close_cart.bind(this);
    }
    close_cart() {
        this.setState({ cart_display: { display: "none" } });
    }
    open_cart() {
        this.setState({ cart_display: { display: "flex" } });
    }
    render() {
        return (
            <React.Fragment>
                <Cart
                    close_cart={this.close_cart}
                    cart_shown={this.state.cart_display}
                    products={this.props.products}
                    total_price={this.props.total_price}
                    remove_product={this.props.remove_product}
                />
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
                            <Nav.Link href="#cart" onClick={this.open_cart}>
                                My cart
                                <Badge className="m-2 p-1" variant="light">
                                    {this.props.products.length}
                                </Badge>
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
            </React.Fragment>
        );
    }
}
export default Menu;
