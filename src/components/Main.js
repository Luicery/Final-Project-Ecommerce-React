import React from "react"
import axios from "axios"
import {
  Route,
  Link,
  HashRouter as Router,
  Switch
} from "react-router-dom"
import Signup from "./Signup"
import Login from "./Login.js"
import requests from "../lib/requests"
import Product from "./Product"
import Search from "./Search"
import Home from "./Home"
import Cart from "./Cart"
import Navigation from "./Navigation"
import Wishlist from "./Wishlist"
import Purchase from "./Purchase"
class Main extends React.Component {
  render() {
    return(
      <div>
        <Navigation/>
        <Router>
          <Route exact path="/" component={Home}></Route>
          {localStorage.jwt === undefined && <Route exact path="/Login" component={Login}></Route>}
          {localStorage.jwt === undefined && <Route exact path="/Signup" component={Signup}></Route>}
          <Route exact path="/Search/:product" component={Search}></Route>
          <Route exact path="/product/:product/:page/:index" component={Product}></Route>
          {localStorage.jwt !== undefined && <Route exact path="/purchase" component={Purchase}></Route>}
          {localStorage.jwt !== undefined && <Route exact path="/cart" component={Cart}></Route>}
          {localStorage.jwt !== undefined && <Route exact path="/wishlist" component={Wishlist}></Route>}
        </Router>
      </div>
    )
  }
}
export default Main
