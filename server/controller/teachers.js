const db = require("../Utils/DB");

const getByStudentClass = (req, res) => {
  const { classNumber } = req.body;
  db.query(`SELECT * FROM user where classNumber="${classNumber}";`, (err, rows) => {
    if (err) {

      res.status(200).json({
        data: "Try Again",
      });
    } else {
      res.status(200).json({
        data: rows,
      });
    }
  });
};

module.exports = getByStudentClass;
