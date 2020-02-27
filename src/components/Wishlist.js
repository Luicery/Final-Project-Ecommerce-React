import React, {useState, useEffect} from "react"
import requests from "../lib/requests"

function Wishlist(props) {
  const [user, setUser] = useState("")
  const [item, setItem] = useState([])
  useEffect(() => {
    requests.getUser().then(res => {
      setUser(res.data)
    })
  }, [])
  useEffect(() => {
    if(user !== "" && user.userstuff.wishlist.length > 0) {
      let userWish = user.userstuff.wishlist;
      for(let i = 0; i < userWish.length;i ++) {
        requests.itemSearch(userWish[i].title, userWish[i].page)
        .then(res => setItem(prevItem => [...prevItem, res.data.Items[userWish[i].index]]))
      }
    }
  }, [user])
  function checkCart(title, page, index) {
    for(let i = 0; i < user.userstuff.cart.length; i++) {
      if(user.userstuff.cart[i].title === title && user.userstuff.cart[i].page === page && user.userstuff.cart[i].index === index) {
        return true
      }
    }
    return false
  }
  return(
    <div id="wishlistContainer">
      <h1>Your wishlist</h1>
      <br/>
      {item.length === 0 && <div>You have no items in your Wishlist try adding some so Santa can give you a present</div>}
      {item.length > 0 && item.map((x,y) => (
        <div class="wishlistDisplay">
          <img onClick={() => props.history.push(`/product/${user.userstuff.wishlist[y].title}/${user.userstuff.wishlist[y].page}/${user.userstuff.wishlist[y].index}`)} src={x.Item.mediumImageUrls[0].imageUrl} height="100" width="100" alt={x.Item.catchcopy}/>
          <span> <div onClick={() => props.history.push(`/product/${user.userstuff.wishlist[y].title}/${user.userstuff.wishlist[y].page}/${user.userstuff.wishlist[y].index}`)}>{x.Item.itemName}</div>
          <div class="wishlistAlignRight">¥{x.Item.itemPrice}</div>
          <div class="wishlistAlignRight" onClick={() => requests.wishDelete(user.userstuff.wishlist[y].title, user.userstuff.wishlist[y].page, user.userstuff.wishlist[y].index)}>Remove From Wishlist</div>
          {user !== "" && checkCart(user.userstuff.wishlist[y].title, user.userstuff.wishlist[y].page, user.userstuff.wishlist[y].index) === false && <div class="wishlistAlignRight" onClick={() => requests.itemCart(user.userstuff.wishlist[y].title, user.userstuff.wishlist[y].page, user.userstuff.wishlist[y].index)}>Add to Cart</div>}
          {user !== "" && checkCart(user.userstuff.wishlist[y].title, user.userstuff.wishlist[y].page, user.userstuff.wishlist[y].index) && <div class="wishlistAlignRight" onClick={() => requests.cartDelete(user.userstuff.wishlist[y].title, user.userstuff.wishlist[y].page, user.userstuff.wishlist[y].index )}>Remove From Cart</div>}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Wishlist
