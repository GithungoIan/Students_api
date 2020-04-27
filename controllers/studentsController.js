const fs = require('fs');

const students = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/students.json`)
  );


exports.checkAdm = (req, res, next, val) =>{
    console.log(`Students adm is ${val}`);

    const adm = + req.params.adm;
    const student = students.find((el) => el.admission === adm)
    if (!student) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid Id',
      });
    }
    next();
}

exports.checkBody = (req, res, next) =>{
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
          status: 'fail',
          message: 'Missing name or price',
        });
      }
      next();
}
exports.getAllStudents = (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            students
        }
    });
}

exports.getStudent = (req, res) =>
{
    const adm = req.params.adm * 1;
    const student = students.find((el) => el.admission === adm);
    res.status(200).json({
        status: 'success',
        data: {
            student
        }
    });
}

exports.createStudent = (req, res) =>
{
    const newAdm = students[students.length - 1].admission + 1;
    const newStudent = Object.assign({ admission: newAdm }, req.body);

    res.status(201).json({
        status: 'success',
        data: {
            students: newStudent
        }
    })
    
}

exports.updateStuent = (req, res) =>
{
    const adm = +req.params.adm;
    const student = students.find((el) => el.admission === adm);
    const updateStudent = Object.assign(student, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            updateStudent
        }
    })

}

exports.deleteStudent = (req, res) =>
{
    res.status(204).json({
        status: 'success',
        data: null
    })
}
