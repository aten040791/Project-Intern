const express = require('express');
const path = require('path');
const uploadRouter = require('./modules/uploads/uploadRouter');

const app = require("./index");

const port = 3000;

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Use the upload router
app.use('/upload', uploadRouter);

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});