import jwt from "jsonwebtoken";
import client from "../database";
import bcrypt from "bcrypt";
import User from "./User.interface";

/**
 *
 * @param username string containing username of user, which tries to log in
 * @param password string containing password of user, which tries to log in
 * @returns Promise<Object> login status, which tells if user data is correct
 */
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

/**
 *
 * @param user interface:User, contains user, which tries to register
 * @returns Promise<Object> register status, which tells if user successfully registered
 */
export const register = async (user: User): Promise<Object> => {
    return new Promise((resolver, reject) => {
        client
            .db("Shop")
            .collection("Users")
            .findOne({ email: user.email }, (err, result) => {
                //check if user with that email exists
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
                            //register user
                            email: user.email,
                            username: user.username,
                            password: user.password,
                        })
                        .then(() =>
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
