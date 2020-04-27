const express = require('express');
const morgan = require('morgan');

const studentRouter = require('./routes/studentRoutes')

const app = express();


//MIddlewares
app.use(morgan('dev'));
app.use(express.json());


//Routes
app.use('/api/v1/students', studentRouter)

const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});