import React, {useContext} from 'react'
import {useFormik} from "formik";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {cartContext} from "../context/cartContext";
import {toast} from "react-toastify";
import {tokenContext} from "../context/tokenContext";



export default function Checkout() {

    const params = useParams()
    const {checkOut} = useContext(cartContext)


    const formik = useFormik({
        initialValues: {
                details: '',
                phone:'',
                city:'',
        },
        onSubmit:checkoutSession


    })
    async function checkoutSession (values){
        try {
            let {data}= await  checkOut(params.cart,values)
            console.log(data)
            window.location = data.session.url

        }

        catch (e) {
            console.log(e)
            toast('An error occurred', {
                type:'error'
            })
        }



    }

    return (
        <div className={'vh-100'}>

            <form onSubmit={formik.handleSubmit} className={'h-100 d-flex flex-column justify-content-center '}>

                <label htmlFor={'#details'}>Details</label>
                <input onBlur={formik.handleBlur} value={formik.values.details} onChange={formik.handleChange} id={'details'} className={'form-control'} type={'text'}/>
                <label htmlFor={'#phone'}>Phone</label>
                <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} id={'phone'} className={'form-control'} type={'tel'}/>
                <label htmlFor={'#city'}>City</label>
                <input onBlur={formik.handleBlur} value={formik.values.city} onChange={formik.handleChange} id={'city'} className={'form-control'} type={'text'}/>
                <button  type={"submit"} className={'btn btn-success'}>Submit</button>

            </form>

        </div>
    )
}
