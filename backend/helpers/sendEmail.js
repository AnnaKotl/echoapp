require('dotenv').config();
const mailjet = require('node-mailjet').apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

/**
 * This module is responsible for sending emails via Mailjet API.
 * It is invoked when a new contact request is submitted through the contact form.
 * 
 * The sendEmail function sends a request to Mailjet's API with the details of the contact request.
 * The function requires the following parameters:
 * - to: Recipient email address.
 * - subject: Subject of the email.
 * - name: Name of the person making the request.
 * - email: Email of the person making the request.
 * - mobileNumber: Mobile number of the person.
 * - socialNetwork: Social network handle (optional).
 * - country: Country of the person making the request.
 * - selectedService: The selected service from the form.
 * - message: The message provided by the person (optional).
 * 
 * The function uses the environment variables for the sender's email and Mailjet API keys.
 * In case of missing variables or errors, an error is thrown.
 */


const sendEmail = async ({ to, subject, name, email, mobileNumber, socialNetwork, country, selectedService, message }) => {
  try {
    if (!process.env.SENDER_EMAIL || !to) {
      console.error("Environment variables missing:");
      // console.log("Sender email:", process.env.SENDER_EMAIL);
      // console.log("Recipient email:", to);
      throw new Error('Recipient or sender email is missing');
    }

    const htmlContent = `
      <h3>New Contact Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
      <p><strong>Social Network:</strong> ${socialNetwork || 'Not Provided'}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Selected Service:</strong> ${selectedService}</p>
      <p><strong>Message:</strong> ${message || 'No message provided'}</p>
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

    // console.log("Email sent successfully:", JSON.stringify(request.body, null, 2));

  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email. Please try again later.");
  }
};

module.exports = sendEmail;