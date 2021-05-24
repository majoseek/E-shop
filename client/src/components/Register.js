import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import { withRouter } from "react-router-dom";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_input: "",
            username_input: "",
            password_input: "",
        };
        this.register_user = this.register_user.bind(this);
    }
    register_user() {
        axios
            .post("/register", {
                email: this.state.email_input,
                username: this.state.username_input,
                password: this.state.password_input,
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        this.props.history.push("/");
                        alert("User registered successfully");
                    } else alert("INTERNAL SERVER ERROR");
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    render() {
        return (
            <Container
                className="border border-primary rounded"
                style={{ marginTop: "200px", maxWidth: "40%" }}
            >
                <Row className="p-3">
                    <Col style={{ textAlign: "center" }}>
                        <h4 className="m-4">Join us now!</h4>
                        <Row className="justify-content-md-center">
                            <Col lg="5">
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
                        <Row className="justify-content-md-center">
                            <Col lg="5">
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
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col lg="5">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        onChange={(event) =>
                                            this.setState({
                                                password_input:
                                                    event.target.value,
                                            })
                                        }
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    variant="primary"
                                    className="p-3"
                                    onClick={this.register_user}
                                    disabled={
                                        !this.state.email_input ||
                                        !this.state.username_input ||
                                        !this.state.password_input
                                    }
                                >
                                    Submit
                                </Button>{" "}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(Register);
