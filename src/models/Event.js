const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an event title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  capacity: {
    type: Number,
    required: [true, 'Please add total capacity']
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ربط الفعالية بالمنظم اللي أنشأها
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);