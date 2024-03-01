import React, {useContext} from 'react'
import  "formik";
import {useFormik} from "formik";
import axios from "axios";
import {tokenContext} from "../context/tokenContext";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";



export default function Login() {
    let {setToken} = useContext(tokenContext)
    const navigate = useNavigate()

     async function login (values){

        try {
            let {data} =  await  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
            localStorage.setItem('userToken', data.token)
            setToken(data.token)
            navigate('/home')
            toast('Success!',{
                type:'success'
            })

        }
        catch (error) {
            if (error.response.status === 401){
                toast(error.response.data.message, {
                    type: 'error'
                })
            }
        }






    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password:''
        },

        onSubmit:login
    })
    return (
        <div className={'d-flex flex-column '} >
            <div>
                <form onSubmit={formik.handleSubmit} className={'vh-100 d-flex justify-content-center align-items-center'}>
                    <div className={'row text-start w-50 bg-light shadow p-4 gy-3'}>
                        <h1 className={'text-success'}>Login</h1>
                        <div className={'col-md-12'}>
                            <label  htmlFor={'userEmail'}>email</label>
                            <input onChange={formik.handleChange} value={formik.values.email}  name={'email'} type={'email'} id={'userEmail'} className={'form-control'}/>

                        </div>

                        <div className={'col-md-12'}>
                            <label  htmlFor={'userPassword'}>Password</label>
                            <input onChange={formik.handleChange} value={formik.values.password}  name={'password'} type={'password'} id={'userPassword'} className={'form-control'}/>

                        </div>

                        <div className={'col-md-12'}>
                            <button className={'btn btn-primary'} type={"submit"}>Submit</button>
                        </div>

                        <div className={'col-md-12'}>
                            <Link to={'../password'}>Forgot Password</Link>
                        </div>

                    </div>

                </form>

            </div>
        <div className={'bg-danger'}>

        </div>

        </div>
    )
}
