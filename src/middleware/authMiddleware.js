const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // فحص هل الـ Request فيه Header اسمه Authorization ويبدأ بـ Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // استخراج الـ Token من النص (Bearer TOKEN_STRING)
      token = req.headers.authorization.split(' ')[1];

      // فك التشفير والتحقق من صحة الـ Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // جلب بيانات المستخدم وإلحاقها بطلب الـ Request
      req.user = await User.findById(decoded.id).select('-password');

      next(); // الانتقال للـ Controller اللي بعده
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};