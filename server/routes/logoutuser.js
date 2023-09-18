const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/api/logout', (req, res) => {
    const cookieOptions = {
        maxAge: 0,
    }
    res.cookie('jwt', "", cookieOptions);
    return res.status(200).json({'message': 'Logout successful'})
})

module.exports = router;