const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // req.user is set in verifyToken
    if (user.role !== 'admin') {
      return res.status(403).json({ status: false, message: 'Access denied. Admins only.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ status: false, message: 'Authorization failed' });
  }
};

module.exports = isAdmin;
