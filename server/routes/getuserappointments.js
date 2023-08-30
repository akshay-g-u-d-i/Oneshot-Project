const express = require('express');
const { papptmodel } = require('../schemas/Pbookschema');
const router = express.Router();

router.post('/api/getuserappointments', async (req, res) => {
    let email = req.body.email;
    console.log(email)

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