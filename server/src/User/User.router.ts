import express from "express";
import * as User_Service from "./User.service";
import User from "./User.interface";
export const UserRouter = express.Router();

UserRouter.post("/login", async (req, res) => {
    const login_status = await User_Service.login(
        req.body.username,
        req.body.password
    );
    res.json(login_status);
});
UserRouter.post("/register", async (req, res) => {
    if (!req.body.email || !req.body.username || !req.body.password)
        res.status(400).json({ message: "No data provided" });
    const register_status = await User_Service.register({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    res.status(200).json(register_status);
});
