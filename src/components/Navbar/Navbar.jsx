import React, {useContext, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {tokenContext} from "../context/tokenContext";
import {cartContext} from "../context/cartContext";
import {wishContext} from "../context/wishContext";

export default function Navbar() {
    const {userToken,setToken} = useContext(tokenContext)
    const {getWishList,wishList,setWishList} = useContext(wishContext)
    const {cartNumber,setCartNumber,getCart} = useContext(cartContext)


    async function getCartNumber () {
        try {
           let data = await getCart()
            setCartNumber(data.data.numOfCartItems)
        }

        catch (e) {
            setCartNumber(0)
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


    useEffect(()=>{
        getCartNumber()
        getWish()
    },[])


    function logout () {
        localStorage.removeItem('userToken')
        setToken(null)
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to={'home'}>
                    <i className={'fa-solid fa-shopping-cart text-success mx-2'}></i>
                    Fresh Cart
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                    {userToken !== null?
                        <div className="navbar-nav ">
                            <Link className="nav-link active" aria-current="page" to={'home'}>Home</Link>
                            <Link className="nav-link" aria-current="page" to={'products'}>Products</Link>
                            <Link className="nav-link" aria-current="page" to={'categories'}>Categories</Link>
                            <Link className="nav-link" aria-current="page" to={'brands'}>Brands</Link>
                            <Link className="nav-link" aria-current="page" to={'cart'}>Cart</Link>
                            <Link className="nav-link" aria-current="page" to={'allorders'}>Orders</Link>
                            <Link className="nav-link" aria-current="page" to={'wishlist'}>WishList</Link>
                        </div>

                    : ''
                    }


                    {userToken === null?
                        <div className={' navbar-nav ms-auto'}>
                            <Link className="nav-link active" aria-current="page" to={'register'}>Register</Link>
                            <Link className="nav-link" aria-current="page" to={'login'}>Login</Link>

                        </div>
                        :  <div  className={' navbar-nav ms-auto d-flex flex-row align-items-center'}>
                            <Link to={'/cart'} className={'fa-solid fa-shopping-cart text-success'}>
                                <span>{cartNumber}</span>
                            </Link>
                            <Link onClick={()=>{
                                logout()
                            }} className="nav-link" aria-current="page" to={'login'}>Logout</Link>
                        </div>
                    }

                </div>
            </div>
        </nav>
    )
}