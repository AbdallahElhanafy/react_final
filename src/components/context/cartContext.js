import {createContext, useState} from "react";
import axios from "axios";


export let cartContext = createContext()

export default function CartProvider (props) {


    const [cartNumber , setCartNumber] = useState(0)



    let baseURL = 'https://route-ecommerce.onrender.com'
    let header =  {token:localStorage.getItem('userToken')}
    console.log(header)

    function addToCart (id) {
       return axios.post(`${baseURL}/api/v1/cart`, {
            productId: id
        }, {
            headers: header
        });

    }

    function deleteCartItem(id) {
        return axios.delete(`${baseURL}/api/v1/cart/${id}`, {
            headers: header
        })
    }

    function updateProductCount(id,count) {
        return axios.put(`${baseURL}/api/v1/cart/${id}`, {
            count: count
        }, {
            headers: header
        })
    }

    function getCart () {
        return axios.get(`${baseURL}/api/v1/cart`,  {
            headers: header
        });

    }

    function clearCart(){
        return axios.delete(`${baseURL}/api/v1/cart`,  {
            headers: header
        });
    }

    return <cartContext.Provider value={{addToCart,setCartNumber,cartNumber,getCart,clearCart, deleteCartItem,updateProductCount}}>
        {props.children}
        </cartContext.Provider>
}