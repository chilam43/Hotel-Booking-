// fetch
// 開多張table (payment history) => payment:  id, user_id(option), payment_date, ref_number, stripe_ref_number, email, name, create_at, status
// 

import express from "express";
import { client } from "../db";


export const paymentRouter = express.Router()

// /create-pre-payment

paymentRouter.post("/create-pre-payment", async (req, res) => {

    try {

        let { email, ref } = req.body;
        await client.query(`INSERT INTO payment_history (email, ref_number) VALUES ($1, $2) `, [email, ref]);
        res.json({});

    }
    catch (error) {
        console.log(error);
        res.json({});

    }

});
