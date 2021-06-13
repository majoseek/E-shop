import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gameshopcluster.vyzbs.mongodb.net/Shop?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    if (err) throw err;
    console.log("Connection to database has been estabilished");
});
export default client;
