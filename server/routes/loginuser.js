const express = require('express');
const { usermodel } = require('../schemas/Userschema');
const router = express.Router();

router.post('/api/loginuser', async (req, res) => {
    let email = req.body.email;
    let otp = req.body.otp;

    try {
        let userdata = await usermodel.findOne({ 'email': email });
        if(!userdata) return res.status(400).json({message: 'Login fail'});
        if (userdata.email == email && userdata.otp == parseInt(otp)) return res.status(200).json({ message: 'Login success' });
        return res.status(400).json({ message: 'Login fail' });

    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: 'Login fail' });
    }

})

module.exports = router;