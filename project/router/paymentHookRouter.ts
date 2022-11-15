import bodyParser from "body-parser";
import express from "express";
import { stripe } from "../server"

export const paymentHookRouter = express.Router();

paymentHookRouter.post('/hooks', bodyParser.raw({ type: "application/json" }), async (req: express.Request, res) => {
    let signingsecret = "whsec_a383066ee92ddd1e170972a039d754397e10b5a9c3884f159b9e131d6cbf0d9b"

    const payload = req.body
    const sig = req.headers['stripe-signature']

    // matching these webhook is from stripe

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, signingsecret)
    } catch (error: any) {
        console.log(error.message)
        res.status(400).json({ success: false })
        return
    }
    console.log(event.type)
    console.log(event.data.object)
    console.log(event.data.object.id)


    res.json({
        success: true
    })
})
