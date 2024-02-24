import React, {useContext, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {tokenContext} from "../context/tokenContext";
import {cartContext} from "../context/cartContext";

export default function Navbar() {
    const {userToken,setToken} = useContext(tokenContext)

    const {cartNumber,setCartNumber,getCart} = useContext(cartContext)


    useEffect(()=>{
        (async ()=>{

            if (localStorage.getItem('userToken') !== null){

                let data= await getCart()
                console.log(data)
                if(data.data.status==='success'){
                    console.log(data)
                    setCartNumber(data.data.numOfCartItems)
                }
                else {
                    setCartNumber(0)
                }
            }



        })()
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