const express = require('express');
const router = express.Router();
const { apptmodel } = require("../schemas/Bookschema");
const { papptmodel } = require("../schemas/Pbookschema");
const verifytoken = require('../middlewares/verifytoken');

router.put('/api/deleteappointment', verifytoken, async (req, res) => {

    let email = req.body.email;
    let date = req.body.slot[0];
    let slot = req.body.slot[1];

    try {
        let doc1 = await apptmodel.findOne({ 'bookdate': date });
        let doc2 = await papptmodel.findOne({ 'email': email });

        if (doc1) {
            doc1.slots.pull(slot);
            await doc1.save();
        }

        if (doc2) {

            doc2.slots.pull([date, slot]);
            await doc2.save();
        }

        if (!doc1 && !doc2) return res.status(200).json({message: 'No resource to delete'});
        return res.status(200).json({ message: 'Deletion successful' });

    }
    catch (err) {
        return res.status(400).json({ message: 'Deletion unsuccessful' })
    }
})

module.exports = router;

