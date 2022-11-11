import express from "express";
import { checkPassword, hashPassword } from "../hash";
// import jsonfile from "jsonfile";
// import path from "path";
import { client } from "../db";

// import { isRedirect } from "node-fetch";

export const userRoutes = express.Router();

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
    return res.json({ status: true, msg: "password fail" });
  }
  if (password < 7) {
    res.status(400);
    return res.json({ status: true, msg: "password fail" });
  }

  let hash_pw = await hashPassword(password);

  await client.query(
    `INSERT INTO users (title, name, email, password) 
    VALUES ($1, $2, $3, $4)`,
    [title, username, email, hash_pw]
  );

  res.json({ success: true });
});

// login

userRoutes.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ status: false, msg: "Missing email" });
    }

    if (!password) {
      return res.status(400).json({ status: false, msg: "Missing password" });
    }

    let users = await client.query(`select * from users where email = $1`, [
      username,
    ]);

    if (users.rows.length === 0) {
      // No users found
      return res
        .status(400)
        .json({ status: false, msg: "Wrong username or password" });
    }

    let pwMatch = await checkPassword(password, users.rows[0].password);

    if (!pwMatch) {
      // pw not match
      return res
        .status(400)
        .json({ status: false, msg: "Wrong username or password" });
    }

    req.session.user = {
      id: users.rows[0].id,
      name: users.rows[0].name,
      title: users.rows[0].title,
    };
    console.log("session:", req.session.user);
    res.status(200).json({ status: true, msg: "login success" });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ status: false, msg: "server error" });
  }
  //   res.status(200)
  //   res.json({})
});

userRoutes.get("/currentUser", (req, res) => {
  console.log(req.session.user);
  res.json(req.session.user);
});
