import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/styles/App.css";
import Product from "./components/Product";
import CardColumns from "react-bootstrap/CardColumns";
import "./components/Menu";
import Menu from "./components/Menu";
import { useState } from "react";
import axios from "axios";

function App() {
    const [games, setGames] = useState([]);
    const [products, setProducts] = useState([]);
    const [total_price, setTotalPrice] = useState(0);
    useEffect(() => {
        axios
            .get("/games")
            .then(function (response) {
                setGames(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
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
            <Menu
                products={products}
                total_price={total_price}
                remove_product={remove_product}
            />
            <CardColumns>
                {games.map((game) => {
                    return (
                        <Product
                            key={game.name}
                            name={game.name}
                            price={game.price}
                            image_url={game.img_url}
                            add_product={add_product}
                        />
                    );
                })}
            </CardColumns>
        </React.Fragment>
    );
}

export default App;
