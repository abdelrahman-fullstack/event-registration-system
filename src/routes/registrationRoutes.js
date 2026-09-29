const express = require('express');
const router = express.Router();
const {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration
} = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');

// تطبيق حارس الحماية (protect) على كل الـ Routes اللي جاية
router.use(protect);

router.post('/:eventId', registerForEvent);
router.get('/my-registrations', getMyRegistrations);
router.delete('/:id', cancelRegistration);

module.exports = router;