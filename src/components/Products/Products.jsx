import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import {cartContext} from "../context/cartContext";
import {toast} from "react-toastify";
import {wishContext} from "../context/wishContext";
import {tokenContext} from "../context/tokenContext";

export default function Products() {
    // const [productsList,setProducts] = useState([])


    const {userToken} = useContext(tokenContext)
    const {addToCart,setCartNumber,cartNumber} = useContext(cartContext)
    const { addItem,removeItem,getWishList,wishList,setWishList} = useContext(wishContext)

   async function getProducts() {
    return await    axios.get('https://route-ecommerce.onrender.com/api/v1/products')
    }

    let {data,isLoading} = useQuery('product',getProducts,)

   async function addToMyCart (id) {
        try {
            let {data} =  await addToCart(id)
            toast(data.message,{
                type: "success"
            } )
            setCartNumber(data.numOfCartItems)
        }
        catch (e) {
            toast(e,{
                type: "success"
            } )
        }



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
        getWish()
    })



    return (
        <div className={''}>
            {isLoading !== true?
                <div className={'row gy-3'}>
                    {data.data.data.map((product) => {
                        return <div className={'col-md-3  '} key={product._id}>

                            <div className={'product h-100 p-5 d-flex justify-content-between flex-column  '}>
                                <Link className={'text-decoration-none'} to={`/details/${product._id}`}>
                                    <img src={product.imageCover} className={'w-100 '} alt={product.title}/>
                                    <p className={''}>{product.category.name}</p>
                                    <h6 className={'text-main '}>{product.title}</h6>
                                    <div className={'d-flex my-3 justify-content-between  w-100'}>
                                        <p>{product.price} EGP</p>
                                        <p className={''}>
                                            {product.ratingsAverage}
                                            <i className={'fa-solid fa-star'}></i>
                                        </p>
                                    </div>

                                </Link>

                                <div className={'w-100 d-flex flex-column'}>
                                    { isProductInWishlist(wishList,product._id) === true?

                                        <button onClick={()=>{
                                            removeFromWishList(product._id)
                                        }} className={'btn border-danger '}>
                                            <i  className="fa-solid fa-heart text-danger"></i>
                                        </button>
                                        :
                                        <button onClick={()=>{
                                            addToWishList(product._id)
                                        }} className={'btn border border-black '}>
                                            <i  className="fa-solid fa-heart text-black"></i>
                                        </button>
                                    }
                                    <button onClick={()=>{
                                        addToMyCart(product._id)
                                    }} className={'btn btn-success  my-2 w-100'}>Add to Cart</button>



                                </div>


                            </div>

                        </div>
                    })}
                </div>
                :
                <LoadingComponent/>

            }
        </div>
    )
}
