import express from "express";
import path from "path";
import { MongoClient } from "mongodb";
const app = express();
const PORT = process.env.PORT || 3001;
const uri =
    "mongodb+srv://admin:admin@gameshopcluster.vyzbs.mongodb.net/Shop?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.get("/", (req, res) => {
    res.send("hi");
});
app.get("/games", (req, res) => {
    client.connect(async (err) => {
        if (err) throw err;
        const collection = await client
            .db("Shop")
            .collection("Games")
            .find()
            .toArray();
        res.send(collection[0]["games"]);
    });
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
