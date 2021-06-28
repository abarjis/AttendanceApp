const express = require("express");
const getByStudentClass = require("../controller/teachers");
const { markpresent, getMe, getMates } = require("../controller/students");
const { signup, login, logout } = require("../controller/user");

const { protect } = require("../middleware/auth");

const router = express.Router();
//teacher
router.post("/getbyclass", getByStudentClass);
// student getmates
router.post("/markpresent", markpresent);
router.get("/getme", protect, getMe);
router.post("/getmates", getMates);
// user --common
router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

module.exports = router;
