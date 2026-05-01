import "express-async-errors";
import express from "express";
const app = express();
app.get("/crash", async (req, res) => {
  await new Promise((resolve, reject) => {
    throw new Error("sync error in executor");
  });
});
app.use((err, req, res, next) => { res.status(500).send("caught"); });
app.listen(5001, () => console.log("started"));
