const express = require('express');
const { apptmodel } = require('../schemas/Bookschema');
const router = express.Router();

router.post('/api/getappointments', async (req, res) => {
    let currdate = req.body.date;

    try {
        let userdata = await apptmodel.findOne({ 'bookdate':  currdate});
        if(userdata) return res.status(200).json({ bookedslots: userdata.slots });
        return res.status(200).json({bookedslots: null});
        
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: 'Fetch fail' });
    }
})

module.exports= router