import express from "express";
import * as Product_Service from "./Product.service";

export const ProductRouter = express.Router();

ProductRouter.get("/games", async (req, res) => {
    const games = await Product_Service.get_games();
    if (games) res.status(200).send(games);
    else res.status(400).json({ message: "Internal server error" });
});
ProductRouter.post("/checkout", async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(400).json({ message: "No auth token provided" });
    } else {
        res.status(200).send(
            await Product_Service.checkout(token, req.body.products)
        );
    }
});
