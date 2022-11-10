import express from "express";
import { client } from "../db";


export let landing = express.Router();

landing.post("/search-room", async (req, res) => {

    await client.query(/* sql */ `SELECT room.*FROM room
    WHERE id NOT IN (
            SELECT room_id
            FROM booking_record
            WHERE cancel_time is NOT NULL
                AND NOT (
                    check_in_date >= '2022-11-15'::date
                    OR check_out_date <= '2022-11-10'::date
                )
                AND CURRENT_TIMESTAMP > lock_time
        )`)
})