const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport.
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAILPASS,
  },
});
module.exports = {
  send: ({ from, to, subject, text, html }) => {
    // Setup e-mail data.
    const options = {
      from,
      to,
      subject,
      text,
      html
    };
    // Return a promise of the function that sends the email.
    return transporter.sendMail(options);

  },
};
