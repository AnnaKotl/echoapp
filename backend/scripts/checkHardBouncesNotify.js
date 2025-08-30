const ALERT_STATUSES = ['hard_bounced', 'soft_bounced', 'blocked', 'spam', 'retrying'];

const getProblematicEmails = async (toEmail) => {
  try {
    const response = await mailjet
      .get("message")
      .request({ ToEmail: toEmail });

    const logs = response.body.Data;

    return logs.filter(log => ALERT_STATUSES.includes(log.Status));
  } catch (error) {
    console.error("Error fetching Mailjet logs:", error.message);
    return [];
  }
};

const sendAdminAlert = async (problemEmails) => {
  if (problemEmails.length === 0) return;

  const htmlContent = `
    <h2>⚠️ Problematic Emails Detected</h2>
    <p>Detected ${problemEmails.length} problematic email(s) for hello@echocode.app:</p>
    <ul>
      ${problemEmails.map(log => `
        <li>
          <strong>From:</strong> ${log.FromEmail}<br>
          <strong>Status:</strong> ${log.Status}<br>
          <strong>Message ID:</strong> ${log.MessageID}<br>
          <strong>Date:</strong> ${log.EventOccurredAt}<br>
          <strong>Reason:</strong> ${log.Reason || 'No reason provided'}
        </li>
      `).join('')}
    </ul>
  `;

  try {
    await mailjet.post("send", { version: 'v3.1' }).request({
      Messages: [
        {
          From: { Email: process.env.SENDER_EMAIL, Name: "ECHOCODE.APP" },
          To: [{ Email: process.env.ADMIN_EMAIL }],
          Subject: `⚠️ Problematic Emails Alert`,
          TextPart: `Detected ${problemEmails.length} problematic email(s).`,
          HTMLPart: htmlContent,
        },
      ],
    });

    console.log(`✅ Admin notified of ${problemEmails.length} problematic email(s).`);
  } catch (error) {
    console.error("Failed to send admin alert:", error.message);
  }
};

const checkAndNotify = async () => {
  const problemEmails = await getProblematicEmails('hello@echocode.app');
  if (problemEmails.length > 0) {
    await sendAdminAlert(problemEmails);
  } else {
    console.log("✅ No problematic emails detected.");
  }
};

checkAndNotify();