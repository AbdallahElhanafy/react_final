import React from 'react'
import {Link} from "react-router-dom";

export default function Navbar() {
    return (

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand" to={'home'}>
                        <i className={'fa-solid fa-shopping-cart'}></i>
                        Fresh Cart
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ">
                            <Link className="nav-link active" aria-current="page" to={'home'}>Home</Link>
                            <Link className="nav-link" aria-current="page" to={'products'}>Products</Link>
                            <Link className="nav-link" aria-current="page" to={'categories'}>Categories</Link>
                            <Link className="nav-link" aria-current="page" to={'brands'}>Brands</Link>
                            <Link className="nav-link" aria-current="page" to={'cart'}>Cart</Link>
                        </div>
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link active" aria-current="page" to={'register'}>Register</Link>
                            <Link className="nav-link" aria-current="page" to={'login'}>Login</Link>
                            <Link className="nav-link" aria-current="page" to={'home'}>Logout</Link>

                        </div>
                    </div>
                </div>
            </nav>



    )
}
