// Untuk handle komunikasi dengan database
// bisa dengan ORM ataupun raw query

const prisma = require("../db");

const findStudents = async () => {
  const students = await prisma.student.findMany();
  return students;
};

const findStudentById = async (id) => {
  const student = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return student;
};

const insertStudent = async (newStudentData) => {
  const student = await prisma.student.create({
    data: {
      nama: newStudentData.nama,
      nim: newStudentData.nim,
      email: newStudentData.email,
      jurusan: newStudentData.jurusan,
    },
  });
  return student;
};

const deleteStudent = async (id) => {
  await prisma.student.delete({
    where: {
      id,
    },
  });
};

const editStudent = (id, studentData) => {
  const student = prisma.student.update({
    where: {
      id,
    },
    data: {
      nama: studentData.nama,
      nim: studentData.nim,
      email: studentData.email,
      jurusan: studentData.jurusan,
    },
  });
  return student;
};

module.exports = {
  findStudents,
  findStudentById,
  insertStudent,
  deleteStudent,
  editStudent,
};
