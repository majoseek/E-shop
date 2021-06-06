import express from "express";
import { ProductRouter } from "./Product/Product.router";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import client from "./database";
import * as dotenv from "dotenv";
import { UserRouter } from "./User/User.router";
dotenv.config({ path: __dirname + "/.env" });
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
app.use("/product", ProductRouter);
app.use("/user", UserRouter);
app.post("/register", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    client
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
