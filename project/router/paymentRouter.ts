// fetch
// 開多張table (payment history) => payment:  id, user_id(option), payment_date, ref_number, stripe_ref_number, email, name, create_at, status
// 

import express from "express";
import { client } from "../db";


export const paymentRouter = express.Router()

// /create-pre-payment

paymentRouter.post("/create-pre-payment", async (req, res) => {

    try {

        let { email, ref, name } = req.body;
        await client.query(/* sql */`INSERT INTO payment_history (email, ref_number, name) VALUES ($1, $2, $3) `, [email, ref, name]);
        res.json({});

    }
    catch (error) {
        console.log(error);
        res.json({});

    }

});
