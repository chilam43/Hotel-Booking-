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
