import React, { Component } from "react";
import "./styles/Product.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
class Product extends Component {
    constructor(props) {
        super(props);
        this.add_to_cart = this.add_to_cart.bind(this);
        this.state = {
            image_url: props.image_url,
            name: props.name,
            price: props.price,
            count_color: { backgroundColor: "transparent" },
            count: 0,
        };
    }
    add_to_cart() {
        this.setState({
            count: this.state.count + 1,
            count_color: { backgroundColor: "green" },
        });
    }

    render() {
        return (
            <React.Fragment>
                <Card className="m-5 w-75">
                    <Card.Img variant="top" src={this.state.image_url} />
                    <Card.Body>
                        <Card.Title>{this.state.name}</Card.Title>
                        <Card.Text
                            style={{
                                margin: "20px 0 40px 0",
                                color: "green",
                                textAlign: "center",
                                fontSize: "1.7rem",
                            }}
                        >
                            <b>{this.state.price}$</b>
                        </Card.Text>
                        <Button
                            className="butt p-3"
                            variant="outline-primary"
                            onClick={() => {
                                this.props.add_product({
                                    name: this.state.name,
                                    price: this.state.price,
                                });
                                this.add_to_cart();
                            }}
                        >
                            Add to cart
                            <Badge
                                className="m-3"
                                style={this.state.count_color}
                                variant="light"
                            >
                                {this.state.count}
                            </Badge>
                            <span className="sr-only">unread messages</span>
                        </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        Price updated 2 days ago
                    </Card.Footer>
                </Card>
            </React.Fragment>
        );
    }
}
export default Product;
