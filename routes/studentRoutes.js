const express = require('express');
const studentsController = require('../controllers/studentsController');
const router = express.Router();

router.param('adm', studentsController.checkAdm);
router
    .route('/')
    .get(studentsController.getAllStudents)
    .post(studentsController.createStudent)

router
    .route('/:adm')
    .get(studentsController.getStudent)
    .patch(studentsController.updateStuent)
    .delete(studentsController.deleteStudent)

module.exports = router;