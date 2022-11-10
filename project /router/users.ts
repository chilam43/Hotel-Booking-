import express from "express";
import jsonfile from "jsonfile";
import path from "path";

export let userRoutes = express.Router();

type User = {
  username: string;
  password: string;
};

let file = path.resolve("user.json");
let users: User[] = jsonfile.readFileSync(file);

userRoutes.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (!username) {
    res.status(400);
    res.json({ status: true, msg: "username fail" });
    return;
  }
  if (!password) {
    res.status(400);
    return res.json({ status: true, msg: "title fail" });
    return;
  }
  for (let user of users) {
    if (user.username == username && user.password == password) {
      res.status(200);
      res.end("login successful");
      return;
    }
  }
  res.status(401);
  res.end("Wrong username or password");
});

userRoutes.post("/register", (req, res) => {
  let { title, username, email, password } = req.body;
  if (!title) {
    res.status(400);
    res.json({ status: true, msg: "title fail" });
    return;
  }
  if (!username) {
    res.status(400);
    res.json({ status: true, msg: "username fail" });
    return;
  }
  if (!email) {
    res.status(400);
    res.json({ status: true, msg: "email fail" });
    return;
  }
  if (!password) {
    res.status(400);
    res.json({ status: true, msg: "email fail" });
    return;
  }
  console.log(req.body);
  return res.json({ status: true, msg: "register successful" });
});
