import React from 'react'
import {useFormik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function ResetPassword() {

    const navigate = useNavigate()

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
        onSubmit: resetPass
    })
    return (
        <div className={' d-flex justify-content-center align-items-center vh-100'}>
            <form className={'w-75 shadow p-5'} onSubmit={formik.handleSubmit}>
                <label>Email:</label>
                <input className={'form-control'} type={'email'} onChange={formik.handleChange} name={'email'} id={'email'} value={formik.values.email} onBlur={formik.handleBlur} />
                <label>Password:</label>
                <input className={'form-control'} type={'password'} onChange={formik.handleChange} name={'newPassword'} id={'newPassword'} value={formik.values.password} onBlur={formik.handleBlur} />
                <button type={"submit"} className={'btn btn-success'}>Reset</button>
            </form>
        </div>
    )
}
