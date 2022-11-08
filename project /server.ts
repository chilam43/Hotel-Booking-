import express from "express";
import { print } from "listening-on";
// import { isRedirect } from "node-fetch";

let app = express();

app.use(express.static("public"));

let port = 8030;
app.listen(port, () => {
  print(port);
});
