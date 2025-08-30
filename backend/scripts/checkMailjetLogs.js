require('dotenv').config();
const { getEmailLogs } = require('../helpers/mailjetLogs');

async function checkLogs() {
  try {
    const logs = await getEmailLogs({ ToEmail: 'hello@echocode.app' });
    logs.forEach(log => {
      console.log(`${log.From}: ${log.To} -> ${log.Status} (${log.MessageID})`);
      if (log.Status === 'hard_bounced') {
        console.warn('❌ Hard bounce detected:', log.Reason);
      }
    });
  } catch (err) {
    console.error('Error checking logs:', err.message);
  }
}

checkLogs();

// cd /Users/annakotlyar/Desktop/projects/echoapp/backend
// node scripts/checkMailjetLogs.js
