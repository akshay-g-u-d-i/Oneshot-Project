const jwt = require('jsonwebtoken');

const generatetoken = (res, email) => {

  res.header('Access-Control-Allow-Origin', 'https://oneshotpoint.netlify.app');
  res.header('Access-Control-Allow-Credentials', true);

  const token = jwt.sign({ "email": email }, process.env.JWT_SECRET, {
    expiresIn: '10m',
  });

  res.cookie('jwt', token, {
    sameSite: "none",
    secure: true,
    httpOnly: false,
    maxAge: 60 * 60 * 1000, // 1 hr
  });

};

module.exports = { generatetoken }