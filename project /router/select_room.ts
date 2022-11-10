import express from "express";

import { client } from "../db";

export let bookingroute = express.Router();

bookingroute.post("/checkava", async function (req, res) {
  let stay = req.body.checkindate;
  let go = req.body.checkoutdate;
  console.log(stay, go);
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

  // let data = await client.query(`select * from room`);
  console.log(data.rows);
  let arr = [];
  for (let pick of data.rows) {
    arr.push(pick.type_id);
  }

  let a = arr.reduce(function (previous, current) {
    {
      if (previous[current] == null) {
        previous[current] = 0;
      }
      previous[current] += 1;
    }
    return previous;
  }, {});
  let list = { 4: "D", 3: "C", 2: "B", 1: "A" };

  for (let number in a) {
    for (let type in list) {
    }
  }

  res.json({ data: data.rows });
});
