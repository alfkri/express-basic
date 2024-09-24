// Layer untuk handle request dan response
// Biasanya untuk validasi body juga

const express = require("express");

const {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudentById,
  editStudentById,
} = require("./student.service");

const router = express.Router();

// Menampilkan semua data
router.get("/", async (req, res) => {
  const students = await getAllStudents();

  res.send({
    data: students,
    message: "get all student successfully",
  });
});

// Menampilkan data by ID
router.get("/:id", async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const student = await getStudentById(studentId);

    if (typeof studentId !== "number") {
      throw Error("ID is not a number");
    }

    res.send({
      data: student,
      message: "get student by id successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Menambahkan data baru
router.post("/", async (req, res) => {
  try {
    const newStudentData = req.body;
    const student = await createStudent(newStudentData);
    res.send({
      data: student,
      message: "create student successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Menghapus data
router.delete("/:id", async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);

    await deleteStudentById(studentId);

    res.send("delete student successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Me-replace data
router.put("/:id", async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const studentData = req.body;

    if (
      !(
        studentData.nama &&
        studentData.nim &&
        studentData.email &&
        studentData.jurusan
      )
    ) {
      return res.status(400).send("Some fields are missing");
    }

    const student = await editStudentById(studentId, studentData);
    res.send({
      data: student,
      message: "edit student successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Menambal data
router.patch("/:id", async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const studentData = req.body;
    const student = await editStudentById(studentId, studentData);
    res.send({
      data: student,
      message: "edit student successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
