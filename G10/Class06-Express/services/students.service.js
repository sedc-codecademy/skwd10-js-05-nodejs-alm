const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const studentsPath = path.join(__dirname, "..", "data", "students.json");

//1. Get students data
const getStudentsData = queryData => {
  const students = JSON.parse(
    fs.readFileSync(studentsPath, { encoding: "utf-8" })
  );

  let updatedStudents = [...students];

  if (queryData?.gender) {
    updatedStudents = updatedStudents.filter(
      student => student.gender === queryData.gender
    );
  }
  if (queryData?.country) {
    updatedStudents = updatedStudents.filter(
      student => student.country === queryData.country
    );
  }

  if (updatedStudents.length <= 0) throw new Error("No students found");

  return updatedStudents;
};

//2. Save students date
const saveStudentData = students =>
  fs.writeFileSync(studentsPath, JSON.stringify(students, 0, 2));

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
  if (foundStudentIndex < 0) throw new Error("Student not found");

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
