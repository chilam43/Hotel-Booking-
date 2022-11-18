import express from "express";
import expressSession from "express-session";
import { print } from "listening-on";
// import path from "path";
// import { SessionMiddleware } from "/session";
import { userRoutes } from "./router/usersRouter";
// import { isRedirect } from "node-fetch";
import { bookingroute } from "./router/select_room";
import { landing } from "./router/landingRouter";
import { client } from "./db";
import { paymentHookRouter } from "./router/paymentHookRouter";
import { paymentRouter } from "./router/paymentRouter";
// import { sendmailRountes } from "./router/send_email";

client.connect();
require("dotenv").config();
export const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY); // payment
const app = express();

app.use(
  expressSession({
    secret: "hotel-secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(paymentHookRouter);

type User = {
  id: number;
  name: string;
  title: string;
};

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
app.use(express.urlencoded());
app.use(express.json());

// app.use(SessionMiddleware);

app.use(express.static("public"));
app.use(userRoutes);
app.use(landing);
app.use(bookingroute);
// app.use(sendmailRountes);
app.use(paymentRouter);

// payment1
// paymentHookRouter.post("/details", function (req, res) {
//   let ref = req.body;
//   console.log(ref)
//   res.json()
// })

// Reemo
// payment 1.2
// app.post('/create-checkout-session-layout', async (req, res) => {

//   const { items, days } = req.query;
//   let amount = 54300 * (days ? +days : 1)
//   console.log('amount received', amount);
//   console.log('items:', items);

//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "price_1M4jW6AcUj5oPjUg7jIgTsay",
//         product: items,
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `http://localhost:8030/success.html`,
//     cancel_url: `http://localhost:8030/cancel.html`,
//   });

//   res.redirect(303, session.url);
// });

// payment2
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, items } = req.body;
    console.log("amount received", amount);
    console.log("items:", items);
    // Create a PaymentIntent with the order amount and currency

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "hkd",
      automatic_payment_methods: {
        enabled: false,
      },
      metadata: {
        uid: req.session["id"] ?? -1,
        internal_ref: items[0].ref,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.send({
      clientSecret: null,
    });
  }
});

let port = 8030;
app.listen(port, () => {
  print(port);
});
