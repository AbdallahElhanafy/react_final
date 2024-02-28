import React, {useContext, useEffect, useState} from 'react'
import {cartContext} from "../context/cartContext";
import {wishContext} from "../context/wishContext";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

export default function WishList() {


    const {addToCart,setCartNumber,cartNumber} = useContext(cartContext)
    const { addItem,removeItem,getWishList,wishList,setWishList} = useContext(wishContext)
    const [isLoading, setLoading] = useState(false)

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
            setLoading(true)
            let {data} =  await getWishList()
            console.log(data)
            setWishList(data.data)
            setLoading(false)

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

    useEffect(() => {
        getWish()
    }, []);


    return (
        <div className={''}>
            {isLoading !== true?
                <div className={'row gy-3'}>
                    {wishList.map((product) => {
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
