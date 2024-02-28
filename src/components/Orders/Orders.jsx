import React, {useContext, useEffect, useState} from 'react'
import {tokenContext} from "../context/tokenContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import data from "bootstrap/js/src/dom/data";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

export default function Orders() {


    const [orders,setOrders] = useState([])
    const [isLoading,setLoading] = useState(false)
    let {userToken} = useContext(tokenContext)


    async function getAllOrders () {
            const  decoded =  jwtDecode(userToken);
            console.log(decoded)

        try {
                setLoading(true)
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`)
            console.log(data)
            setOrders(data)
            setLoading(false)
        }
        catch (e) {
            console.log(e)
        }


    }

    useEffect(() => {
        if (userToken){
            getAllOrders()
        }
       
    }, [ userToken]);
    return (
        <div>
            {isLoading === true?
                <LoadingComponent/>
                :
                <div className={'row'}>

                    {orders.map((order,index)=>{
                        return <div className={'col-md-12 shadow my-5 p-4 '} key={index}>
                            <h3 className={'text-success'}>Order Number: {order.id} </h3>
                            <div className={'d-flex flex-column  '}>
                                <ul className={' my-3 border border-success  '}  >
                                    {order.cartItems.map((item)=>{
                                        return    <li className={'d-flex my-3 px-3 flex-row justify-content-between'}>
                                            <h5>{item.product.title} <span className={'px-2 text-success'}>
                                       x{item.count}
                                   </span> </h5>
                                            <h5> {item.price} EGP</h5>
                                        </li>
                                    })}
                                </ul>

                            </div>
                            <h3 className={'text-success'}>Order Total: {order.totalOrderPrice} EGP</h3>

                        </div>
                    })}
                </div>
            }
        </div>

    )
}
