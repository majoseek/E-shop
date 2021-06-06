import express from "express";
import { ProductRouter } from "./Product/Product.router";
import * as dotenv from "dotenv";
import { UserRouter } from "./User/User.router";
dotenv.config({ path: __dirname + "/.env" });
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
app.use("/product", ProductRouter);
app.use("/user", UserRouter);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
