import express from "express";
import { Client } from "./db";

export let bookingroute = express.Router();

bookingroute.post("/checkava", async function (req, res) {
  let data = await Client.query(
    `SELECT room.*
FROM room
WHERE id NOT IN (
        SELECT room_id
        FROM booking_record
        WHERE cancel_time is NOT NULL
            AND NOT (
                check_in_data >= '$1'::date
                OR check_out_data <= '$2'::date
            )
            AND CURRENT_TIMESTAMP > lock_time
    )
    `,
    [req.body.checkindate, req.body.checkoutdate]
  );
  console.log(data.rows);

  res.json({ data: data.rows });
});
