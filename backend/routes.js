const express = require('express');
const bookingMiddleware = require('./middleware/bookingMiddleware');
const { saveBooking, getAllBooking , deleteBooking} = require('./controllers/bookingController');
const { filter } = require('./controllers/filterController');
const router = express.Router();

router.post('/api/bookingInfo',bookingMiddleware,saveBooking);
router.get('/api/getAllBookings',getAllBooking);
router.post('/api/deleteBooking',deleteBooking);
router.post('/api/filter',filter);

module.exports = router;