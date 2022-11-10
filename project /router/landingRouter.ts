import express from "express";
import { client } from "../db";


export let landing = express.Router();

landing.post("/search-room", async (req, res) => {

    const { checkIn, checkOut } = req.body;
    console.log({ checkIn, checkOut });

    try {
        let data = await client.query(/* sql */ `
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
            , [checkIn, checkOut])

        console.log(data.rows);

        res.json({ data: data.rows })

    } catch (error) {
        console.log(error);

        res.json({ data: [] })
    }
})