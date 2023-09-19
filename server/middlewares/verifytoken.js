const express = require('express');
const jwt = require('jsonwebtoken');
const { generatetoken } = require('../utils/generatetoken');

const verifytoken = (req, res, next) => {

    res.header('Access-Control-Allow-Origin', 'https://oneshotpoint.netlify.app');
    res.header('Access-Control-Allow-Credentials', true);
    
    try {

        const payload = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        generatetoken(res, payload.email);
        next();

    } catch (err) {

        const cookieOptions={
            maxAge: 0
        }

        res.cookie('jwt', "", cookieOptions);
        res.status(400).json({ "message": "unauthorized user" });
    }
}

module.exports = verifytoken