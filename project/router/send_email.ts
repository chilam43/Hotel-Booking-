import express from "express";
const nodemailer = require("nodemailer");
// import nodemailer from "nodemailer";

export const sendemailRountes = express.Router();

sendemailRountes.post("/email", async (req, res) => {
  // async..await is not allowed in global scope, must use a wrapper
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
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
    to: "donnytkf@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "69?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.json({});
});

// import express from "express";

// export let sendemailRountes = express.Router();

// sendemailRountes.post("/email", function (req, res) {
//   "use strict";
//   const nodemailer = require("nodemailer");

//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     // let testAccount = await nodemailer.createTestAccount();

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "smtp-mail.outlook.com", // hostname
//       service: "outlook", // service name
//       secureConnection: false,
//       tls: {
//         ciphers: "SSLv3", // tls version
//       },
//       port: 587, //
//       auth: {
//         user: "hotelbooking6969@outlook.com", // generated ethereal user
//         pass: "iwant6969", // generated ethereal password
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: "hotelbooking6969@outlook.com", // sender address
//       to: "chi43@hotmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   }

//   main().catch(console.error);

//   res.json();
// });
