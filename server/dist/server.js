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
const Product_router_1 = require("./Product/Product.router");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("./database"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "/.env" });
const app = express_1.default();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3001;
app.use("/product", Product_router_1.ProductRouter);
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    database_1.default
        .db("Shop")
        .collection("Users")
        .findOne({ username: username }, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        }
        if (result) {
            //user found in DB
            bcrypt_1.default.compare(password, result.password, (err, check) => __awaiter(void 0, void 0, void 0, function* () {
                if (check) {
                    const token = jsonwebtoken_1.default.sign(username, process.env.JWT_SECRET);
                    res.status(200).json({
                        message: "User logged in",
                        token: token,
                    });
                }
                else {
                    res.status(200).json({
                        message: "Wrong password",
                    });
                }
            }));
        }
        else {
            //user not found in DB
            res.status(200).json({
                message: "User with that username not found",
            });
        }
    });
}));
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const username = req.body.username;
    const password = yield bcrypt_1.default.hash(req.body.password, 10);
    const user = database_1.default
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
            database_1.default
                .db("Shop")
                .collection("Users")
                .insertOne({
                email: email,
                username: username,
                password: password,
            })
                .then((result) => res
                .status(200)
                .json({ message: "User registered successfully" }))
                .catch((error) => res.sendStatus(400));
        }
    });
}));
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
