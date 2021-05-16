import express from "express";
const app = express();
const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send("test123");
});
app.get("/testing", (req, res) => {
    res.send("123:)");
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
