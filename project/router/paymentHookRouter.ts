import bodyParser from "body-parser";
import express from "express";
import { stripe } from "../server";
// import { client } from "../db";

export const paymentHookRouter = express.Router();

paymentHookRouter.get("/details", async function (req) {
  console.log(req.body);
});

paymentHookRouter.post(
  "/hooks",
  bodyParser.raw({ type: "application/json" }),
  async (req: express.Request, res) => {
    let signingsecret =
      "whsec_a383066ee92ddd1e170972a039d754397e10b5a9c3884f159b9e131d6cbf0d9b";

    const payload = req.body;
    const sig = req.headers["stripe-signature"];

    // matching these webhook is from stripe

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, signingsecret);
      console.log(event.type);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ success: false });
      return;
    }
    // let amount = payload.amount;
    // how to get the right ID?
    // how to put the final price
    console.log(event.type);
    console.log(event.data.object);
    console.log(event.data.object.id);
    console.log(payload);
    // client.query(/* sql */
    //     `update booking_record set final_price=$1, payment_time=NOW()::timestame where id=$2`,
    //     [10000, 1]
    // );

    //send email
    res.json({
      success: true,
    });
  }
);
// use fetch to get value
