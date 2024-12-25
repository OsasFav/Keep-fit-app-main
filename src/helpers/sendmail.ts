import nodemailer from "nodemailer";

const config = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

type Config = {
  host: string;
  username?: string;
  port: number;
  secure: boolean;
  service: string;
  auth: {
    user?: string;
    pass?: string;
  };
};

const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: any;
  subject: any;
  text?: any;
  html: any;
}) => {
  const transporter = nodemailer.createTransport(config as unknown as Config);

  const emailOptions = {
    from: `Shawn from KeepFit`,
    to,
    subject,
    text,
    html,
  };

  // Sending email
  transporter.sendMail(emailOptions, (err?: any, info?: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
// const Mailgun = require("mailgun.js");
// const mailgun = new Mailgun();
// const mg = mailgun.client({
//   username: "api",
//   key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
// });

// mg.messages
//   .create("sandbox-123.mailgun.org", {
//     from: "Excited User <mailgun@sandboxbf2db4113ad5487db9cfd4877481b279.mailgun.org>",
//     to: ["test@example.com"],
//     subject: "Hello",
//     text: "Testing some Mailgun awesomeness!",
//     html: "<h1>Testing some Mailgun awesomeness!</h1>",
//   })
//   .then((msg) => console.log(msg)) // logs response data
//   .catch((err) => console.log(err)); // logs any error

// export default sendEmail;
