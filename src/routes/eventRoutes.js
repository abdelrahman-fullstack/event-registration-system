const express = require('express');
const router = express.Router();
const { getEvents, getEvent, createEvent } = require('../controllers/eventController');

// ربط الطرق والمسارات بالدوال المناسبة
router.route('/')
  .get(getEvents)
  .post(createEvent);

router.route('/:id')
  .get(getEvent);

module.exports = router;