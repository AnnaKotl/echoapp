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

    // const htmlContent = `
    //   <h1>New Contact Request</h1>
    //   <p><strong>Name:</strong> ${name}</p>
    //   <p><strong>Email:</strong> ${email}</p>
    //   <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
    //   <p><strong>Social Network:</strong> ${socialNetwork || 'Not Provided'}</p>
    //   <p><strong>Country:</strong> ${country}</p>
    //   <p><strong>Selected Service:</strong> ${selectedService}</p>
    //   <p><strong>Message:</strong> ${message || 'No message provided'}</p>
    // `;
const htmlContent = `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        color: #333;
        padding: 20px;
      }
      .container {
        max-width: 800px;
        margin: auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        padding: 25px;
      }
      h1 {
        color: #20f3dd;
        font-size: 30px;
        margin-bottom: 20px;
      }
      .field-card {
        background-color: #f0fdfd;
        border-left: 4px solid #20f3dd;
        padding: 12px 16px;
        margin-bottom: 15px;
        border-radius: 6px;
      }
      .label {
        font-weight: bold;
        color: #052522ff;
        font-size: 14px;
      }
      .value {
        display: block;
        font-size: 18px;
        margin-top: 4px;
        color: #000;
      }
      .footer {
        margin-top: 40px;
        font-size: 11px;
        color: #85a09eff;
        font-weight: 100;
        line-height: 1.4;
        border-top: 1px solid #eee;
        padding-top: 10px;
      }
      a {
        text-decoration: none;
        color: #20f3dd;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>📩 New contact request from echocode.app</h1>

      <div class="field-card">
        <span class="label">Name:</span>
        <span class="value">${name}</span>
      </div>

      <div class="field-card">
        <span class="label">Email:</span>
        <span class="value">${email}</span>
      </div>

      <div class="field-card">
        <span class="label">Mobile Number:</span>
        <span class="value">${mobileNumber}</span>
      </div>

      <div class="field-card">
        <span class="label">Social Network:</span>
        <span class="value">${socialNetwork || '➖'}</span>
      </div>

      <div class="field-card">
        <span class="label">Country:</span>
        <span class="value">${country}</span>
      </div>

      <div class="field-card">
        <span class="label">Selected Service:</span>
        <span class="value">${selectedService}</span>
      </div>

      <div class="field-card">
        <span class="label">Message:</span>
        <span class="value">${message || '➖'}</span>
      </div>

      <div class="footer">
        This email was automatically sent from <strong>new_request@send.echocode.app</strong> via Mailjet.<br>
        Please do not reply to this email.<br>
        &copy; ${new Date().getFullYear()} ECHOCODE.APP
      </div>
    </div>
  </body>
</html>
`;

    const request = await mailjet.post("send", { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.SENDER_EMAIL,
            Name: 'New client',
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