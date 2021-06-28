const crud = require("../model/model");
const table = "student";
const db = require("../Utils/DB");
const ErrorResponse = require("../Utils/errorResponse");

const markpresent = (req, res) => {
  const { email } = req.body;
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  db.query(
    `insert into attendance (email, date) values ("${email}", "${formattedDate}");`,
    (err, rows) => {
      if (err) {
        res.status(200).json({
          data: "Try Again",
        });
      } else {
        res.status(200).json({
          data: "Attendance Taken",
        });
        db.query(
          `UPDATE user SET attendanceCount = attendanceCount + 1 where email="${email}"`
        );
      }
    }
  );
};

const getMe = (req, res) => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  db.query(
    `select m1.name,m1.email,m1.classNumber,m1.section,m1.attendanceCount,m1.role,m.isPresent from 
    (SELECT  name,role, email, classNumber, section, attendanceCount FROM user where email="${req.userEmail}") as m1, 
    (select COUNT(email) AS isPresent  from attendance where date="${formattedDate}" and email="${req.userEmail}") as  m;`,
    (err, rows1) => {
      if (err) {
        return new ErrorResponse("No Data", 200);
      } else {
        res.status(200).json({
          ...rows1[0],
        });
      }
    }
  );
};

const getMates = (req, res) => {
  const { classNumber, email } = req.body;
  db.query(
    `select name, email, section from user where classNumber="${classNumber}" and email!="${email}";`,
    (err, row) => {
      if (err) {
        return new ErrorResponse("No Data", 200);
      } else {
        res.status(200).json({
          data: row,
        });
      }
    }
  );
};

module.exports = { markpresent, getMe, getMates };
