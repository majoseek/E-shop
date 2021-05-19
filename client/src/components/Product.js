import React, { Component } from "react";
import "./styles/Product.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_url: props.image_url,
            name: props.name,
            price: props.price,
        };
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
                            }}
                        >
                            Add to cart
                            <span className="sr-only">unread messages</span>
                        </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        Price updated 1 day ago
                    </Card.Footer>
                </Card>
            </React.Fragment>
        );
    }
}
export default Product;
