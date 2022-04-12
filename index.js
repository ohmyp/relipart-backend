require("dotenv").config();
const express = require('express')
const multer = require("multer");
const router = require('./Routers/routes')
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mysql = require("mysql2");

const port = process.env.PORT || 3001
const host = process.env.HOST_NAME || 'localhost'

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        setTimeout(() => {
            cb(null, path.join(__dirname, 'files'))
        }, 1000);

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('files'));
app.use(multer({storage: storageConfig}).array("filedata"));
app.use(cors())
app.use(router)

app.listen(port, host, () => {
    console.log(`server started on ${host}:${port}`)
})
