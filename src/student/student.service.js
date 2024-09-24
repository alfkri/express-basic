// Service layer untuk handle business logic
// Dipisah agar tanggung jawabnya ter-isolate dan functionnya reusable

const {
  findStudents,
  findStudentById,
  insertStudent,
  deleteStudent,
  editStudent,
} = require("./student.repository");

const getAllStudents = async () => {
  // prisma.student maksudnya itu nama tabel dari dbnya
  const students = await findStudents();

  return students;
};

const getStudentById = async (id) => {
  const student = await findStudentById(id);

  if (!student) {
    throw Error("student not found");
  }

  return student;
};

const createStudent = async (newStudentData) => {
  const student = await insertStudent(newStudentData);
  return student;
};

const deleteStudentById = async (id) => {
  await getStudentById(id);

  await deleteStudent(id);
};

const editStudentById = async (id, studentData) => {
  await getStudentById(id);

  const student = editStudent(id, studentData);
  return student;
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudentById,
  editStudentById,
};
