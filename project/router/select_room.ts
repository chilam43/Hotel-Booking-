// import { timeStamp } from "console";
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
    SELECT room.id
    FROM booking_record
    JOIN room on booking_record.room_id = room.id
    WHERE NOT (
        check_in_date::date >= $1::date
        OR check_out_date::date <= $2::date
    )
    AND payment_time is NULL
    OR (now()::timestamp < lock_time::timestamp AND payment_time is NULL)

    UNION

    SELECT room.id
    FROM booking_record
    JOIN room on booking_record.room_id = room.id
    WHERE payment_time is NOT NULL
    AND NOT (
        check_in_date::date >= $1::date
        OR check_out_date::date <= $2::date
    )
    AND cancel_time is NOT NULL

)`,
    [go, stay]
  );
  console.log(data.rows);

  // let data2 = await client.query(
  //   /* sql */ `SELECT
  //   type_id,
  //   COUNT(type_id) as room_ava_count
  // FROM room
  // WHERE id NOT IN (
  //         SELECT room_id
  //         FROM booking_record
  //         WHERE cancel_time is NOT NULL
  //             AND NOT (
  //                 check_in_date >= $1::date
  //                 OR check_out_date <= $2::date
  //                 AND lock_time::timestamp > now()::timestamp
  //             )
  //     )
  //   GROUP BY type_id
  //     `,
  //   [go, stay]
  // );

  // console.log(data2.rows);

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
  let date = new Date();
  let digit = date.getTime();
  let newtime = new Date(digit + 30000 * 40);
  let money = req.body.totalprice; ////important ///////
  let ref = Math.ceil(Math.random() * 99999999);
  console.log(ref);
  let roomid = await client.query(
    /* sql */ `SELECT room.*
FROM room
WHERE id NOT IN (
    SELECT room.id
    FROM booking_record
    JOIN room on booking_record.room_id = room.id
    WHERE NOT (
        check_in_date::date >= $1::date
        OR check_out_date::date <= $2::date
    )
    AND payment_time is NULL
    OR (now()::timestamp < lock_time::timestamp AND payment_time is NULL)

    UNION

    SELECT room.id
    FROM booking_record
    JOIN room on booking_record.room_id = room.id
    WHERE payment_time is NOT NULL
    AND NOT (
        check_in_date::date >= $1::date
        OR check_out_date::date <= $2::date
    )
    AND cancel_time is NOT NULL
)
AND type_id = $3`,
    [go, stay, id]
  );
  console.log(roomid.rows);

  client.query(
    `INSERT INTO booking_record (room_id,user_id,check_in_date,check_out_date,lock_time,final_price,ref_number)VALUES($1,$2,$3,$4,$5,$6,$7)`,
    [roomid.rows[0].id, 2, stay, go, newtime, money, ref]
  );

  res.json(ref);
});

// SELECT id FROM room WHERE room_id  FROM booking_record WHERE cancel_time IS NULL AND ($1::date >=check_out_date OR $2::date <= check_in_date)AND lock_time ::timestamp <now()::timestamp
