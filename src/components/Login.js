import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Login extends React.Component {
  state = {
    email: "",
    password: "",
    render: false
  }
  login = () => {
    axios.post("https://final-project-rails.herokuapp.com/user_token", {auth: {email: this.state.email, password: this.state.password}})
    .then(res => {
      localStorage.setItem("jwt", res.data.jwt)
      this.setState({render: true})
    })
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    if(localStorage.jwt !== undefined) {
      this.props.history.push('/')
      window.location.reload(false)
    }
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
