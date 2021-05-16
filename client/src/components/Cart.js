import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { IoIosCart } from "react-icons/io";
import "./styles/Cart.css";
import { TiTimes } from "react-icons/ti";
const products = [
    {
        name: "Counter Strike: Global-Offensive",
        price: 25,
    },
    {
        name: "Dragon Ball Z:Kakarot",
        price: 96,
    },
    {
        name: "Dragon Ball Z:Kakarot5",
        price: 96,
    },
    {
        name: "Dragon Ball Z:Kak5arot",
        price: 96,
    },
    {
        name: "Dragon Ball Z:K2akarot",
        price: 96,
    },
    {
        name: "Dragon Ball Z:Kgakarot",
        price: 96,
    },
    {
        name: "Dragon Ball Z:Kaskarot",
        price: 96,
    },
    {
        name: "Dragon Ball Z:Ka1karot",
        price: 96,
    },
    {
        name: "Dragon B3all Z:Kakarot",
        price: 96,
    },
    {
        name: "Dragon Ball 3Z:Kakarot",
        price: 16,
    },
    {
        name: "Dragon Balfl Z:Kakarot",
        price: 66,
    },
    {
        name: "Dragon Ball Zs:Kakarot",
        price: 36,
    },
];
const total_price = products.reduce((total, b) => total + b.price, 0);
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart_class: "cart_bar border border-primary",
        };
        this.close_cart = this.close_cart.bind(this);
    }
    close_cart() {
        this.setState({ cart_class: "cart_bar border border-primary hid" });
    }
    render() {
        return (
            <div className={this.state.cart_class}>
                <Card>
                    <Card.Header>
                        Your cart <IoIosCart />
                        <TiTimes
                            onClick={this.close_cart}
                            size={25}
                            style={{ float: "right", cursor: "pointer" }}
                        />
                    </Card.Header>
                    <ListGroup variant="flush">
                        {products.map((product) => {
                            return (
                                <ListGroup.Item key={product.name}>
                                    <span>{product.name}</span>
                                    <span>
                                        <b>{product.price}$</b>
                                    </span>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                    <Card.Header>
                        <span>TOTAL</span>
                        <span style={{ float: "right" }}>{total_price}$</span>
                    </Card.Header>
                </Card>
            </div>
        );
    }
}
export default Cart;
