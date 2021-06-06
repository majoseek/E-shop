import client from "../database";
import Product from "./Product.interface";
import jwt from "jsonwebtoken";
export const get_games = async (): Promise<Array<Product>> => {
    const collection = await client
        .db("Shop")
        .collection("Games")
        .find()
        .toArray();
    return collection;
};
export const checkout = async (
    token: any,
    products: Array<Product>
): Promise<Object> => {
    return new Promise((resolver, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            (err: any, decoded: any) => {
                if (err) resolver("Wrong username or password");
                else {
                    products.forEach((product: Product) => {
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
