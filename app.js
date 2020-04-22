const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());


const students = JSON.parse(fs.readFileSync(`${__dirname}/ students.json`));

app.get('/api/v1/students', (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            students
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});