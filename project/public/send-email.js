var nodeoutlook = require("nodejs-nodemailer-outlook");
nodeoutlook.sendEmail({
  auth: {
    user: "hotelbooking6969@outlook.com",
    pass: "iwant6969",
  },
  from: "hotelbooking6969@outlook.com",
  to: `donnytkf@gmail.com`,
  subject: "Thank you for your booking!",
  html: "<b>This is bold text</b>",
  text: "This is text version!",
  replyTo: "receiverXXX@gmail.com",
  attachments: [],
  onError: (e) => console.log(e),
  onSuccess: (i) => console.log(i),
});
