const nodemailer = require("nodemailer");
// import nodemailer from "nodemailer";
import { client } from "../db";

export async function sendEmailToUsers(ref_num: string) {
  let paymentRecord = await client.query(
    /* sql */
    `select ref_number 
    from payment_history 
    JOIN ref_number on booking_record.ref_number = ref_num
    where ref_number = $1 `,
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
    subject: "Thank You For your booking", // Subject line
    text: `ref no. ${paymentRecord.rows[0].ref_number} , check in date ${paymentRecord.rows[0].check_in_date} , check out date ${paymentRecord.rows[0].check_out_date}`, // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}
