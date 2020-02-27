import React, {useState, useEffect} from "react"
import requests from "../lib/requests"
import axios from "axios"
function Purchase(props) {
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
  useEffect(() => {
    if(item.length > 0) {
      for(let i = 0; i < item.length; i++) {
        setTotal(total + item[i].Item.itemPrice)
      }
    }
  }, [item])
  return(
    <div id="purchaseContainer">
      {item.length === 0 && <div>There's nothing to Purchase</div>}
      {item.length > 0 && item.map((x,y) => (
        <div class="purchaseDisplay">
          <img src={x.Item.mediumImageUrls[0].imageUrl} height="100" width="100" alt={x.Item.catchcopy}></img>
          <span>
            <div class="purchaseRightAlign">{x.Item.itemName}</div><br/>
            <div class="purchaseRightAlign">¥{x.Item.itemPrice}</div>
          </span>
        </div>
      ))}
      <form id="purchaseForm">
        <input placeholder="Full Name"></input><br/>
        <input placeholder="Address"></input><br/>
        <input placeholder="PostCode"></input><br/>
        <input placeholder="Phone"></input><br/><br/>
        <div>Total: ¥{total}</div>
        {total !== 0 && <input id="purchaseSubmit" type="submit" value="Fake Purchase Confirmation" onClick={() => {
          requests.cartEmpty()
        }}></input>}
      </form>
    </div>
  )
}
export default Purchase
