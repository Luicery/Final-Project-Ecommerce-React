import React from "react"
import axios from "axios"
class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    password_confirmation: ""
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault()
    let user = {
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        address: this.state.address,
        name: this.state.name
      }
    if(this.state.password === this.state.passwordConfirm) {
      axios.post("http://localhost:3000/users", {user})
      .then(res => {
        axios.post("http://localhost:3000/user_token", {auth: {email: this.state.email, password: this.state.password}})
        .then(res => {
          console.log("Logged in ",res)
          localStorage.setItem("jwt", res.data.jwt)
        })
      })
    } else {
      console.log("Error passwords do not match")
    }
    this.props.history.push("/")
  }
  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit} id="signupForm">
          <span class="signupFormLeftSide">Name:</span><input placeholder="Name" type="string" onChange={this.handleChange} name="name"/>
          <span class="signupFormLeftSide">Email:</span><input placeholder="example@example.com" type="email" onChange={this.handleChange} name="email"/>
          <span class="signupFormLeftSide">Phone:</span><input placeholder="Phone Number" type="string" onChange={this.handleChange} name="phone"/>
          <span class="signupFormLeftSide">Address:</span><input placeholder="Address" type="text" onChange={this.handleChange} name="address"/>
          <span class="signupFormLeftSide">Password:</span><input type="password" onChange={this.handleChange} name="password"/>
          <span class="signupFormLeftSide">Password Confirmation:</span><input type="password" onChange={this.handleChange} name="passwordConfirm"/>
          <input id="createAccount" type="submit" value="Create Your Account"/>
        </form>
      </div>
    )
  }
}
export default Signup
