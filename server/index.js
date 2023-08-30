require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000

const connecttodb = require('./database');
const loginuser = require('./routes/loginuser');
const generateotp = require('./routes/generateotp');
const getappointments = require('./routes/getappointments');
const deleteappointment = require('./routes/deleteappointment');
const createappointment = require('./routes/createappointment');
const getuserappointments = require('./routes/getuserappointments');


connecttodb();

app.use(cors());
app.use(express.json());
app.use('/', generateotp);
app.use('/', loginuser);
app.use('/', getappointments);
app.use('/', createappointment);
app.use('/', getuserappointments);
app.use('/', deleteappointment);

// app.post('/',(req,res)=>{
//     res.send("Hello frontend this is backend");
// });

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});

