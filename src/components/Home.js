import React, {useState, useEffect} from "react"
import requests from "../lib/requests"
import "../css/Home.css"
function Home(props) {
  const [mostPopular, setMostPopular] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [genre, setGenre] = useState("")
  useEffect(() => {
    requests.mostPopular(currentPage).then(res => setMostPopular(res.data.Items))
    requests.genreSearch().then(res => setGenre(res.data.children))
  }, [])
  console.log(mostPopular);
  console.log(genre);
  return(
    <div>
      <br/>
      <h1 id="titleCardForPopular"> Most Popular Items Today</h1><br/>
      <div id="mostPopularContainer">
        {mostPopular !== "" && mostPopular.map((x,y) => (
            <img onClick={() => ""} key={y} id={y} src={x.Item.mediumImageUrls[0].imageUrl} width="150" height="150" alt={x.Item.catchcopy}></img>
        ))}
      </div><br/>
    <div id="homeCategoriesTitle"><h1>Explore some of our categories</h1></div>
      <div id="homeCategories">
        {genre !== "" && genre.map(x => (
          <div class="homeCategoriesPiece" onClick={() => props.history.push(`search/${x.child.genreName}`)}>{x.child.genreName}</div>
        ))}
      </div>
    </div>
  )
}
export default Home
