# studentOrganizer_plus

## Must need google calendar connected for it to work
Your google calendar stays logged in until your refresh_token's validity runs out (which can occur every 7 days as of now as the google client project is still unverified) or until you manually remove access to this site in your google account, and if it does you will be prompted to give access again when you login
(Stores your refresh_token in database to achieve this)

### Abilities

1.Can add events, and view upcoming events for the next three days in list view, and in calendar view, view all your google calendar events and assignment deadlines. <br />
2.Can add assignments, with deadlines and mark them as incomplete or complete and view them in list view aswell. <br />
3.Can manage your expenses, with 10 categories too, where you can also set limit for eachc ategory (whose panel card's color gets automatically updated on the spent/limit ratio, which defaults to white when no limit is set). <br />
4.Can reset all expense details and set them to 0.

### To do
1. Go to clientFiles directory and run command 'npm i' to install dependencies
2. Do the same in serverFiles directory
3. Run 'npm run start' in clientFiles directory and 'npm run dev' in serverFiles directory to get them both running
4. Add .env file in serverFiles root
5. Also requires a local mongoDB connection to run 
