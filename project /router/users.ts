import express from "express";
import jsonfile from "jsonfile";
import path from "path";
import { client } from "../db";

export let userRoutes = express.Router();

type User = {
  username: string;
  password: string;
};

let file = path.resolve("users.json");
let users: User[] = jsonfile.readFileSync(file);

// login
userRoutes.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (!username) {
    res.status(400);
    res.end("Missing username");
    return;
  }
  if (!password) {
    res.status(400);
    res.end("Missing password");
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

// register
userRoutes.post("/register", async (req, res) => {
  let { title, username, email, password } = req.body;
  if (!title) {
    res.status(400);
    return res.json({ status: true, msg: "title fail" });
  }
  if (!username) {
    res.status(400);
    return res.json({ status: true, msg: "username fail" });
  }
  if (!email) {
    res.status(400);
    return res.json({ status: true, msg: "email fail" });
  }
  if (!password) {
    res.status(400);
    return res.json({ status: true, msg: "email fail" });
  }
  await client.query(
    `INSERT INTO users (username, password, created_at, updated_at) 
    VALUES ($1, $2, NOW(), NOW())`,
    [username, password]
  );

  res.json({ success: true });
});
