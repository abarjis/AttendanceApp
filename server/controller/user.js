const bcrypt = require("bcrypt");
const sendTokenResponse = require("../Utils/sendTokenResponse");
const crud = require("../model/model");
const db = require("../Utils/DB");

const login = (req, res) => {
  const { email, password, role } = req.body;

  crud.getById("email", email, "user", (err, rows) => {
    if (err) {
      res.status(200).json({
        success: false,
        message: "Error",
      });
    } else {
      bcrypt.compare(password, rows[0].password, function (err, result) {
        if (result) {
          sendTokenResponse(rows[0], res);
        } else {
          res.status(200).json({
            success: false,
            message: "Wrong Password",
          });
        }
      });
    }
  });
};

const signup = async (req, res) => {
  const { email, password, role, classNumber, section, name } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(200).json({
        success: false,
        message: "Can't do now",
      });
    } else {
      const classValue = role === "teacher" ? 0 : classNumber;
      const sectionValue = role === "teacher" ? " " : section;
      db.query(
        `INSERT INTO user (email, role, classNumber, section, password, name)
        VALUES ("${email}", "${role}", "${classValue}","${sectionValue}","${hash}", "${name}");`,
        (error, row) => {
          if (error) {
            console.log(error);
            res.status(200).json({
              success: false,
              message: "Db error",
            });
          } else {
            console.log(row);
            const user = {
              name,
              email,
              role,
              classNumber,
              section,
            };
            sendTokenResponse(user, res);
          }
        }
      );
    }
  });
};

const logout = (req, res) => {
  const options = {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  };

  res.status(200).clearCookie("token").json({
    success: true,
    data: {},
  });
  I;
};

module.exports = { signup, login, logout };
