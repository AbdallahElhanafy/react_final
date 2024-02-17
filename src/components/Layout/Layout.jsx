import React, {useContext, useEffect} from 'react'
import Navbar from "../Navbar/Navbar";
import {Outlet} from "react-router-dom";
import {tokenContext} from "../context/tokenContext";

export default function Layout() {
    let {setToken} = useContext(tokenContext)
    useEffect(()=>{
        if (localStorage.getItem('userToken') !== null){
            setToken(localStorage.getItem('userToken'))
        }
    },[])
    return (
        <div>
            <Navbar/>
            <div className={'container'}>
                <Outlet/>
            </div>

        </div>

    )
}
