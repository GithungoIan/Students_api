const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());



const students = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/students.json`)
);

app.get('/api/v1/students', (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            students
        }
    });
});

app.get('/api/v1/students/:adm', (req, res) =>
{
    const adm = req.params.adm * 1;
    const student = students.find((el) => el.admission === adm);

    if (!student)
    {
        return res.status(400).json({
            status: 'fail',
            message: 'Student not found'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            student
        }
    });
})

app.post('/api/v1/students', (req, res) =>
{
    const newAdm = students[students.length - 1].admission + 1;
    const newStudent = Object.assign({ admission: newAdm }, req.body);

    if (!req.body.name || !req.body.gender)
    {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or gender'
        })
    }

    res.status(201).json({
        status: 'success',
        data: {
            students:newStudent
        }
    })
    
})

app.patch('/api/v1/students/:adm', (req, res) =>
{
    const adm = +req.params.adm;
    const student = students.find((el) => el.admission === adm);
    const updateStudent = Object.assign(student, req.body);

    if (!student)
    {
        return res.status(400).json({
            status: 'fail',
            message: 'Student not found'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            updateStudent
        }
    })

})

app.delete('/api/v1/students/:adm', (req, res) =>
{
    const adm = +req.params.adm;
    const student = students.find((el) => el.admission === adm);

    if (!student)
    {
        return res.status(400).json({
            status: 'fail',
            message: 'Student not found'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});