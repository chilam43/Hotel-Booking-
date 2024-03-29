import express from "express";
import { client } from "../db";


export let landing = express.Router();

landing.post("/search-room", async (req, res) => {



    try {
        const { checkIn, checkOut } = req.body;
        console.log({ checkIn, checkOut });
        let date = await client.query(/* sql */ `
        SELECT room.*
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
        )`
            , [checkOut, checkIn])

        console.log(date.rows);

        res.json({ date: date.rows })

    } catch (error) {
        console.log(error);

        res.json({ date: [] })
    }
})