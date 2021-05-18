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
client.connect((err) => {
    if (err) throw err;
});
app.get("/games", async (req, res) => {
    const collection = await client
        .db("Shop")
        .collection("Games")
        .find()
        .toArray();
    res.send(collection[0]["games"]);
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
