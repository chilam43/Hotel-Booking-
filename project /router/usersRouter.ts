import express from "express";
import { checkPassword, hashPassword } from "../hash";
// import jsonfile from "jsonfile";
// import path from "path";
import { client } from "../db";
// import { request } from "http";

export const userRoutes = express.Router();

// type User = {
//   username: string;
//   password: string;
// };

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

// async function login(req: express.Request, res: express.Response) {
//   const { username, password } = req.body;
//   const users = (
//     await client.query(`SELECT * FROM users WHERE email = $1`, [username])
//   ).rows;

//   const user = users[0];
//   if (!user) {
//     return res.status(401).redirect("/login.html?error=Incorrect+Username");
//   }

//   const match = await checkPassword(password, user.password);
//   if (match) {
//     return res.redirect("/"); // To the protected page.
//   } else {
//     return res.status(401).redirect("/login.html?error=Incorrect+Username");
//   }
// }

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

    return res.status(200).json({ status: true, msg: "login success" });
  } catch (error) {
    return res.status(400).json({ status: false, msg: "server error" });
  }
  //   res.status(200)
  //   res.json({})
});
