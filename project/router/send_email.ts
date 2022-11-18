const nodemailer = require("nodemailer");
// import nodemailer from "nodemailer";
import { client } from "../db";

export async function sendEmailToUsers(ref_num: string) {
  let paymentRecord = await client.query(
    /* sql */ `select ref_number from payment_history where ref_number = $1`,
    [ref_num]
  );

  console.log("paymentRecord:", paymentRecord);

  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    service: "outlook", // service name
    secureConnection: false,
    tls: {
      ciphers: "SSLv3", // tls version
    },
    port: 587, //
    auth: {
      user: "hotelbooking6969@outlook.com", // generated ethereal user
      pass: "iwant6969", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "hotelbooking6969@outlook.com", // sender address
    to: paymentRecord.rows[0].email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "69?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}
