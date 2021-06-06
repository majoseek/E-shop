import jwt from "jsonwebtoken";
import client from "../database";
import bcrypt from "bcrypt";
import User from "./User.interface";
export const login = async (
    username: string,
    password: string
): Promise<Object> => {
    if (!username || !password) return { message: "No data provided" };
    else {
        return new Promise((resolver, reject) => {
            client
                .db("Shop")
                .collection("Users")
                .findOne({ username: username }, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject({ message: "Internal server error" });
                    }
                    if (result) {
                        //user found in DB
                        bcrypt.compare(
                            password,
                            result.password,
                            (err, check) => {
                                if (check) {
                                    const token = jwt.sign(
                                        username,
                                        process.env.JWT_SECRET as string
                                    );
                                    resolver({
                                        message: "User logged in",
                                        token: token,
                                    });
                                } else {
                                    resolver({
                                        message: "Wrong password",
                                    });
                                }
                            }
                        );
                    } else {
                        //user not found in DB
                        resolver({
                            message: "User with that username not found",
                        });
                    }
                });
        });
    }
};

export const register = async (user: User): Promise<Object> => {
    return new Promise((resolver, reject) => {
        client
            .db("Shop")
            .collection("Users")
            .findOne({ email: user.email }, (err, result) => {
                if (err) console.log(err);
                if (result) {
                    resolver({
                        message: "User with that email already exists",
                    });
                } else {
                    client
                        .db("Shop")
                        .collection("Users")
                        .insertOne({
                            email: user.email,
                            username: user.username,
                            password: user.password,
                        })
                        .then((result) =>
                            resolver({
                                message: "User registered successfully",
                            })
                        )
                        .catch((error) =>
                            reject({ message: "Internal server error" })
                        );
                }
            });
    });
};
