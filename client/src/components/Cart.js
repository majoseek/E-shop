import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { IoIosCart } from "react-icons/io";
import "./styles/Cart.css";
import { TiTimes } from "react-icons/ti";
import Badge from "react-bootstrap/Badge";
import { MdRemoveCircle } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
class Cart extends Component {
    render() {
        return (
            <div
                className="cart_bar border border-primary"
                style={this.props.cart_shown}
            >
                <Card style={{ display: "flex", alignItems: "center" }}>
                    <Card.Header style={{ width: "100%" }}>
                        Your cart <IoIosCart />
                        <TiTimes
                            onClick={this.props.close_cart}
                            size={25}
                            style={{ float: "right", cursor: "pointer" }}
                        />
                    </Card.Header>
                    <ListGroup variant="flush" style={{ width: "100%" }}>
                        {this.props.products.map((product) => {
                            return (
                                <ListGroup.Item key={product.name}>
                                    <span>{product.name}</span>
                                    <Badge
                                        style={{ marginLeft: "auto" }}
                                        variant="light"
                                    >
                                        {product.qty}
                                    </Badge>
                                    <MdRemoveCircle
                                        className="m-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            this.props.remove_product(product)
                                        }
                                    />
                                    <span>
                                        <b>{product.price}$</b>
                                    </span>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Card>
                <Card.Header style={{ width: "100%" }}>
                    <span>TOTAL</span>
                    <span style={{ float: "right" }}>
                        {this.props.total_price}$
                    </span>
                </Card.Header>
                <div className="cart_btn_container">
                    <Button
                        className="cart_btns"
                        variant="primary"
                        onClick={this.props.close_cart}
                    >
                        Continue shopping
                    </Button>{" "}
                    <Button
                        className="cart_btns"
                        variant="success"
                        as={Link}
                        to="/checkout"
                    >
                        Checkout
                    </Button>{" "}
                </div>
            </div>
        );
    }
}
export default Cart;
