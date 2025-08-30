require('dotenv').config();
const mailjet = require('node-mailjet')
  .apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

const getHardBounces = async (toEmail) => {
  try {
    if (!toEmail) throw new Error("Specify ToEmail for logs");

    const response = await mailjet
      .get("message")
      .request({ ToEmail: toEmail });

    const logs = response.body.Data;

    const hardBounces = logs.filter(log => log.Status === 'hard_bounced');

    if (hardBounces.length === 0) {
      console.log("✅ No hard bounces found for", toEmail);
      return;
    }

    console.log(`❌ Hard bounces for ${toEmail}:`);
    hardBounces.forEach(log => {
      console.log(`------------------------------------------`);
      console.log(`From: ${log.FromEmail}`);
      console.log(`To: ${log.ToEmail}`);
      console.log(`Message ID: ${log.MessageID}`);
      console.log(`Status: ${log.Status}`);
      console.log(`Date: ${log.EventOccurredAt}`);
      console.log(`Reason: ${log.Reason || 'No reason provided'}`);
    });
    console.log(`------------------------------------------`);
  } catch (error) {
    console.error("Error fetching Mailjet logs:", error.message);
  }
};

getHardBounces('hello@echocode.app');

// cd /Users/annakotlyar/Desktop/projects/echoapp/backend
// node scripts/checkHardBounces.js