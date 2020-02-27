import React, {useState, useEffect} from "react"
import requests from "../lib/requests"
import Product from "./Product"
import "../css/Product.css"
function Search(props){
  const [items, setItems] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(undefined)
  useEffect(() => {
    requests.itemSearch(props.match.params.product).then(res => {
      setItems(res.data.Items)
      setMaxPage(res.data.pageCount)
    })
  }, [])
  useEffect(() => {
    requests.itemSearch(props.match.params.product).then(res => {
      setItems(res.data.Items)
      setMaxPage(res.data.pageCount)
    })
  }, [props.match.params.product])
  useEffect(() => {
    requests.itemSearch(props.match.params.product, currentPage).then(res => {
      setItems(res.data.Items)
    })
  }, [currentPage])
  return(
    <div id="productSearchContainer">
      <h1>Search Results for {props.match.params.product}</h1>
      <div>
        <Display items={items} props={props} page={currentPage}/>
        {maxPage > 1 && <div id="pages">
          <span class="pagesEach" onClick={() => setCurrentPage(1)}>First</span>
          {currentPage-2 >= 1 && <span class="pagesEach" onClick={() => setCurrentPage(currentPage-2)}>{currentPage-2}</span>}
          {currentPage-1 >= 1 && <span class="pagesEach" onClick={() => setCurrentPage(currentPage-1)}>{currentPage-1}</span>}
          <span class="pagesEach">{currentPage}</span>
          {currentPage+1 <= maxPage && <span class="pagesEach" onClick={() => setCurrentPage(currentPage+1)}>{currentPage+1}</span>}
          {currentPage+2 <= maxPage && <span class="pagesEach" onClick={() => setCurrentPage(currentPage+2)}>{currentPage+2}</span>}
          <span class="pagesEach" onClick={() => setCurrentPage(maxPage)}>Last</span>
        </div>}
      </div>
    </div>
  )
}
export default Search

const Display = (props) => {
  let itemsDisplay;
  if( props.items == "" ) {
    itemsDisplay = <div id="noResults"> There are no results for your search<br/> {props.props.match.params.product}<br/> try something else</div>;
  } else {
    itemsDisplay = props.items.map( (x,y) => (
      <div class="productSearch" key={x.Item.itemCode} onClick={() => props.props.history.push(`/product/${props.props.match.params.product}/${props.page}/${y}`)}>
        <img class="productSearchImage" src={x.Item.mediumImageUrls[0].imageUrl}></img>
        <span class="productSearchText">{ x.Item.itemName }</span>
      </div>
    ));
  }
  return (
    <div>
      { itemsDisplay }
    </div>
  );
};
