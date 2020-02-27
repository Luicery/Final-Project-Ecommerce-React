import axios from "axios"
let token = "Bearer " + localStorage.getItem("jwt")
  export default {
    googleTranslate(message) {
      return axios.post("https://translation.googleapis.com/language/translate/v2?key=AIzaSyDZ-4uYcjHRxen6QD7ocjD1h65-q6i0Si8", {
        "q": [message],
        "target": "en"
      })
    },
    exchangeRate(amount) {
      axios.get("https://api.exchangeratesapi.io/latest?base=JPY")
    },
    mostPopular(page = 1) {
      return axios({
        "method":"GET",
        "url":"https://rakuten_webservice-rakuten-marketplace-item-ranking-v1.p.rapidapi.com/services/api/IchibaItem/Ranking/20170628",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"rakuten_webservice-rakuten-marketplace-item-ranking-v1.p.rapidapi.com",
        "x-rapidapi-key":"12b348c216msh72dd312a708b941p1185aajsn48b43c3c7d6a"
        },"params":{
        "page":page.toString()
        }
      })
    },
    itemSearch(item, page = 1){
      return axios({
        "method":"GET",
        "url":"https://rakuten_webservice-rakuten-marketplace-item-search-v1.p.rapidapi.com/IchibaItem/Search/20170706",
        "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"rakuten_webservice-rakuten-marketplace-item-search-v1.p.rapidapi.com",
          "x-rapidapi-key":"12b348c216msh72dd312a708b941p1185aajsn48b43c3c7d6a"
        },"params":{
          "page":page.toString(),
          "keyword":item,
          "format":"JSON",
          "field":"1",
          "sort":"standard"
        }
      })
    },
    genreSearch(genreId = 0) {
      return axios({
        "method":"GET",
        "url":"https://rakuten_webservice-rakuten-marketplace-genre-search-v1.p.rapidapi.com/services/api/IchibaGenre/Search/20120723",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"rakuten_webservice-rakuten-marketplace-genre-search-v1.p.rapidapi.com",
        "x-rapidapi-key":"12b348c216msh72dd312a708b941p1185aajsn48b43c3c7d6a"
        },"params":{
        "genreId":genreId
        }
      })
    },
    getUser() {
      return axios.get("https://final-project-rails.herokuapp.com/profile", { params:{}, headers: { 'Authorization': token } })
    },
    itemCart(title, page, index) {
      return axios.post("https://final-project-rails.herokuapp.com/itemcart", {title: title, page:page, index:index}, {headers:{"Authorization": "Bearer " + localStorage.getItem("jwt")}})
    },
    itemWish(title, page, index) {
      return axios.post("https://final-project-rails.herokuapp.com/itemwish", {title: title, page:page, index:index}, {headers:{"Authorization": "Bearer " + localStorage.getItem("jwt")}})
    },
    wishDelete(title, page, index) {
      return axios.post("https://final-project-rails.herokuapp.com/itemwishdelete", {title: title, page:page, index:index}, {headers:{"Authorization": "Bearer " + localStorage.getItem("jwt")}})
    },
    cartDelete(title, page, index) {
      return axios.post("https://final-project-rails.herokuapp.com/itemcartdelete", {title: title, page:page, index:index}, {headers:{"Authorization": "Bearer " + localStorage.getItem("jwt")}})
    },
    cartEmpty() {
      return axios.post("https://final-project-rails.herokuapp.com/emptycart", {}, {headers:{"Authorization": "Bearer " + localStorage.getItem("jwt")}})
    }
  }
