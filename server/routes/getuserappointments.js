const express = require('express');
const { papptmodel } = require('../schemas/Pbookschema');
const verifytoken = require('../middlewares/verifytoken');
const router = express.Router();

router.post('/api/getuserappointments', verifytoken, async (req, res) => {
    let email = req.body.email;
    console.log("In get user appointments",email);

    res.header('Access-Control-Allow-Origin', 'https://oneshotpoint.netlify.app/myappointments');
    res.header('Access-Control-Allow-Credentials', true);

    try {
        let doc = null
        doc = await papptmodel.findOne({ 'email': email});
        return res.status(200).json({ slots : doc.slots });

    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: 'Fetch fail' });
    }
})

module.exports= router