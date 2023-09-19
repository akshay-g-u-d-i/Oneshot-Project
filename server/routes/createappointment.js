const express = require('express');
const { apptmodel } = require('../schemas/Bookschema');
const { papptmodel } = require('../schemas/Pbookschema');
const verifytoken = require('../middlewares/verifytoken');
const app = express();
const router = express.Router();

router.post('/api/createappointment',verifytoken, async (req, res) => {
    let email = req.body.email;
    let chosendate = req.body.date;
    let chosenslot = req.body.slot;

    res.header('Access-Control-Allow-Origin', 'https://oneshotpoint.netlify.app');
    res.header('Access-Control-Allow-Credentials', true);

    try {
        let doc = await apptmodel.findOne({ 'bookdate': chosendate });
        let doc2 = await papptmodel.findOne({ 'email': email })
        if (!doc) {
            await apptmodel.create({
                'bookdate': chosendate,
                'slots': [chosenslot]
            })
        }
        else if (doc) {
            for (var slot of doc.slots) {
                if (slot == chosenslot) {
                    return res.status(400).json({ message: 'Existing slot' })
                }
            }
            doc.slots.push(chosenslot);
            await doc.save();
        }

        if (!doc2) {
            await papptmodel.create({
                'email': email,
                'slots': [[chosendate, chosenslot]]
            })
        } 
        else if (doc2) {
            // for (var slot of doc.slots) {
            //     if (slot == [chosendate,chosenslot]) {
            //         return res.status(400).json({ message: 'Existing slot' })
            //     }
            // }
            doc2.slots.push([chosendate,chosenslot]);
            await doc2.save();
        }

        return res.status(200).json({ message: 'Appointment successful' })

    } catch (err) {
        return res.status(400).json({ message: 'Bad gateway' })
    }
})

module.exports = router;