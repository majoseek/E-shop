import client from "../database";
import Product from "./Product.interface";
import jwt from "jsonwebtoken";

/**
 *
 * @returns Promise<Array<Product>> - contains all the products, which are avaible in the store
 */
export const get_games = async (): Promise<Array<Product>> => {
    const collection = await client
        .db("Shop")
        .collection("Games")
        .find()
        .toArray();
    return collection;
};

/**
 *
 * @param token - string, which contains auth token
 * @param products - Array<Product>, contains products to purchase for given user
 * @returns
 */
export const checkout = async (
    token: any,
    products: Array<Product>
): Promise<Object> => {
    return new Promise((resolver, reject) => {
        jwt.verify(
            //check if token is correct
            token,
            process.env.JWT_SECRET as string,
            (err: any, decoded: any) => {
                if (err) resolver("Wrong username or password");
                else {
                    products.forEach((product: Product) => {
                        //purchase all of the products
                        client
                            .db("Shop")
                            .collection("Games")
                            .updateOne(
                                { name: product.name },
                                { $inc: { amount: -product.qty } }
                            )
                            .then(() => {
                                resolver({ message: "Products bought" });
                            })
                            .catch((error) => {
                                console.log(error);
                                reject({ message: "Internal server error" });
                            });
                    });
                }
            }
        );
    });
};
