import express from "express";
import { MongoClient } from "mongodb";
import Product from "./Product";
import * as dotenv from "dotenv";
const jwt = require("jsonwebtoken");
dotenv.config({ path: __dirname + "/.env" });
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gameshopcluster.vyzbs.mongodb.net/Shop?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    if (err) throw err;
});
app.get("/games", async (req, res) => {
    const collection = await client
        .db("Shop")
        .collection("Games")
        .find()
        .toArray();
    res.send(collection);
});
app.post("/login", (req, res) => {
    //@TODO use jwt token to auth user's connection
    res.sendStatus(200);
});
app.post("/register", (req, res) => {
    const { email, username, password } = req.body;
    const user = client
        .db("Shop")
        .collection("Users")
        .findOne({ email: email }, (err, result) => {
            if (err) console.log(err);
            if (result) {
                res.status(200).json({
                    message: "User with that email already exists",
                });
            } else {
                client
                    .db("Shop")
                    .collection("Users")
                    .insertOne({
                        email: email,
                        username: username,
                        password: password,
                    })
                    .then((result) =>
                        res.status(200).json({ message: "User registered successfully" })
                    )
                    .catch((error) => res.sendStatus(400));
            }
        });
});
app.post("/checkout", (req, res) => {
    req.body.products.forEach((product: Product) => {
        client
            .db("Shop")
            .collection("Games")
            .updateOne(
                { name: product.name },
                { $inc: { amount: -product.qty } }
            )
            .then((result) => res.sendStatus(200))
            .catch((error) => res.sendStatus(400));
    });
    res.sendStatus(200);
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
