// import axios from "axios";
// 1. stripe login
// 2. stripe listen --forward-to=http://localhost:8030/hooks
import bodyParser from "body-parser";
import express from "express";
import { stripe } from "../server";
import { client } from "../db";
import { sendEmailToUsers } from "./send_email";

export const paymentHookRouter = express.Router();

paymentHookRouter.get("/details", async function (req) {
  console.log(req.body);
});

// const ref = paymentHookRouter.post("/details", function (req, res) {
//     let ref = req.body;
//     console.log("paymentHookRouter: ", ref)
//     res.json()
// })

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
      console.log("1:", event);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ success: false });
      return;
    }
    // console.log("2:", event.data.object)
    // const intent = event.data.object;
    const amount = event.data.object.amount;
    const ref = event.data.object.metadata.internal_ref;
    console.log("REF:", ref);
    const amount10 = amount / 100;
    switch (event.type) {
      case "checkout.session.completed":
        // const session = event.data.object;
        // Note that you'll need to add an async prefix to this route handler

        console.log("checkout.session.completed");

        // console.log(line_items);

        break;
      case "payment_intent.succeeded":
        // console.log(event.data.object);
        // console.log("MD", event.data.object.metadata);

        await client.query(
          /* sql */
          `UPDATE booking_record set final_price=$1, payment_time=NOW()::timeStamp, confirm_time=NOW()::timeStamp where ref_number=$2`,
          [amount10, ref]
        );

        await client.query(
          /* sql */
          `UPDATE payment_history set price=$1, payment_time=NOW()::timeStamp where ref_number=$2`,
          [amount10, ref]
        );
        console.log("SUCCESS UPDATE");

        break;
      case "charge.succeeded":
        // let data = await axios({
        //     url: `https://api.stripe.com/v1/events/${event.id}`,
        //     auth: {
        //         username: `${process.env.STRIPE_PRIVATE_KEY}`,
        //         password: ``,
        //     },
        // })

        //console.log("HELLOOOOOOO", data.data.data.object);
        // Update database
        // Send email
        // Notify shipping department
        await client.query(
          /* sql */
          `UPDATE booking_record set final_price=$1, payment_time=NOW()::timeStamp, confirm_time=NOW()::timeStamp where ref_number=$2`,
          [amount10, ref]
        );

        await client.query(
          /* sql */
          `UPDATE payment_history set price=$1, payment_time=NOW()::timeStamp where ref_number=$2`,
          [amount10, ref]
        );
        await sendEmailToUsers(ref as string);
        console.log("SUCCESS UPDATE");

        //     console.log("Succeeded:", intent.id);
        //     break;
        // case 'payment_intent.payment_failed':
        //     const message = intent.last_payment_error && intent.last_payment_error.message;
        //     console.log('Failed:', intent.id, message);
        break;
    }

    // Reemo
    // console.log(event.type)
    // console.log(event.type, event);

    // if (event.type === "payment_intent.succeeded") {
    //     console.log(event.data.object.charges);
    //     console.log(event.data.object);
    // }

    // if (event.type === "charge.succeeded") {
    //     console.log(event.data.object.billing_details);
    //     console.log(event.data.object);
    // }

    // // console.log(event.data.object)
    // // console.log(event.data.object.id)
    // const amount = event.data.object.amount;
    // const amount10 = (amount / 100);
    // // const ref_number = ref;
    // // console.log('Payload:', payload)
    // // const ref = payload.data.ref;
    // console.log("DB:", ref)
    // if (event.type == "charge.succeeded") {
    //     client.query(/* sql */
    //         `update booking_record set final_price=$1, payment_time=NOW()::timeStamp where ref_number=$2`,
    //         [amount10]
    //     );
    //     return console.log("Payment Not Success")
    // }

    //send email
    res.json({
      success: true,
    });
  }
);
// use fetch to get value
