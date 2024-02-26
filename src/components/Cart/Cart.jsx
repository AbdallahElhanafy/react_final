import React, {useContext, useEffect, useState} from 'react'
import {cartContext} from "../context/cartContext";
import axios from "axios";
import {toast} from "react-toastify";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

export default function Cart() {

   let {getCart,deleteCartItem,setCartNumber,updateProductCount,clearCart} = useContext(cartContext)
    let [cartData, setCartData ] = useState([])
    let [cartPrice, setCartPrice ] = useState(0)
    let [isLoading,setLoading] = useState(false)

   async function deleteItem (itemID) {

       let data = await deleteCartItem(itemID)
       console.log(data)
       setCartData(data.data.data.products)
       setCartPrice(data.data.data.totalCartPrice)
       setCartNumber(data.data.numOfCartItems)

       toast('Item deleted successfully!',{
           type: "success"
       })
    }

    async function emptyCart () {
         await clearCart()
        setCartData([])
        setCartPrice(0)
        setCartNumber(0)
    }

    async function updateCount(itemID,count){

       let data = await updateProductCount(itemID,count)
        setCartData(data.data.data.products)
        setCartPrice(data.data.data.totalCartPrice)

        toast('Item updated successfully!',{
            type: "success"
        })

    }


    useEffect(()=>{
        (async ()=>{
            setLoading(true)
            try {
                let data= await getCart()
                console.log(data)
                    setCartData(data.data.data.products)
                    setCartPrice(data.data.data.totalCartPrice)
                    setLoading(false)

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log('No cart found for the user');
                    setCartData([])
                    setCartPrice(0)
                    setCartNumber(0)
                    setLoading(false)
                } else {

                    setCartData([])
                    setCartPrice(0)
                    setCartNumber(0)
                    setLoading(false)
                }
            }
        })()
    },[])
    return (
        <div className={'container'}>
            <h1 className={'text-success my-3'}>Shopping Cart</h1>
            <div className={'row'}>
                {isLoading === true?

                    <LoadingComponent/>

                    :

                <div className={'col-md-11 bg-opacity-50 shadow p-5'}>
                    <div className={'d-flex justify-content-between'}>
                        <h4>Total Price <span className={'text-success'}>{cartPrice} EGP</span></h4>
                        <button onClick={emptyCart} className={'btn btn-danger'}>Clear Cart</button>
                    </div>

                    {cartData.map((product)=>{
                     return <div className={'row border-bottom py-5'} key={product.product._id}>
                         <div className={'col-md-2'}>
                            <img alt={'image'} className={'w-100'} src={product.product.imageCover}/>
                         </div>
                         <div className={'col-md-10 d-flex justify-content-between align-items-center'}>
                             <div>
                                 <h5>{product.product.title}</h5>
                                 <p>{product.price} EGP</p>
                                 <button onClick={()=>{
                                     deleteItem(product.product._id)
                                 }} className={'btn btn-outline-danger'}>
                                     <i className={'fa-regular fa-trash-can'}></i>
                                 </button>
                             </div>
                             <div>
                                 <button onClick={()=>{

                                     updateCount(product.product.id,(--product.count))
                                 }}  className={'btn btn-outline-success '}>
                                     -
                                 </button>
                                 <span className={'mx-2'}>{product.count} </span>
                                 <button onClick={()=>{
                                     updateCount(product.product.id,(++product.count))

                                 }} className={'btn btn-outline-success '}>

                                     +
                                 </button>
                             </div>


                         </div>

                     </div>
                    })}

                </div>
                }

            </div>


        </div>
    )
}
