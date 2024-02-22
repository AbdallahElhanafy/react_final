import React, {useContext, useEffect, useState} from 'react'
import {cartContext} from "../context/cartContext";

export default function Cart() {

   let {getCart} = useContext(cartContext)
    let [cartData, setCartData ] = useState([])
    let [cartPrice, setCartPrice ] = useState(0)


    useEffect(()=>{
        (async ()=>{
           let data= await getCart()
            console.log(data)
            setCartData(data.data.data.products)
            setCartPrice(data.data.data.totalCartPrice)
            console.log(cartPrice)
        })()
    },[])
    return (
        <div className={'container'}>
            <h1 className={'text-success my-3'}>Shopping Cart</h1>
            <div className={'row'}>
                <div className={'col-md-11 bg-opacity-50 shadow p-5'}>
                    <p>Total Price <span className={'text-success'}>{cartPrice} EGP</span></p>
                    {cartData.map((product)=>{
                     return <div className={'row border-bottom py-5'} key={product.product._id}>
                         <div className={'col-md-2'}>
                            <img alt={'image'} className={'w-100'} src={product.product.imageCover}/>
                         </div>
                         <div className={'col-md-10 d-flex justify-content-between align-items-center'}>
                             <div>
                                 <h5>{product.product.title}</h5>
                                 <p>{product.price} EGP</p>
                                 <button className={'btn btn-outline-danger'}>
                                     <i className={'fa-regular fa-trash-can'}></i>
                                 </button>
                             </div>
                             <div>
                                 <button className={'btn btn-outline-success '}>
                                     -
                                 </button>
                                 <span className={'mx-2'}>{product.count} </span>
                                 <button className={'btn btn-outline-success '}>

                                     +
                                 </button>
                             </div>


                         </div>

                     </div>
                    })}

                </div>

            </div>


        </div>
    )
}
