import axios from "axios";
import "./dashboard.css";
import { Button } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";

const DashBoard = (props) => {
  const [classData, setClassData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const handleAttendance = () => {
    axios
      .post("http://localhost:5000/api/user/markpresent", {
        email: props.user.email,
      })
      .then((res) => {
        props.getUserDetails();
      })
      .catch(console.log);
  };
  const getClassMates = () => {
    axios
      .post("http://localhost:5000/api/user/getmates", {
        classNumber: props.user.classNumber,
        email: props.user.email,
      })
      .then((res) => {
        setClassData(res.data.data);
        setFetch(true);
      })
      .catch(console.log);
  };
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        props.getUserDetails();
      });
  };

  return (
    <div className="dashboard-div">
      <div className="main-dashboard">
        <div className="header-div">
          <h1 className="text-white">Welcome to Student's Dashboard</h1>
          <Button variant="dark" onClick={() => handleLogout()}>
            {" "}
            Logout
          </Button>
        </div>
        <div className="d-flex">
          <div className="col-6 details">
            <span className="d-block mb-3 ">{`Name:  ${props.user.name}`}</span>
            <span className="d-block mb-3 ">{`Class:  ${props.user.classNumber}`}</span>
            <span className="d-block mb-3 ">{`Section:  ${props.user.section}`}</span>
            <span className="d-block mb-3 ">{`Email:  ${props.user.email}`}</span>
            <span className="d-block mb-3 ">{`Attendance Percent: ${
              parseFloat((props.user.attendanceCount / 30) * 100).toFixed(2) ||
              0
            } %`}</span>
            <span className="">
              {props.user.isPresent
                ? "You have already marked your attendance Today"
                : "Please Click the Button Below to Mark Attendance For Today"}
            </span>
            <Button
              variant="dark"
              onClick={() => handleAttendance()}
              className="attendancebutton d-block mt-3"
              disabled={props.user.isPresent}
            >
              Mark Attendance
            </Button>
          </div>
          <div className={`col-6 ${classData.length !== 0 ? "bg-white" : ""}`}>
            {!fetch ? (
              <Button variant="dark" onClick={() => getClassMates()}>
                Click me to view your Classmates
              </Button>
            ) : (
              <div>
                {classData.length > 0 ? (
                  <TableContainer>
                    <Table stickyHeader={true} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Email</TableCell>
                          <TableCell align="right">Section</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {classData &&
                          classData.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">
                                <a href={`mailto:${row.email}`}>{row.email}</a>
                              </TableCell>
                              <TableCell align="right">{row.section}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <h2 className="text-white">No Friends Found</h2>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
