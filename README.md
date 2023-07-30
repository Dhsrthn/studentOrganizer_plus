# studentOrganizer_plus

## Must need google calendar connected for it to work
Your google calendar stays logged in until your refresh_token's validity runs out (which can occur every 7 days as of now as the google client project is still unverified) or until you manually remove access to this site in your google account, and if it does you will be prompted to give access again when you login
(Stores your refresh_token in database to achieve this)

### Abilities

Can add events, and view upcoming events for the next three days in list view, and in calendar view, view all your google calendar events and assignment deadlines
Can add assignments, with deadlines and mark them as incomplete or complete and view them in list view aswell
Can manage your expenses, with 10 categories too, where you can also set limit for eachc ategory (whose panel card's color gets automatically updated on the spent/limit ratio, which defaults to white when no limit is set)
Can reset all expense details and set them to 0
