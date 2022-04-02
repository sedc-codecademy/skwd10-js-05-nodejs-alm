// const express = require('express')
// const router = express.Router()

const router = require("express").Router();
const studentService = require("../services/students.service");

// CRUD = Create; Read; Update; Delete

// localhost:3000/api/students
//                              key   value pair
// localhost:3000/api/students?gender=F
// localhost:3000/api/students?country=France

// localhost:3000/api/students?gender=F&country=France

//1. Get all students
router.get("/students", (req, res) => {
  const queryData = req.query;
  console.log(queryData);

  try {
    const students = studentService.getStudentsData(queryData);
    res.send(students);
  } catch (error) {
    res.sendStatus(500);
  }
});
//2. Get student by id
router.get("/students/:id", (req, res) => {
  const studentId = req.params.id;
  console.log(req.params);
  try {
    const student = studentService.getStudentById(studentId);
    res.status(200).send(student);
  } catch (error) {
    //you can have something like
    //errorLogger.emit("error", error)
    res.status(404).send(error.message);
  }
});
//3. Add new student
router.post("/students/add", (req, res) => {
  const newStudentData = req.body;

  try {
    const createdStudent = studentService.addStudent(newStudentData);
    res.status(201).send(createdStudent);
  } catch (error) {
    res.sendStatus(500);
  }
});
//4. Update student info
router.patch("/students/:id/update", (req, res) => {
  const studentUpdates = req.body;
  const studentId = req.params.id;
  try {
    const updatedStudent = studentService.updateStudent(
      studentId,
      studentUpdates
    );
    res.status(200).send(updatedStudent);
  } catch (error) {
    if (error.message === "Student not found") {
      res.status(404).send(error.message);
    } else if (error.message === "Id can't be changed") {
      res.status(400).send(error.message);
    } else {
      res.sendStatus(500);
    }
  }
});

//5. Delete a student
router.delete("/students/:id", (req, res) => {
  const studentId = req.params.id;
  try {
    studentService.deleteStudent(studentId);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
