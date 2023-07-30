const express = require('express')
const router = express.Router()
const User = require('../database/schemas/users')
const { createEvent } = require('../utils/createEvent')
const assigns = require('../database/schemas/assignments')
const { getAllEvents } = require('../utils/getEvents')

router.post('/createEvent', async (req, res) => {

  let reqArray = [req.body.eventName, req.body.eventDesc, req.body.StartDate, req.body.endDate, req.body.eventLocation, req.session.token, null]
  try {
    console.log(reqArray)
    await createEvent(reqArray)
    res.send('created')
  } catch (error) {
    console.error('caugh error while adding event', error)
  }
})

router.post('/createAssignment', async (req, res) => {

  console.log('I reach here')
  let responsy
  let reqArray = [req.body.assignmentName, req.body.courseName, req.body.deadline, req.body.deadline, 'none', req.session.token, 3]
  try {
    console.log(reqArray)
    responsy = await createEvent(reqArray)

  } catch (error) {
    console.error('caugh error while adding event', error)
  }
  console.log(responsy.id)
  let eventID = responsy.id
  try {
    await assigns.updateOne({ username: req.session.user }, { $push: { assign_list: [reqArray, eventID, req.body.sem, 0] } }).then(() => { console.log('added to db successfully') }).catch((err) => { console.log(err) })
  } catch (error) {
    console.error('caught error while adding to database', error)
  }
})

router.get('/all', async (req, res) => {
  console.log(req.session)
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  console.log('kkk', req.session.token)
  if (!req.session.token || !startDate || !endDate) {
    console.log('ener')
    res.send('invalid request parameters')
  } 
  else {
    console.log('kkkkkjkv ')
    try {

      const events = await getAllEvents(req.session.token, new Date(startDate), new Date(endDate));
      res.send(events)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  }


})

router.get('/getassignments', async (req, res) => {
  const currentDate = new Date()
  currentDate.setHours(currentDate.getHours() + 5);
  currentDate.setMinutes(currentDate.getMinutes() + 30);
  const defaultDateTime = currentDate.toISOString().slice(0, 16);
  console.log(defaultDateTime)

  await assigns.findOne({ username: req.session.user }).then(async (data) => {
    const filteredAssignList = await data.assign_list.filter(
      (assignment) => new Date(assignment[0][2]) > new Date(defaultDateTime)
    );
    const anotherFilter = await data.assign_list.filter(
      (assignment) => new Date(assignment[0][2]) <= new Date(defaultDateTime)
    )
    // filteredAssignList.sort((a,b)=>a[3]-b[3])
    // anotherFilter.sort((a,b)=>a[3]-b[3])
    console.log('tosend', filteredAssignList)
    // anotherFilter.sort((a,b)=>a[3]-b[3])
    res.send([filteredAssignList.sort((a, b) => a[3] - b[3]), anotherFilter.sort((a, b) => a[3] - b[3])])
  }).catch((err) => { console.log(err) })
})

router.post('/mark/:value', async (req, res) => {
  const value = req.params.value;
  const assignID = req.body.assignID;

  if (value === 'complete') {
    try {
      const filter = { username: req.session.user };
      const update = { $set: { 'assign_list.$[elem].3': 1 } };
      const options = { arrayFilters: [{ 'elem.1': assignID }] };

      const result = await assigns.updateOne(filter, update, options);

      if (result.nModified > 0) {
        res.send('success');
      } else {
        res.send('failure');
      }
    } catch (err) {
      console.error(err);
      res.send('failure');
    }
  } else {
    try {
      const filter = { username: req.session.user };
      const update = { $set: { 'assign_list.$[elem].3': 0 } };
      const options = { arrayFilters: [{ 'elem.1': assignID }] };

      const result = await assigns.updateOne(filter, update, options);

      if (result.nModified > 0) {
        res.send('success');
      } else {
        res.send('failure');
      }
    } catch (err) {
      console.error(err);
      res.send('failure');
    }
  }
});

module.exports = router;