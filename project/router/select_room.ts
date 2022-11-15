import express from "express";

import { client } from "../db";

export let bookingroute = express.Router();

bookingroute.post("/checkava", async function (req, res) {
  let stay = req.body.checkindate;
  let go = req.body.checkoutdate;
  console.log("this is the in " + stay);
  console.log("this is the out" + go);
  let data = await client.query(
    /* sql */ `SELECT room.*
  FROM room
  WHERE id NOT IN (
          SELECT room_id
          FROM booking_record
          WHERE cancel_time is NOT NULL
              AND NOT (
                  check_in_date >= $1::date
                  OR check_out_date <= $2::date
              )
              AND CURRENT_TIMESTAMP > lock_time
      )`,
    [go, stay]
  );
  console.log(data);
  let data2 = await client.query(
    /* sql */ `SELECT 
    type_id,
    COUNT(type_id) as room_ava_count
  FROM room
  WHERE id NOT IN (
          SELECT room_id
          FROM booking_record
          WHERE cancel_time is NOT NULL
              AND NOT (
                  check_in_date >= $1::date
                  OR check_out_date <= $2::date
              )
              AND CURRENT_TIMESTAMP > lock_time
      )
    GROUP BY type_id
      `,
    [go, stay]
  );

  console.log(data2.rows);

  // let list = longlist.reduce(function (previous: any, current: any): void {
  //   if (previous[current] == null) {
  //     previous[current] = 0;
  //   }
  //   previous[current] += 1;
  //   return previous;
  // }, {});
  // console.log(list);
  console.log(data.rows);
  res.json(data.rows);
});

bookingroute.post("/blockroom", async function (req, res) {
  console.log(req.body);
  let stay = req.body.dateNow;
  let go = req.body.checkoutDate;
  let id = req.body.roomType;
  // let date = new Date(); //////important/////
  // let money = req.body.totalprice; ////important ///////
  let ref = Math.ceil(Math.random() * 99999999);
  console.log(ref);
  let roomid = await client.query(
    /* sql */ `SELECT id
  FROM room
  WHERE id NOT IN (
          SELECT room_id
          FROM booking_record
          WHERE cancel_time is NOT NULL
              AND NOT (
                  check_in_date >= $1::date
                  OR check_out_date <= $2::date
              )
              AND CURRENT_TIMESTAMP > lock_time
          
      )AND type_id = $3`,
    [go, stay, id]
  );
  console.log(roomid.rows[0].id);

  //******** */ client.query(
  //   `INSERT INTO booking_record (room_id,user_id,check_in_date,check_out_date,lock_time,final_price,ref_number)VALUES($1,$2,$3,$4,$5,$6,$7)`,
  //   [roomid.rows[0].id, 2, stay, go, date, money, ref]
  // );

  res.json("success handin info");
});
