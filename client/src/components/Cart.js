import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { IoIosCart } from "react-icons/io";
import "./styles/Cart.css";
import { TiTimes } from "react-icons/ti";
import Badge from "react-bootstrap/Badge";
import { MdRemoveCircle } from "react-icons/md";

class Cart extends Component {
    render() {
        return (
            <div
                className="cart_bar border border-primary"
                style={this.props.cart_shown}
            >
                <Card>
                    <Card.Header>
                        Your cart <IoIosCart />
                        <TiTimes
                            onClick={this.props.close_cart}
                            size={25}
                            style={{ float: "right", cursor: "pointer" }}
                        />
                    </Card.Header>
                    <ListGroup variant="flush">
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
                    <Card.Header>
                        <span>TOTAL</span>
                        <span style={{ float: "right" }}>
                            {this.props.total_price}$
                        </span>
                    </Card.Header>
                </Card>
            </div>
        );
    }
}
export default Cart;
