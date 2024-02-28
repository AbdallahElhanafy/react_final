import {createContext, useContext, useState} from "react";
import axios from "axios";
import {tokenContext} from "./tokenContext";


export let cartContext = createContext()

export default function CartProvider (props) {


    const [cartNumber , setCartNumber] = useState(0)


    function getHeader() {
        return { token: localStorage.getItem('userToken') };
    }
    let baseURL = 'https://route-ecommerce.onrender.com'

    function addToCart (id) {

       return axios.post(`${baseURL}/api/v1/cart`, {
            productId: id
        }, {
            headers: getHeader()
        });

    }

    function deleteCartItem(id) {
        return axios.delete(`${baseURL}/api/v1/cart/${id}`, {
            headers: getHeader()
        })
    }

    function updateProductCount(id,count) {
        return axios.put(`${baseURL}/api/v1/cart/${id}`, {
            count: count
        }, {
            headers: getHeader()
        })
    }

    function getCart () {
        return axios.get(`${baseURL}/api/v1/cart`,  {
            headers: getHeader()
        });

    }

    function clearCart(){
        return axios.delete(`${baseURL}/api/v1/cart`,  {
            headers:getHeader()
        });
    }

    function checkOut(cartID,values) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=https://react-final-smoky.vercel.app`, {
            shippingAddress:values,
        }, {
            headers: getHeader()
        })
    }

    return <cartContext.Provider value={{addToCart,setCartNumber,cartNumber,checkOut,getCart,clearCart, deleteCartItem,updateProductCount}}>
        {props.children}
        </cartContext.Provider>
}