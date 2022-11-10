import express from "express";
// import jsonfile from "jsonfile";
// import path from "path";
import { client } from "../db";

export const userRoutes = express.Router();

// type User = {
//   username: string;
//   password: string;
// };

// login
// userRoutes.post("/login", (req, res) => {
//   let { username, password } = req.body;

//   if (!username) {
//     res.status(400);
//     res.end("Missing username");
//     return;
//   }
//   if (!password) {
//     res.status(400);
//     res.end("Missing password");
//     return;
//   }
//   for (let user of users) {
//     if (user.username == username && user.password == password) {
//       res.status(200);
//       res.end("login successful");
//       return;
//     }
//   }
//   res.status(401);
//   res.end("Wrong username or password");
// });

// register
userRoutes.post("/register", async (req, res) => {
  let { title, username, email, password } = req.body;
  console.log(req.body);

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
    return res.json({ status: true, msg: "password fail" });
  }
  await client.query(
    `INSERT INTO users (title, name, email, password) 
    VALUES ($1, $2, $3, $4)`,
    [title, username, email, password]
  );

  res.json({ success: true });
});
