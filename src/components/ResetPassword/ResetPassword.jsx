import React from 'react'
import {useFormik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {

    const navigate = useNavigate()



    const resetSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').matches( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Enter a correct email address'),
        newPassword: Yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W])[A-Za-z\d_\W]{8,}$/,'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character including underscore and be at least 8 characters long'),

    })



    async  function resetPass (values){
        try {
            let data= await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
            console.log(data)
            navigate('../login')
        }
        catch (e) {
            
        }

        
    }

    let formik = useFormik({
        initialValues:{
            email:'',
            newPassword:'',
        },
        onSubmit: resetPass,
        validationSchema:resetSchema,
    })
    return (
        <div className={' d-flex justify-content-center align-items-center vh-100'}>
            <form className={'w-75 shadow p-5'} onSubmit={formik.handleSubmit}>
                <h1 className={'text-success my-3'}>Reset Password</h1>
                <label>Email:</label>
                <input className={'form-control my-3'} type={'email'} onChange={formik.handleChange} name={'email'} id={'email'} value={formik.values.email} onBlur={formik.handleBlur} />
                {formik.errors.email && formik.touched.email?
                    <p className={'text-danger'}>{formik.errors.email}</p> : ''
                }
                <label>Password:</label>
                <input className={'form-control my-3'} type={'password'} onChange={formik.handleChange} name={'newPassword'} id={'newPassword'} value={formik.values.newPassword} onBlur={formik.handleBlur} />
                {formik.errors.newPassword && formik.touched.newPassword?
                    <p className={'text-danger'}>{formik.errors.newPassword}</p> : ''
                }
                <button type={"submit"} disabled={!(formik.isValid && formik.dirty)} className={'btn btn-success my-3'}>Reset Password</button>
            </form>
        </div>
    )
}
