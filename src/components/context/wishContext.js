import {createContext, useState} from "react";
import axios from "axios";

export let wishContext = createContext()

export default function WishListProvider(props){

    let baseURL = 'https://route-ecommerce.onrender.com'
    let header =  {token:localStorage.getItem('userToken')}
    let [wishList, setWishList] = useState([])

    function addItem (productID){

     return    axios.post(`${baseURL}/api/v1/wishlist`, {
            productId:productID
        },{
            headers:header
        })
    }

    function removeItem(productID){
       return  axios.delete(`${baseURL}/api/v1/wishlist/${productID}`,{
            headers:header
        })
    }

    function getWishList(){
        return axios.get(`${baseURL}/api/v1/wishlist`, {
            headers: header
        })
    }



    return <wishContext.Provider value={{addItem,removeItem,getWishList,wishList,setWishList}}>

        {props.children}
    </wishContext.Provider>
}