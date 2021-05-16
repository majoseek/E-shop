import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/styles/App.css";
import Product from "./components/Product";
import CardColumns from "react-bootstrap/CardColumns";
import Cart from "./components/Cart"
import "./components/Menu";
import Menu from "./components/Menu";
function App() {
    const games = [
        {
            name: "Counter Strike: Global-Offensive",
            price: 25,
            img_url:
                "https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1612812939",
        },
        {
            name: "Dragon Ball Z:Kakarot",
            price: 96,
            img_url: "https://i.ytimg.com/vi/kGhegZ4eCGY/maxresdefault.jpg",
        },
        {
            name: "Pokémon Masters EX",
            price: 132,
            img_url:
                "https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_masters/pokemon-masters-ex-169.jpg",
        },
        {
            name: "Super Mario Bros",
            price: 1,
            img_url:
                "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/virtual_console_nintendo_3ds_7/SI_3DSVC_SuperMarioBros.jpg",
        },
        {
            name: "Fortnite",
            price: "FREE",
            img_url:
                "https://compass-ssl.xbox.com/assets/54/f9/54f9ed2b-1092-4e79-9bec-333f913d918f.jpg?n=Fortnite_gallery-0_1350x759_01.jpg",
        },
        {
            name: "Minecraft",
            price: 512,
            img_url:
                "https://gamerweb.pl/wp-content/uploads/minecraft-e1488210750250.jpg",
        },
        {
            name: "Terraria",
            price: 25,
            img_url: "https://i.ytimg.com/vi/oCNiYRNI_UM/maxresdefault.jpg",
        },
    ];
    return (
        <React.Fragment>
            <Menu />
            <Cart />
            <CardColumns>
                {games.map((game) => {
                    return (
                        <Product
                            key={game.name}
                            name={game.name}
                            price={game.price}
                            image_url={game.img_url}
                        />
                    );
                })}
            </CardColumns>
        </React.Fragment>
    );
}

export default App;