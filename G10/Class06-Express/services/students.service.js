const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const studentsPath = path.join(__dirname, "..", "data", "students.json");

//1. Get students data
const getStudentsData = () =>
  JSON.parse(fs.readFileSync(studentsPath, { encoding: "utf-8" }));

//2. Save students date
const saveStudentData = students =>
  JSON.stringify(fs.writeFileSync(studentsPath, students));

//3.Add new student
const addStudent = newStudentData => {
  const students = getStudentsData();
  const newStudent = {
    id: uuid(),
    ...newStudentData,
  };
  const updatedStudents = [...students, newStudent];
  saveStudentData(updatedStudents);
  return newStudent;
};

//4.Get student by id
const getStudentById = studentId => {
  const students = getStudentsData();

  const foundStudent = students.find(student => student.id === studentId);

  if (!foundStudent) throw new Error("Student Not Found");

  return foundStudent;
};

//5.Updating student info
const updateStudent = (studentId, studentUpdateData) => {
  if (studentUpdateData.id) throw new Error("Id can't be changed");

  const students = getStudentsData();
  const foundStudentIndex = students.findIndex(
    student => student.id === studentId
  );
  //If student index is not found
  if (!foundStudentIndex || foundStudentIndex < 0)
    throw new Error("Student not found");

  const updatedStudentData = {
    ...students[foundStudentIndex],
    ...studentUpdateData,
  };

  students[foundStudentIndex] = updatedStudentData;

  saveStudentData(students);
  return updatedStudentData;
};

//6. Deleting a student
const deleteStudent = studentId => {
  const students = getStudentsData();

  const updatedStudentData = students.filter(
    student => student.id !== studentId
  );

  saveStudentData(updatedStudentData);
};

module.exports = {
  getStudentsData,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
