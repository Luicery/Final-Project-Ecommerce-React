import React, {useState, useEffect} from "react"
import requests from "../lib/requests"

function Cart(props) {
  const [user, setUser] = useState("")
  const [item, setItem] = useState([])
  const [total, setTotal] = useState(0)
  useEffect(() => {
    requests.getUser().then(res => {
      setUser(res.data)
    })
  }, [])
  useEffect(() => {
    if(user !== "" && user.userstuff.cart.length > 0) {
      let userWish = user.userstuff.cart;
      for(let i = 0; i < userWish.length;i ++) {
        requests.itemSearch(userWish[i].title, userWish[i].page)
        .then(res => setItem(prevItem => [...prevItem, res.data.Items[userWish[i].index]]))
      }
    }
  }, [user])
  return(
    <div id="cartContainer">
      <h1>Your current cart</h1>
      {item.length === 0 && <div>Theres nothing in your cart get shopping</div>}
      {item.length > 0 && item.map((x,y) => (
        <div class="cartDisplay">
          <img onClick={() => props.history.push(`/product/${user.userstuff.cart[y].title}/${user.userstuff.cart[y].page}/${user.userstuff.cart[y].index}`)} src={x.Item.mediumImageUrls[0].imageUrl} height="100" width="100" alt={x.Item.catchcopy}></img>
          <span onClick={() => props.history.push(`/product/${user.userstuff.cart[y].title}/${user.userstuff.cart[y].page}/${user.userstuff.cart[y].index}`)}>{x.Item.itemName}<br/>
          <div class="cartRightAlign">¥{x.Item.itemPrice}</div>
          {user !== "" && <div class="cartRightAlign" onClick={() => requests.cartDelete(user.userstuff.cart[y].title, user.userstuff.cart[y].page, user.userstuff.cart[y].index)}>Remove From Cart</div>}
          </span>
        </div>
      ))}
      {item.length > 0 && <input id="confirmPurchase" type="submit" value="Confirm Purchase" onClick={() => props.history.push(`/purchase`)}></input>}
    </div>
  )
}

export default Cart
