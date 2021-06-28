import { Component } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/login";
import DashBoard from "./components/dashboard";
import TeacherDashboard from "./components/teacherDashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = () => {
    let userDetails = {};
    axios
      .get("http://localhost:5000/api/user/getme", { withCredentials: true })
      .then((res) => {
        userDetails = res.data;
        this.setState({
          user: userDetails.email ? userDetails : {},
        });
      })
      .catch((err) => console.log);
  };

  handleUserLogin = (user) => {
    this.setState({
      user,
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        {!user.name ? (
          <Login
            setUser={this.handleUserLogin}
            getUserDetails={this.getUserDetails}
          />
        ) : (
          <div>
            {user.role === "student" ? (
              <DashBoard user={user} getUserDetails={this.getUserDetails}/>
            ) : (
              <TeacherDashboard getUserDetails={this.getUserDetails}/>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
