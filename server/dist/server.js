"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
//const jwt = require("jsonwebtoken");
//import bcrypt from "bcrypt";
const app = express_1.default();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3001;
const uri = `mongodb+srv://admin:admin@gameshopcluster.vyzbs.mongodb.net/Shop?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    if (err)
        throw err;
});
app.get("/games", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield client
        .db("Shop")
        .collection("Games")
        .find()
        .toArray();
    res.send(collection);
}));
app.post("/login", (req, res) => {
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
            res.status(200).json({
                message: "User logged in",
                token: "token",
            });
            //user found in DB
            // bcrypt.compare(
            //     password,
            //     result.password,
            //     async (err, check) => {
            //         if (check) {
            //             /*const token = await jwt.sign(
            //                 username,
            //                 process.env.JWT_SECRET
            //             );*/
            //             res.status(200).json({
            //                 message: "User logged in",
            //                 token: "token",
            //             });
            //         } else {
            //             res.status(200).json({
            //                 message: "Wrong password",
            //             });
            //         }
            //     }
            // );
        }
        else {
            //user not found in DB
            res.status(200).json({
                message: "User with that username not found",
            });
        }
    });
});
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const username = req.body.username;
    //const password = await bcrypt.hash(req.body.password, 10);
    const user = client
        .db("Shop")
        .collection("Users")
        .findOne({ email: email }, (err, result) => {
        if (err)
            console.log(err);
        if (result) {
            res.status(200).json({
                message: "User with that email already exists",
            });
        }
        else {
            client
                .db("Shop")
                .collection("Users")
                .insertOne({
                email: email,
                username: username,
                //password: password,
            })
                .then((result) => res
                .status(200)
                .json({ message: "User registered successfully" }))
                .catch((error) => res.sendStatus(400));
        }
    });
}));
app.post("/checkout", (req, res) => {
    req.body.products.forEach((product) => {
        client
            .db("Shop")
            .collection("Games")
            .updateOne({ name: product.name }, { $inc: { amount: -product.qty } })
            .then((result) => res.sendStatus(200))
            .catch((error) => res.sendStatus(400));
    });
    res.sendStatus(200);
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
