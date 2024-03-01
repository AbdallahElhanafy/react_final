import React, {useContext} from 'react'
import {useFormik} from "formik";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {cartContext} from "../context/cartContext";
import {toast} from "react-toastify";
import {tokenContext} from "../context/tokenContext";
import * as Yup from "yup";



export default function Checkout() {

    const params = useParams()
    const {checkOut} = useContext(cartContext)


    const checkoutSchema = Yup.object().shape({
        details: Yup.string().required('Details is required'),
        phone: Yup.string().required('Phone is required').matches(/^(010|011|012|015)\d{8}$/,'Enter a correct phone number'),
        city: Yup.string().required('City is required'),
    })


    const formik = useFormik({
        initialValues: {
                details: '',
                phone:'',
                city:'',
        },
        onSubmit:checkoutSession,
        validationSchema: checkoutSchema,


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
        <div className={'vh-100 d-flex flex-column align-items-center justify-content-center'}>

            <form onSubmit={formik.handleSubmit} className={' shadow my-3 p-3  w-75'}>
                <h1 className={'text-success my-3'}>Checkout</h1>
                <label htmlFor={'#details'}>Details</label>
                <input onBlur={formik.handleBlur} value={formik.values.details} onChange={formik.handleChange} id={'details'} className={'form-control my-3'} type={'text'}/>
                {formik.errors.details && formik.touched.details?
                    <p className={'text-danger'}>{formik.errors.details}</p> : ''
                }
                <label htmlFor={'#phone'}>Phone</label>
                <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} id={'phone'} className={'form-control my-3'} type={'tel'}/>
                {formik.errors.phone && formik.touched.phone?
                    <p className={'text-danger'}>{formik.errors.phone}</p> : ''
                }
                <label htmlFor={'#city'}>City</label>
                <input onBlur={formik.handleBlur} value={formik.values.city} onChange={formik.handleChange} id={'city'} className={'form-control my-3'} type={'text'}/>
                {formik.errors.city && formik.touched.city?
                    <p className={'text-danger'}>{formik.errors.city}</p> : ''
                }
                <button  type={"submit"} disabled={!(formik.isValid && formik.dirty)} className={'btn btn-success'}>Submit</button>

            </form>

        </div>
    )
}
