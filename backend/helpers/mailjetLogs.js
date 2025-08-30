require('dotenv').config();
const mailjet = require('node-mailjet')
  .apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

/**
 * Get recent email events from Mailjet for a specific sender or recipient.
 * @param {Object} options
 * @param {string} options.FromEmail - (optional) filter by sender email
 * @param {string} options.ToEmail - (optional) filter by recipient email
 */
const getEmailLogs = async ({ FromEmail, ToEmail } = {}) => {
  try {
    const filters = {};
    if (FromEmail) filters.FromEmail = FromEmail;
    if (ToEmail) filters.ToEmail = ToEmail;

    const response = await mailjet
      .get("message")
      .request(filters);

    return response.body.Data;
  } catch (error) {
    console.error("Error fetching Mailjet logs:", error.message);
    throw new Error("Failed to fetch Mailjet logs");
  }
};

/**
 * Example usage:
 * const logs = await getEmailLogs({ ToEmail: 'hello@echocode.app' });
 * console.log(logs);
 */

module.exports = { getEmailLogs };