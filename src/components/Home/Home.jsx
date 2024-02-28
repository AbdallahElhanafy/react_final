import React, {useContext, useEffect} from 'react'
import Category from "../Category/Category";
import Products from "../Products/Products";
import HomeSlider from "../slider/slider";
import {tokenContext} from "../context/tokenContext";

export default function Home() {
    const {userToken,setToken} = useContext(tokenContext)

    useEffect(() => {
        setToken(localStorage.getItem('userToken'))
    }, []);
    return (
        <div>
            <HomeSlider/>
            <h2>Categories</h2>
            <Category/>
            <h2>Products</h2>
            <Products/>
        </div>
    )
}
