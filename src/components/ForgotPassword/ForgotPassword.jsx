import React from 'react'
import {useFormik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function ForgotPassword() {

    const navigate = useNavigate()

 async   function sendCode (values){
        let data = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
            values
        )
     console.log(data)
    }


    async function verifyCode(values){
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
        console.log(data)
        if (data.status === 'Success'){
            navigate('../reset')
        }
    }

    let sendCodeForm = useFormik({
        initialValues:{
            email: ''
        },
        onSubmit:sendCode
    })


    let verifyCodeForm = useFormik({
        initialValues:{
            resetCode:''
        },
        onSubmit: verifyCode
    })


    return (
        <div >
            <h3>Forgot password:</h3>
            <form onSubmit={sendCodeForm.handleSubmit} className={'w-75 mx-auto my-5'}>
                <label>Email</label>
                <input onBlur={sendCodeForm.handleBlur} onChange={sendCodeForm.handleChange} value={sendCodeForm.values.email} className={'form-control'} id={'email'} type={"email"}/>
                <button type={"submit"} className={'btn btn-success'}>Send Code</button>
            </form>

            <h4> Verify Code</h4>
            <form onSubmit={verifyCodeForm.handleSubmit}>
            <label>Enter Verify Code</label>
                <input className={'form-control'} onBlur={verifyCodeForm.handleBlur} onChange={verifyCodeForm.handleChange} id={'resetCode'} name={'resetCode'} type={'text'} value={verifyCodeForm.values.resetCode}/>
                <button type={'submit'} className={'btn btn-success'}>Verify Code</button>
            </form>

        </div>
    )
}
