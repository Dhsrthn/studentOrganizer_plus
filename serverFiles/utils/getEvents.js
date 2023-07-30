require('dotenv').config()
const express = require('express')
const { google } = require('googleapis')
const { OAuth2 } = google.auth


async function getAllEvents(refreshToken, startDate, endDate) {
    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET
    const REDIRECT_URI = process.env.REDIRECT_URI
    const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  
    oAuth2Client.setCredentials({
      refresh_token: refreshToken,
    });
  
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  
    try {
      const events = await calendar.events.list({
        calendarId: 'primary', 
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });
  
      return events.data.items;
    } catch (error) {
      console.error('Error fetching events:', error.message);
      throw new Error('Failed to fetch events from Google Calendar');
    }
  }
  
  module.exports={
    getAllEvents,
}

  