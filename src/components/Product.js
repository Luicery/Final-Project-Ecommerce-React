import React, {useState, useEffect} from "react"
import axios from "axios"
import reviewStar from "../assets/reviewStar.png"
import reviewStarEmpty from "../assets/reviewStarEmpty.png"
import requests from "../lib/requests"
import backArrow from "../assets/back.png"
function Product(props) {
  const [user, setUser] = useState("");
  const [item, setItem] = useState("");
  const [genre, setGenre] = useState("");
  useEffect(() => {
    requests.getUser().then(res => {
      setUser(res.data)
    })
    requests.itemSearch(props.match.params.product, props.match.params.page).then(res => {
      setItem(res.data.Items[parseInt(props.match.params.index)])
    })
  }, [])
  useEffect(() => {
    if(item !== "") {
      requests.genreSearch(item.Item.genreId).then(res => setGenre(res.data.current.genreName))
    }
  }, [item])
  function checkCart() {
    for(let i = 0; i < user.userstuff.cart.length; i++) {
      if(user.userstuff.cart[i].title === props.match.params.product && user.userstuff.cart[i].page === parseInt(props.match.params.page) && user.userstuff.cart[i].index === parseInt(props.match.params.index)) {
        return true
      }
    }
    return false
  }
  function checkWish() {
    for(let i = 0; i < user.userstuff.wishlist.length; i++) {
      if(user.userstuff.wishlist[i].title === props.match.params.product && user.userstuff.wishlist[i].page === parseInt(props.match.params.page) && user.userstuff.wishlist[i].index === parseInt(props.match.params.index)) {
        return true
      }
    }
    return false
  }
  function removeWishList() {
    requests.wishDelete(props.match.params.product, props.match.params.page, props.match.params.index)
    .then(requests.getUser().then(res => {
      setUser(res.data)
    }))
  }
  function removeCart() {
    requests.cartDelete(props.match.params.product, props.match.params.page, props.match.params.index)
    .then(requests.getUser().then(res => {
      setUser(res.data)
    }))
  }
  function addWishList() {
    requests.itemWish(props.match.params.product, props.match.params.page, props.match.params.index)
    .then(requests.getUser().then(res => {
      setUser(res.data)
    }))
  }
  function addCart() {
    requests.itemCart(props.match.params.product, props.match.params.page, props.match.params.index)
    .then(requests.getUser().then(res => {
      setUser(res.data)
    }))
  }
  return(
    <div id="productDetailFullContainer">
    <img id="fatArrow" onClick={()=> props.history.push(`/search/${props.match.params.product}`)} src={backArrow} height="50" width="70" alt="Go Back"></img>
      {item !== "" && <div id="productDetailContainer">
      <div id="productDetails">
        <Pictures item={item.Item}/>
        <div><h2>{item.Item.itemName}</h2><br/>
        <div id="productDetailsGenrePrice">
          <span onClick={() => props.history.push(`/search/${genre}`)}>{genre}</span>
        <span id="productDetailPrice">¥{item.Item.itemPrice}</span>
        </div><br/>
        {item.Item.itemCaption}<br/>
        By:{item.Item.shopName}</div>
      </div>
      <div id="productWishCart">{user !== "" && checkWish() === false && <div onClick={() => addWishList()}>Add to Wishlist</div>}
      {user !== "" && checkWish() && <div onClick={() => removeWishList()}>Remove From Wishlist</div>}
      {user !== "" && checkCart() === false && <div onClick={() => addCart()}>Add to Cart</div>}
      {user !== "" && checkCart() && <div onClick={() => removeCart()}>Remove From Cart</div>}
      {localStorage.jwt === undefined && <div onClick={() => props.history.push("/login")}>Add to Wishlist</div>}
      {localStorage.jwt === undefined && <div onClick={() => props.history.push("/login")}>Add to Cart</div>}
      </div>
      <span id="productReviews">Reviews: {item.Item.reviewCount}<br/>
      {item.Item.reviewAverage >= 1 &&<img src={reviewStar} width="50" height="50"></img>}
      {item.Item.reviewAverage < 1 && <img src={reviewStarEmpty} width="50" height="50"></img>}
      {item.Item.reviewAverage >= 2 && <img src={reviewStar} width="50" height="50"></img>}
      {item.Item.reviewAverage < 2 && <img src={reviewStarEmpty} width="50" height="50"></img>}
      {item.Item.reviewAverage >= 3 && <img src={reviewStar} width="50" height="50"></img>}
      {item.Item.reviewAverage < 3 && <img src={reviewStarEmpty} width="50" height="50"></img>}
      {item.Item.reviewAverage >= 4 && <img src={reviewStar} width="50" height="50"></img>}
      {item.Item.reviewAverage < 4 && <img src={reviewStarEmpty} width="50" height="50"></img>}
      {item.Item.reviewAverage >= 5 && <img src={reviewStar} width="50" height="50"></img>}
      {item.Item.reviewAverage < 5 && <img src={reviewStarEmpty} width="50" height="50"></img>}
      <br/>Average Rating: {item.Item.reviewAverage}</span>
      </div>}
    </div>
  )
}
export default Product

const Pictures = (props) => {
  const [currentPicture, setCurrentPicture] = useState(0)
  const showPicture = function() {
    let slides = document.getElementsByClassName("slides")
    if(slides[currentPicture] !== undefined) {
      for(let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
        slides[i].classList.remove("shown")
      }
      slides[currentPicture].style.display = "block"
      slides[currentPicture].classList.add("shown")
    }
  }
  useEffect(() => {
    showPicture()
  }, [])
  useEffect(() => {
    showPicture()
  }, [currentPicture])
  return(
    <div id="slideShowContainer">
    {props.item.mediumImageUrls.map((x,y) => (
      <span>
        <img key={y} className="slides" src={x.imageUrl} width="300" height="300"></img>
        <img className="smallSlides" key={y+"small"} onMouseEnter={() => setCurrentPicture(y)} src={x.imageUrl} width="100" height="100"></img>
      </span>
    ))}
    </div>
  )
}
