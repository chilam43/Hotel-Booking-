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


client.connect();
export const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const app = express();
// payment
require("dotenv").config()

app.use(
  expressSession({
    secret: "hotel-secret",
    resave: true,
    saveUninitialized: true,
  })
);

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
app.use(paymentHookRouter)

// payment
app.post("/create-payment-intent", async (req, res) => {
  try {

    const { amount } = req.query;
    console.log('amount received', amount);
    // Create a PaymentIntent with the order amount and currency

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "hkd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.send({
      clientSecret: null
    });


  }

});


let port = 8030;
app.listen(port, () => {
  print(port);
});
