import express from "express";
import { ProductRouter } from "./Product/Product.router";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import client from "./database";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
app.use("/product", ProductRouter);
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    client
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
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
