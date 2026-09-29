const Registration = require('../models/Registration');
const Event = require('../models/Event');

// @desc    Register for an event
// @route   POST /api/registrations/:eventId
// @access  Private
exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    // 1. التأكد من وجود الفعالية
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // 2. التحقق من السعة الإجمالية (Capacity)
    const currentRegistrations = await Registration.countDocuments({ event: eventId });
    if (currentRegistrations >= event.capacity) {
      return res.status(400).json({ success: false, message: 'Event is full' });
    }

    // 3. منع التسجيل المكرر لنفس المستخدم
    const alreadyRegistered = await Registration.findOne({ user: userId, event: eventId });
    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: 'You are already registered for this event' });
    }

    // 4. إنشاء التسجيل
    const registration = await Registration.create({
      user: userId,
      event: eventId
    });

    res.status(201).json({
      success: true,
      message: 'Successfully registered for event',
      data: registration
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user registrations
// @route   GET /api/registrations/my-registrations
// @access  Private
exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate('event', 'title date location');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel registration
// @route   DELETE /api/registrations/:id
// @access  Private
exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    // التأكد أن صاحب الطلب هو صاحب التسجيل نفسه
    if (registration.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to cancel this registration' });
    }

    await registration.deleteOne();

    res.status(200).json({ success: true, message: 'Registration cancelled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};