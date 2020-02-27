import React from "react"
import axios from "axios"
import cart from "../assets/cart.png"
import wishlist from "../assets/wishlist.png"
import {
  Route,
  Link,
  HashRouter as Router
} from "react-router-dom"
import Searchbar from "./Searchbar"
import "../css/Navigation.css"
class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginPressed: false,
      signupPressed: false,
      loggedIn: false,
    }
  }
  logout = () => {
    localStorage.clear("jwt")
    this.setState(prevState => ({
      check: !prevState.check
    }));
  }
  ShowLogin = () => {
    this.setState({loginPressed: true, signupPressed: false})
  }
  closeLogin = () => {
    this.setState({loginPressed: false, signupPressed: false})
  }
  ShowSignup = () => {
    this.setState({signupPressed: true, loginPressed: false})
  }
  closeSignup = () => {
    this.setState({signupPressed: false, loginPressed: false})
  }
  render() {
    return(
      <div>
        <nav>
          <Router>
            <Link to="/" id="title"><h1>BootLeg ECommerce</h1></Link>
            <Searchbar/>
            {localStorage.jwt === undefined && <span id="login"><Link to="/login" onClick={this.ShowLogin}>Login</Link></span>}
            {localStorage.jwt === undefined && <span id="signup"><Link to="/signup" onClick={this.ShowSignup}>Sign Up</Link></span>}
            {localStorage.jwt !== undefined && <span id="logout" onClick={this.logout}>Logout</span>}
            {localStorage.jwt !== undefined && <Link to="/wishlist"><img class="wishlist" src={wishlist} width="40" height="40" alt="wishlist" /></Link>}
            {localStorage.jwt !== undefined && <Link to="/cart"><img class="cart" src={cart} width="40" height="40" alt="cart" /></Link>}
            {localStorage.jwt === undefined && <Link to="/login"><img class="wishlist" src={wishlist} width="40" height="40" alt="wishlist" /></Link>}
            {localStorage.jwt === undefined && <Link to="/login"><img class="cart" src={cart} width="40" height="40" alt="cart" /></Link>}
          </Router>
        </nav>
      </div>
    )
  }
}
export default Navigation
