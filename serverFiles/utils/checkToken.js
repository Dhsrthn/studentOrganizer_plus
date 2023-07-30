require('dotenv').config();
const { google } = require('googleapis');

async function checkToken(token) {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const SCOPES = ['https://www.googleapis.com/auth/calendar.events','https://www.googleapis.com/auth/calendar.calendarlist'];

  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  oAuth2Client.setCredentials({
    refresh_token: token,
  });

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  try {
    await calendar.calendarList.list();
    return true;
  } catch (error) {
    console.error('Error checking token validity:', error.message);
    return false;
  }
}

module.exports = {
  checkToken,
};
