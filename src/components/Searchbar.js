import React, {useState} from "react"
import {
  Route,
  Link,
  HashRouter as Router,
  useHistory
} from "react-router-dom"
function Searchbar(props) {
  const [search, setSearch] = useState("")
  return(
    <Router>
      <form id="searchBar">
        <input id="search" type="text" onChange={(event) => setSearch(event.target.value)} placeholder="Search For A Product"></input>
        {search !== "" && <Link to={`/search/${search}`}>
          <input class="submit" type="submit" value="Search"></input>
        </Link>}
        {search === "" && <Link to={`/`}><input class="submit" type="submit" value="Search"/></Link>}
      </form>
    </Router>
  )
}
export default Searchbar
