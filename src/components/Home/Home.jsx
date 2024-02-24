import React from 'react'
import Category from "../Category/Category";
import Products from "../Products/Products";
import HomeSlider from "../slider/slider";

export default function Home() {
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
