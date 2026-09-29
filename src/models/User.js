const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true, // يمنع تكرار الإيميل
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'organizer'], // الصلاحيات المتاحة
    default: 'user'
  }
}, {
  timestamps: true // بيضيف تلقائياً createdAt و updatedAt
});

module.exports = mongoose.model('User', userSchema);