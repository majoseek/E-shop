"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
const jwt = require("jsonwebtoken");
dotenv.config({ path: __dirname + "/.env" });
const app = express_1.default();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3001;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gameshopcluster.vyzbs.mongodb.net/Shop?retryWrites=true&w=majority`;
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
    //@TODO use jwt token to auth user's connection
    res.sendStatus(200);
});
app.post("/register", (req, res) => {
    const { email, username, password } = req.body;
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
                password: password,
            })
                .then((result) => res.status(200).json({ message: "User added" }))
                .catch((error) => res.sendStatus(400));
        }
    });
});
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
