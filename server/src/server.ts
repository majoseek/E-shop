import express from "express";
import { MongoClient } from "mongodb";
import Product from "./Product";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
const uri = `mongodb+srv://admin:admin@gameshopcluster.vyzbs.mongodb.net/Shop?retryWrites=true&w=majority`;
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
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = client
        .db("Shop")
        .collection("Users")
        .findOne({ username: username }, (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            }
            if (result) {
                //user found in DB
                bcrypt.compare(
                    password,
                    result.password,
                    async (err, check) => {
                        if (check) {
                            const token = jwt.sign(
                                username,
                                process.env.JWT_SECRET as string
                            );
                            res.status(200).json({
                                message: "User logged in",
                                token: token,
                            });
                        } else {
                            res.status(200).json({
                                message: "Wrong password",
                            });
                        }
                    }
                );
            } else {
                //user not found in DB
                res.status(200).json({
                    message: "User with that username not found",
                });
            }
        });
});
app.post("/register", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
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
                        res
                            .status(200)
                            .json({ message: "User registered successfully" })
                    )
                    .catch((error) => res.sendStatus(400));
            }
        });
});
app.post("/checkout", (req, res) => {
    if (!req.body.token) {
        res.sendStatus(400).json({ message: "No auth token provided" });
    } else {
        jwt.verify(
            req.body.token,
            process.env.JWT_SECRET as string,
            (err: any, username: any) => {
                if (err) {
                    res.send(200).json({
                        message: "User not authenticated",
                        auth: false,
                    });
                } else {
                    res.send(200).json({
                        message: "User authenticated",
                        auth: true,
                    });
                    console.log(username);
                }
            }
        );
    }
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
