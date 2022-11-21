import express from "express";
import { checkPassword, hashPassword } from "../hash";
// import jsonfile from "jsonfile";
// import path from "path";
import { client } from "../db";

// import { isRedirect } from "node-fetch";

export const userRoutes = express.Router();

// register
userRoutes.post("/register", async (req, res) => {
  let {
    title,
    username,
    email,
    password,
    confirmPassword,
    checkBox1,
    checkBox2,
  } = req.body;
  console.log("body :", req.body);

  try {
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
    if (password.length < 7) {
      res.status(400);
      return res.json({
        status: true,
        msg: "password should more than 7 words ",
      });
    }
    if (password != confirmPassword) {
      res.status(400);
      return res.json({
        status: true,
        msg: "confirmPassword do not match password",
      });
    }
    if (!checkBox1 || !checkBox2) {
      res.status(400);
      return res.json({
        status: true,
        msg: "Please check the ACKNOWLEDGMENT",
      });
    }

    let hash_pw = await hashPassword(password);

    await client.query(
      `INSERT INTO users (title, name, email, password) 
    VALUES ($1, $2, $3, $4)`,
      [title, username, email, hash_pw]
    );
    res.json({ status: true, msg: "success" });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ status: false, msg: "server error" });
  }
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
    console.log("session:", req.session.user.id);
    res.status(200).json({ status: true, msg: "login success" });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ status: false, msg: "server error" });
  }
  //   res.status(200)
  //   res.json({})
});

userRoutes.get("/currentUser", (req, res) => {
  res.json({ user: req.session.user });
});

userRoutes.get("/logout", (req, res) => {
  req.session.destroy(() => { });
  res.json({});
});

userRoutes.get("/userBookingRecord", async (req, res) => {
  let user = req.session.user;
  const user_id = user?.id || -1;

  let bookRecord = await client.query(
    /* sql */ `select 
    DISTINCT booking_record.* ,
    room.room_number,
    type.name 
    from booking_record 
    join room on booking_record.room_id = room.id
    join type on room.type_id = type.id
    where user_id=$1 
    and confirm_time is not null`,
    [user_id]
  );

  res.json(bookRecord.rows);
});

userRoutes.get("/cancelBooking/:id", async (req, res) => {
  console.log(req.params.id);

  // let roomId = req.body;

  let date = new Date();

  let user = req.session.user;
  const user_id = user?.id || -1;

  // let bookRecord = req.body;

  let cancelBookRecord = await client.query(
    /* sql */
    `UPDATE booking_record SET cancel_time = ($1)
    where id = ($2)
    and user_id = ($3)`,
    [date, req.params.id, user_id]
  );
  // await function () {};
  console.log(cancelBookRecord);
  res.json({});
});
