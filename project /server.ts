import express from "express";
import { print } from "listening-on";

let app = express();

app.use(express.static("public"));

app.post("/landing", (req, res) => {});

let port = 8030;
app.listen(port, () => {
  print(port);
});