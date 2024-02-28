import React, {useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import {cartContext} from "../context/cartContext";
import {toast} from "react-toastify";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import {wishContext} from "../context/wishContext";

export default function Details() {

    let params=useParams()
    const [product, setProduct] = useState()
    const {addToCart,setCartNumber} = useContext(cartContext)
    const [isLoading, setLoading] = useState(false)
    const { addItem,removeItem,getWishList,wishList,setWishList} = useContext(wishContext)


    async function getProduct () {
        setLoading(true)
      let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${params.item}`, )
       setProduct(data)
       setLoading(false)
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
    async function getWish(){
        try {

            let {data} =  await getWishList()
            console.log(data)
            setWishList(data.data)

        }
        catch (e) {
            console.log(e)
            setWishList([])

        }

    }

    async function addToWishList (id){
        try {
            let data = await addItem(id)
            console.log(data)
            getWish()
            toast('Product Added to WishList!', {
                type:'success'
            })
        }
        catch (e) {
            console.log(e)
            toast('An error occurred. Please try again!', {
                type:'error'
            })
        }

    }

    async function removeFromWishList (id){
        try{
            let {data} = await removeItem(id)
            console.log(data)
            getWish()
            toast('Product Removed from WishList!', {
                type:'success'
            })

        }
        catch (e) {
            console.log(e)
            toast('An error occurred. Please try again!', {
                type:'error'
            })
        }
    }

    function isProductInWishlist(wishlist, id) {
        return wishlist.some(product => product._id === id);
    }


    useEffect(()=>{
        getProduct()
    },[])





    return (
        <div className={'container   '}>
            {isLoading === true ?

                <LoadingComponent/>

                :
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
                            <div className={'d-flex justify-content-between align-items-center'}>
                                <h4 className={'text-danger'}>
                                    {product?.data.price} EGP
                                </h4>

                                { isProductInWishlist(wishList,product?.data._id) === true?

                                    <button onClick={()=>{
                                        removeFromWishList(product?.data._id)
                                    }} className={'btn border-danger fs-5 '}>
                                        <i  className="fa-solid fa-heart text-danger"></i>
                                    </button>
                                    :
                                    <button onClick={()=>{
                                        addToWishList(product?.data._id)
                                    }} className={'btn border border-black fs-5'}>
                                        <i  className="fa-solid fa-heart text-black"></i>
                                    </button>


                                }

                            </div>

                            <button onClick={()=>{
                                addToMyCart(product?.data._id)
                            }} className={'btn btn-success w-100  my-3'}>Add to cart</button>


                        </div>

                    </div>

                </div>

            }
           


        </div>
    )
}
