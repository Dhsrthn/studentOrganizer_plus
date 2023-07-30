require('dotenv').config()
const { google } = require('googleapis');
const { OAuth2 } = google.auth;



async function createEvent([summary, desc, start, end, location, token,colorID]) {

    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET
    const REDIRECT_URI = process.env.REDIRECT_URI
    const REFRESH_TOKEN = token;

    const oAuth2Client = new OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oAuth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    try {
        const event = {
            summary: summary,
            description: desc,
            start: {
                dateTime: new Date(start), 
                timeZone: 'Asia/Kolkata', 
            },
            end: {
                dateTime: new Date(end), 
                timeZone: 'Asia/Kolkata',
            },
            location: location,
            ...(colorID && { colorId: colorID }),
        };

        const res = await calendar.events.insert({
            calendarId: 'primary', 
            resource: event,
        });

        console.log('Event created:', res.data);
        return res.data
    } catch (err) {
        console.error('Error creating event:', err);
    }
}

module.exports={
    createEvent,
}
