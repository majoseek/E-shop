import React, { Component } from "react";
import "./styles/Checkout.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_input: "",
            username_input: "",
        };
        this.checkout = this.checkout.bind(this);
    }
    checkout() {
        axios
            .post(
                "/product/checkout",
                {
                    username: this.state.username_input,
                    email: this.state.email_input,
                    products: this.props.products,
                },
                {
                    headers: {
                        authorization: `authorization ${this.props.log_in_token}`,
                    },
                }
            )
            .then(
                (response) => {
                    if (response.status === 200) {
                        this.props.setProducts([]);
                        this.props.history.push("/");
                        alert("We've sent you email with further instructions");
                    } else console.log("INTERNVAL SERVER ERROR");
                },
                (error) => {
                    console.log(error);
                    alert("There was an error with processing your order");
                }
            );
    }
    render() {
        return (
            <Container
                className="border border-primary rounded"
                style={{ marginTop: "200px" }}
            >
                <Row className="p-4">
                    <Col xs={5}>
                        <h4 className="m-4">Billing data</h4>
                        <hr className="mb-5" />
                        <span>
                            Please provide us some information about you
                        </span>
                        <Row className="mt-4">
                            <Col xs={5}>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        onChange={(event) =>
                                            this.setState({
                                                username_input:
                                                    event.target.value,
                                            })
                                        }
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        onChange={(event) =>
                                            this.setState({
                                                email_input: event.target.value,
                                            })
                                        }
                                        placeholder="E-mail"
                                        aria-label="E-mail"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Button
                            onClick={this.checkout}
                            className="p-3 mt-4"
                            style={{ float: "right" }}
                            variant="primary"
                        >
                            CHECKOUT
                        </Button>{" "}
                    </Col>
                    <Col>
                        <h4 className="m-4">Your cart</h4>
                        <hr className="mb-5" />
                        <ListGroup
                            style={{
                                overflowY: "auto",
                                maxHeight: "400px",
                            }}
                        >
                            {this.props.products.map((product) => {
                                return (
                                    <ListGroup.Item key={product.name}>
                                        {product.name}
                                        <Badge
                                            variant="primary"
                                            style={{ marginLeft: "auto" }}
                                        >
                                            {product.qty}
                                        </Badge>
                                        <strong>{product.price}$</strong>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item className="border-0">
                                TOTAL
                                <strong>{this.props.total_price}$</strong>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(Checkout);
