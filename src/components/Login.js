import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Login extends React.Component {
  state = {
    email: "",
    password: ""
  }
  login = () => {
    axios.post("http://localhost:3000/user_token", {auth: {email: this.state.email, password: this.state.password}})
    .then(res => {
      console.log("Logged in ",res)
      localStorage.setItem("jwt", res.data.jwt)
    })
    .catch(err => {
      console.log("Error ", err)
    })
    this.props.history.push('/')
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
      return (
        <div className="App"><br/>
          <form id="loginForm">
            <span class="signupFormLeftSide">Email:</span>
            <input onChange={this.handleChange}
              name="email"
              id="email"
              type="email"
              placeholder="Email"/>
            <span class="signupFormLeftSide">Password:</span>
            <input onChange={this.handleChange}
              name="password"
              id="password"
              type="password"
              placeholder="Password"/>
            <input id="loginAccount" type="submit" value="Login" className="pressbutton" onClick={this.login}></input>
            </form>
            <br />
          <br />
        </div>
      );
    }
  }
export default Login;
