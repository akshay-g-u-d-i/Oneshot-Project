const express = require('express');
const { usermodel } = require('../schemas/Userschema');
const {generatetoken} = require('../utils/generatetoken');
const router = express.Router();

router.post('/api/loginuser', async (req, res) => {
    let email = req.body.email;
    let otp = req.body.otp;

    res.header('Access-Control-Allow-Origin', 'https://oneshotpoint.netlify.app');
    res.header('Access-Control-Allow-Credentials', true);

    console.log(email, otp);

    try {
        let userdata = await usermodel.findOne({ 'email': email });
        if (!userdata) return res.status(400).json({ message: 'Login fail' });
        if (userdata.email == email && userdata.otp == parseInt(otp)) {
            const token = generatetoken(res,email);
            return res.status(200).json({ message: 'Login success' });
        }
        return res.status(400).json({ message: 'Login fail' });

    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: 'Login fail' });
    }

})

module.exports = router;