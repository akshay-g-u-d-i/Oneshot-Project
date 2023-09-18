const express = require('express');
const jwt = require('jsonwebtoken');
const { generatetoken } = require('../utils/generatetoken');

const verifytoken = (req, res, next) => {
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