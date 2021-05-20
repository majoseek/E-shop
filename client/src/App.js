import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/styles/App.css";
import Product from "./components/Product";
import CardColumns from "react-bootstrap/CardColumns";
import { useState } from "react";
import axios from "axios";
import Uppermenu from "./components/Uppermenu";
import Cart from "./components/Cart";
import { Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Welcome from "./components/Welcome";

function App() {
    const [games, setGames] = useState([]);
    const [products, setProducts] = useState([]);
    const [total_price, setTotalPrice] = useState(0);
    const [cart_display, setCartDisplay] = useState({ display: "none" });
    useEffect(() => {
        axios
            .get("/games")
            .then(function (response) {
                setGames(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const add_product = (product) => {
        setTotalPrice(total_price + product.price);
        const exist = products.find((x) => x.name === product.name);
        if (exist) {
            setProducts(
                products.map((x) =>
                    x.name === product.name
                        ? { ...exist, qty: exist.qty + 1 }
                        : x
                )
            );
        } else {
            setProducts([...products, { ...product, qty: 1 }]);
        }
    };
    const remove_product = (product) => {
        setTotalPrice(total_price - product.price);
        const exist = products.find((x) => x.name === product.name);
        if (exist.qty === 1) {
            setProducts(products.filter((x) => x.name !== product.name));
        } else {
            setProducts(
                products.map((x) =>
                    x.name === product.name
                        ? { ...exist, qty: exist.qty - 1 }
                        : x
                )
            );
        }
    };
    return (
        <React.Fragment>
            <Uppermenu
                products={products}
                open_cart={() => {
                    setCartDisplay({ display: "flex" });
                }}
            />
            <Cart
                close_cart={() => {
                    setCartDisplay({ display: "none" });
                }}
                cart_shown={cart_display}
                products={products}
                total_price={total_price}
                remove_product={remove_product}
            />
            <Route exact path="/">
                <Welcome />
            </Route>
            <Route exact path="/games">
                <CardColumns>
                    {games.map((game) => {
                        return (
                            <Product
                                key={game.name}
                                name={game.name}
                                price={game.price}
                                image_url={game.img_url}
                                amount={game.amount}
                                add_product={add_product}
                            />
                        );
                    })}
                </CardColumns>
            </Route>
            <Route exact path="/checkout">
                <Checkout
                    total_price={total_price}
                    products={products}
                    setProducts={setProducts}
                />
            </Route>
        </React.Fragment>
    );
}
export default App;
