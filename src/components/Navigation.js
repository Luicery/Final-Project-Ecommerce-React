import React, {useState, useEffect} from "react"
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
// class Navigation extends React.Component {
//   logout = () => {
//     localStorage.clear("jwt")
//     this.setState(prevState => ({
//       check: !prevState.check
//     }));
//   }
//   render() {
//     return(
//       <div>
//         <nav>
//           <Router>
//             <Link to="/" id="title"><h1>BootLeg ECommerce</h1></Link>
//             <Searchbar/>
//             {localStorage.jwt === undefined && <span id="login"><Link to="/login">Login</Link></span>}
//             {localStorage.jwt === undefined && <span id="signup"><Link to="/signup">Sign Up</Link></span>}
//             {localStorage.jwt !== undefined && <span id="logout" onClick={this.logout}>Logout</span>}
//             {localStorage.jwt !== undefined && <Link to="/wishlist"><img class="wishlist" src={wishlist} width="40" height="40" alt="wishlist" /></Link>}
//             {localStorage.jwt !== undefined && <Link to="/cart"><img class="cart" src={cart} width="40" height="40" alt="cart" /></Link>}
//             {localStorage.jwt === undefined && <Link to="/login"><img class="wishlist" src={wishlist} width="40" height="40" alt="wishlist" /></Link>}
//             {localStorage.jwt === undefined && <Link to="/login"><img class="cart" src={cart} width="40" height="40" alt="cart" /></Link>}
//           </Router>
//         </nav>
//       </div>
//     )
//   }
// }
function Navigation(props) {
  const logout = () => {
    localStorage.clear("jwt")
    window.location.reload(false)
  }
  return(
    <div>
      <nav>
        <Router>
          <Link to="/" id="title"><h1>BootLeg ECommerce</h1></Link>
          <Searchbar/>
          {localStorage.jwt === undefined && <span id="login"><Link to="/login">Login</Link></span>}
          {localStorage.jwt === undefined && <span id="signup"><Link to="/signup">Sign Up</Link></span>}
          {localStorage.jwt !== undefined && <span id="logout" onClick={logout}>Logout</span>}
          {localStorage.jwt !== undefined && <Link to="/wishlist"><img class="wishlist" src={wishlist} width="40" height="40" alt="wishlist" /></Link>}
          {localStorage.jwt !== undefined && <Link to="/cart"><img class="cart" src={cart} width="40" height="40" alt="cart" /></Link>}
          {localStorage.jwt === undefined && <Link to="/login"><img class="wishlist" src={wishlist} width="40" height="40" alt="wishlist" /></Link>}
          {localStorage.jwt === undefined && <Link to="/login"><img class="cart" src={cart} width="40" height="40" alt="cart" /></Link>}
        </Router>
      </nav>
    </div>
  )
}
export default Navigation
