import express from "express";
import { print } from "listening-on";
import jsonfile from "jsonfile";
import path from "path";

const app = express();
app.use(express.json());

app.use(express.static("public"));
app.post("/handin", async function (req, res) {
  let user = await jsonfile.readFile(path.resolve("incom.json"));
  console.log(req.body);
  user.push(req.body);
  await jsonfile.writeFile(path.resolve("incom.json"), user);
  res.json("success");
});
const PORT = 8080;
app.listen(PORT, () => {
  print(PORT);
});
