import { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@material-ui/core";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./login.css";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
const allRoles = [
  { name: "Student", value: "student" },
  { name: "Teacher", value: "teacher" },
];
const allClasses = [
  { name: "Class 1", value: 1 },
  { name: "Class 2", value: 2 },
  { name: "Class 3", value: 3 },
  { name: "Class 4", value: 4 },
  { name: "Class 5", value: 5 },
];
const allSections = [
  { name: "Section A", value: "A" },
  { name: "Section B", value: "B" },
  { name: "Section C", value: "C" },
];

const Login = (props) => {
  // const classes = useStyles();
  const [role, setRole] = useState("");
  const [classDetails, setClassDetails] = useState({
    classNumber: 0,
    section: 0,
  });
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    let url = "";
    let payload = {};
    if (tab === 0) {
      url = "http://localhost:5000/api/user/signup";
      const signUpPayload = {
        name,
        email,
        password,
        role,
        classNumber: role === "student" ? classDetails.classNumber : "",
        section: role === "student" ? classDetails.section : "",
      };
      payload = signUpPayload;
      if (
        (name &&
          email &&
          password &&
          role &&
          classDetails.classNumber &&
          classDetails.section) === ""
      ) {
        setErrorMessage("Fill in all details");
        setError(true);
        return;
      }
    } else {
      url = "http://localhost:5000/api/user/login";
      const loginPayload = {
        email,
        password,
        role,
      };
      payload = loginPayload;
      if ((email && password && role) === "") {
        setErrorMessage("Fill in all details");
        setError(true);
        return;
      }
    }
   
      axios
        .post(url, payload, { withCredentials: true })
        .then((res) => {
          props.getUserDetails()
        })
        .catch((err) => {
          setError(true);
          setErrorMessage("Not Valid User");
          props.setUser({
            name: "",
            email: "",
          });
        });
    
  };
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <div className="main-login">
      <div className="col-6">
        <AppBar position="static" className="appbar">
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Sign Up" className="tab-button" />
            <Tab label="Login" className="tab-button" />
          </Tabs>
        </AppBar>
        <TabPanel value={tab} index={tab}>
          <div className="login">
            {tab === 0 && (
              <TextField
                id="outlined-basic"
                label="Name"
                required={true}
                variant="standard"
                autoComplete="off"
                className="mb-3 d-block email-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              id="outlined-basic"
              label="Email"
              required={true}
              variant="standard"
              autoComplete="off"
              className="mb-3 d-block email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="standard"
              type="password"
              required={true}
              className=" password-input mb-3"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mb-3 checkboxes">
              <FormControl required className="password-input">
                <InputLabel>Role</InputLabel>
                <Select
                  className="d-block email-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {allRoles.map((role) => (
                    <MenuItem value={role.value}>{role.name}</MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>Required</FormHelperText> */}
              </FormControl>
            </div>
            <div className="dropdowns">
              {tab === 0 && role === "student" && (
                <div className="mb-3 dropdown">
                  <FormControl required className="password-input">
                    <InputLabel>Class</InputLabel>
                    <Select
                      className="d-block email-input"
                      value={classDetails.classNumber}
                      onChange={(e) =>
                        setClassDetails({
                          ...classDetails,
                          classNumber: e.target.value,
                        })
                      }
                    >
                      {allClasses.map((cls) => (
                        <MenuItem value={cls.value}>{cls.name}</MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText>Required</FormHelperText> */}
                  </FormControl>
                </div>
              )}
              {tab === 0 && role === "student" && (
                <div className="mb-3 dropdown">
                  <FormControl required className="password-input">
                    <InputLabel>Section</InputLabel>
                    <Select
                      className="d-block email-input"
                      value={classDetails.section}
                      onChange={(e) =>
                        setClassDetails({
                          ...classDetails,
                          section: e.target.value,
                        })
                      }
                    >
                      {allSections.map((sec) => (
                        <MenuItem value={sec.value}>{sec.name}</MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText>Required</FormHelperText> */}
                  </FormControl>
                </div>
              )}
            </div>
            <Button
              variant="dark"
              onClick={() => handleLogin()}
              className="loginbutton"
            >
              {tab === 0 ? "Sign Up" : "Login"}
            </Button>
            {error && <span className="errorclass">{errorMessage}</span>}
          </div>
        </TabPanel>
      </div>
      <div className="col-6 text-login">
        <h1 className="text-white">Attendance Tracking</h1>
        {role && (
          <h3 className="text-white">{`Logging In as ${
            role.charAt(0).toUpperCase() + role.slice(1)
          }`}</h3>
        )}
      </div>
    </div>
  );
};

export default Login;
