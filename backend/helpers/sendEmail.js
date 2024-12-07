require('dotenv').config();
const mailjet = require('node-mailjet').apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

const sendEmail = async ({ to, subject, name, email, mobileNumber, socialNetwork, country, city, selectedService, message }) => {
  try {
    if (!process.env.SENDER_EMAIL || !to) {
      console.error("Environment variables missing:");
      console.log("Sender email:", process.env.SENDER_EMAIL);  // LOG ----------------------------- > DELETE after DEV
      console.log("Recipient email:", to);  // LOG ----------------------------- > DELETE after DEV
      throw new Error('Recipient or sender email is missing');
    }

    const htmlContent = `
      <h3>New Contact Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>City:</strong> ${city || 'Not Provided'}</p>
      <p><strong>Selected Service:</strong> ${selectedService}</p>
      <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      <p><strong>Social Network:</strong> ${socialNetwork || 'Not Provided'}</p>
    `;

    const request = await mailjet.post("send", { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.SENDER_EMAIL,
            Name: 'Website Contact Form',
          },
          To: [
            {
              Email: to,
            },
          ],
          Subject: subject,
          TextPart: "New Request",
          HTMLPart: htmlContent,
          ReplyTo: {
            Email: email,
          },
        },
      ],
    });

    console.log("Email sent successfully:", JSON.stringify(request.body, null, 2));  // LOG ----------------------------- > DELETE after DEV

  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email. Please try again later.");
  }
};

module.exports = sendEmail;