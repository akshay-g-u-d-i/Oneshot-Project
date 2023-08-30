const express = require('express')
const nodemailer = require('nodemailer');
const { usermodel } = require('../schemas/Userschema');
const router = express.Router();

const senderEmail = '20071a6721@vnrvjiet.in';
const senderPassword = 'ihighqwfcmrxpsmd';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: senderEmail,
        pass: senderPassword,
    },
});

router.post('/api/generateotp', async (req, res) => {
    let email = req.body.email;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    const otp = Math.floor(Math.random() * 1000000);

    const mailOptions = {
        from: 'gudiakshay@gmail.com',
        to: email,
        subject: 'ONEPOINT login OTP',
        text: `Your OTP code for login onto ONEPOINT is: ${otp}. `,
    };

    await (async () => {
        const exist = await usermodel.findOne({ 'email': email });
        if (!exist) {
            try {
                await usermodel.create({
                    'email': req.body.email,
                    'otp': otp
                })

            } catch (err) {
                return res.status(400).json({message: 'something is wrong'})
            }
        } else {

            try {
                const filter = { 'email': email };
                const update = { 'otp': otp };

                await usermodel.findOneAndUpdate(filter, update);
            }
            catch (err) {
                return res.status(400).json({message: 'something is wrong'})
            }
        }

    })()

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.error('Error sending OTP:', error);
            return res.status(400).json({ message: 'Error sending OTP' });
        } else {
            console.log('OTP sent:', info.response);
            return res.status(200).json({ message: 'OTP sent successfully' });
        }
    });

})

module.exports = router;