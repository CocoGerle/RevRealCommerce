const nodemailer = require("nodemailer");

// Create a transporter object using Mailtrap SMTP settings
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // Mailtrap SMTP host
  port: 2525, // Mailtrap's recommended port for non-encrypted connections
  secure: false, // Set to true if using port 465 (SSL)
  auth: {
    user: "9a933998cc3948", // Your Mailtrap user ID
    pass: "e13d73d59b6e7f", // Your Mailtrap password
  },
});

// Async function to send an email
async function main() {
  try {
    // Send mail using defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address (can be a fake or testing email)
      to: "bar@example.com, baz@example.com", // recipient email addresses
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = main;
