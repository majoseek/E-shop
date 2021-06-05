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
    if (jwt.verify(token, process.env.JWT_SECRET as string)) {
        products.forEach((product: Product) => {
            client
                .db("Shop")
                .collection("Games")
                .updateOne(
                    { name: product.name },
                    { $inc: { amount: -product.qty } }
                )
                .then(() => {
                    return { message: "Products bought" };
                })
                .catch((error) => {
                    return { message: "Internal server error" };
                });
        });
        return { message: "Products bought" };
    } else {
        return { message: "User not authenticated" };
    }
};
