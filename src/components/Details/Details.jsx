import React, {useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import {useQuery} from "react-query";
import data from "bootstrap/js/src/dom/data";
import {cartContext} from "../context/cartContext";
import {toast} from "react-toastify";

export default function Details() {

    let params=useParams()
    const [product, setProduct] = useState()
    const {addToCart,setCartNumber} = useContext(cartContext)

   async function getProduct () {
      let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${params.item}`, )
       setProduct(data)
    }

    async function addToMyCart (id) {
        let {data} =  await addToCart(id)

        if(data.status=== 'success'){
            toast(data.message,{
                type: "success"
            } )
        }
        setCartNumber(data.numOfCartItems)
    }


    useEffect(()=>{
        getProduct()
    },[])





    return (
        <div className={'container   '}>
            <div className={'row vh-100 d-flex justify-content-start align-items-center '}>
                <div className={'col-md-4'}>
                    <img className={'w-100'} alt={'image'} src={product?.data.imageCover}/>
                </div>
                <div className={'col-md-8 h-100 d-flex justify-content-center flex-column'}>
                    <div className={'d-flex my-4  flex-column '}>

                        <h1 className={'text-success'}>
                            {product?.data.title}
                        </h1>
                        <h3>
                            {product?.data.category.name}
                        </h3>

                    </div>
                    <div>
                        <h4 className={'text-danger'}>
                            {product?.data.price} EGP
                        </h4>
                        <button onClick={()=>{
                            addToMyCart(product?.data._id)
                        }} className={'btn btn-success w-100  jus'}>Add to cart</button>
                    </div>

                </div>

            </div>


        </div>
    )
}
