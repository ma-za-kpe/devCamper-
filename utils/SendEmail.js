// const nodemailer = require('nodemailer');

// const sendEmail = async options => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         auth: {
//             user: process.env.SMTP_EMAIL,
//             pass: process.env.SMTP_PASSWORD
//         }
//     });

//     const message = {
//         from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//     };

//     const info = await transporter.sendMail(message);

//     console.log('Message sent: %s', info.messageId);
// };

// barrier...............................................................................

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

const sendEmail = async options => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    sgMail.send(msg);

}

module.exports = sendEmail;