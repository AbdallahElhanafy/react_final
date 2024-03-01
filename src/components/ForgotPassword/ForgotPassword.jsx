import React, {useState} from 'react'
import {useFormik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function ForgotPassword() {

    const navigate = useNavigate()

    const [isCooldown, setIsCooldown] = useState(false);

    async function sendCode (values){
        try {
            setIsCooldown(true);
            let data = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
                values
            )
            console.log(data)
            toast('Code Sent to your Email!', {
                type:'success'
            })
            setTimeout(() => setIsCooldown(false), 30000);
        }

        catch (e) {
            toast('Error ', {
                type:'error'
            })
            setIsCooldown(false);
        }
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

            <div className={'d-flex flex-column justify-content-center align-items-center vh-100 '}>

                <div className={' shadow w-75 my-3 py-3  mx-auto my-5'} >
            <form onSubmit={sendCodeForm.handleSubmit} className={'my-3 p-3 '}>
                <h3 className={'text-success my-3'}>Forgot password:</h3>
                <label>Email</label>
                <input onBlur={sendCodeForm.handleBlur} onChange={sendCodeForm.handleChange} value={sendCodeForm.values.email} className={'form-control'} id={'email'} type={"email"}/>
                <button type={"submit"} className={'btn btn-success my-3'} disabled={isCooldown}>Send Code</button>

                </form>

                <form onSubmit={verifyCodeForm.handleSubmit} className={'my-3 p-3  '}>
                    <h3 className={'text-success my-3'}> Verify Code</h3>
                 <label>Enter Verify Code</label>
                <input className={'form-control'} onBlur={verifyCodeForm.handleBlur} onChange={verifyCodeForm.handleChange} id={'resetCode'} name={'resetCode'} type={'text'} value={verifyCodeForm.values.resetCode}/>
                <button type={'submit'} disabled={!(verifyCodeForm.isValid && verifyCodeForm.dirty)} className={'btn btn-success my-3'}>Verify Code</button>

            </form>
        </div>

        </div>
    )
}
