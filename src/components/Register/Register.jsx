import React, {useContext, useState} from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {tokenContext} from "../context/tokenContext";
import {toast} from "react-toastify";

export default function Register() {
    let navigate = useNavigate();
    let [isLoading, setLoading] = useState(false);
    let [errMessage, setErr] = useState(null);
    const {setToken, userToken} = useContext(tokenContext)

    const signUpSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Minimum length is 3').max(15,'max length is 15').required('Name is required'),
        email: Yup.string().required('Email is required').matches( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Enter a correct email address'),
        phone: Yup.string().required('Phone is required').matches(/^(010|011|012|015)\d{8}$/,'Enter a correct phone number'),
        password: Yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W])[A-Za-z\d_\W]{8,}$/,'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character including underscore and be at least 8 characters long'),
        rePassword: Yup.string().oneOf([
            Yup.ref('password')
        ], 'Passwords are not matching').required('Re-password is required')

    })

  async  function signUp (values)  {
        setLoading(false);
        try{
            const {data} =   await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
            setLoading(true)
            navigate('/home')
            localStorage.setItem('userToken',data.token)
            setToken(data.token)
            toast('Account Created',{
                type: 'success'
            })
        }
        catch (error) {
            if (error.response.status === 409){
                toast(error.response.data.message,{
                    type: 'error'
                })
            }
        }




    }

    const formik = useFormik(
        {
            initialValues: {
                name:'',
                email: '' ,
                phone: '',
                password: '',
                rePassword:'',
            },
            validationSchema: signUpSchema,
            onSubmit:signUp

        }
    )



    return (
        <div >
            <form onSubmit={formik.handleSubmit} className={'vh-100 d-flex justify-content-center align-items-center'}>
                <div className={'row text-start w-50 bg-light shadow p-4 gy-3'}>
                    <h1 className={'text-success'}>Create an Account</h1>
                    <div className={'col-md-12'}>
                        <label  htmlFor={'userName'}>Name</label>
                        <input onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} name={'name'} type={'text'} id={'userName'} className={'form-control'}/>
                        {formik.errors.name && formik.touched.name?
                            <p className={'text-danger'}>{formik.errors.name}</p> : ''
                        }
                    </div>
                    <div className={'col-md-12'}>
                        <label  htmlFor={'userEmail'}>email</label>
                        <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} name={'email'} type={'email'} id={'userEmail'} className={'form-control'}/>
                        {formik.errors.email && formik.touched.email?
                            <p className={'text-danger'}>{formik.errors.email}</p> : ''
                        }
                    </div>
                    <div className={'col-md-12'}>
                        <label  htmlFor={'userPhone'}>Phone</label>
                        <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} name={'phone'} type={'text'} id={'userPhone'} className={'form-control'}/>
                        {formik.errors.phone && formik.touched.phone?
                            <p className={'text-danger'}>{formik.errors.phone}</p> : ''
                        }
                    </div>
                    <div className={'col-md-12'}>
                        <label  htmlFor={'userPassword'}>Password</label>
                        <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} name={'password'} type={'password'} id={'userPassword'} className={'form-control'}/>
                        {formik.errors.password && formik.touched.password?
                            <p className={'text-danger'}>{formik.errors.password}</p> : ''
                        }
                    </div>
                    <div className={'col-md-12'}>
                        <label  htmlFor={'rePassword'}>Re-Password</label>
                        <input onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} name={'rePassword'} type={'password'} id={'rePassword'} className={'form-control'}/>
                        {formik.errors.rePassword && formik.touched.rePassword?
                            <p className={'text-danger'}>{formik.errors.rePassword}</p> : ''
                        }
                    </div>
                    <div className={'col-md-12'}>
                        <button  disabled={!(formik.isValid && formik.dirty)} onBlur={formik.handleBlur} type={'submit'} className={'btn btn-primary'}>Submit</button>

                    </div>


                    <div className={'col-md-12'}>
                        {!errMessage === null ?
                        <p className={'text-danger'}>{errMessage}</p> : ''
                        }
                    </div>
                </div>

            </form>


        </div>
    )
}
