const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL_ADDRES, //Sender
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "CarGt <alliii543221@gmail.com>", //Sender
      to: userEmail,
      subject: subject,
      html: htmlTemplate,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent" + info.response);
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error (nodemailer)");
  }
};