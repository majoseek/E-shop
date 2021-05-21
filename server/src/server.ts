import express from "express";
import { MongoClient } from "mongodb";
import Product from "./Product";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
const uri =
    "mongodb+srv://admin:admin@gameshopcluster.vyzbs.mongodb.net/Shop?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    if (err) throw err;
});
app.get("/games", async (req, res) => {
    const collection = await client
        .db("Shop")
        .collection("Games")
        .find()
        .toArray();
    res.send(collection);
});
app.post("/login", (req, res) => {
    res.sendStatus(200);
});
app.post("/register", (req, res) => {
    res.sendStatus(200);
});
app.post("/checkout", (req, res) => {
    req.body.products.forEach((product: Product) => {
        client
            .db("Shop")
            .collection("Games")
            .updateOne(
                { name: product.name },
                { $inc: { amount: -product.qty } }
            );
    });
    res.sendStatus(200);
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
