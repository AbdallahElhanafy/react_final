import React, {useContext} from 'react'
import  "formik";
import {useFormik} from "formik";
import axios from "axios";
import {tokenContext} from "../context/tokenContext";
import {useNavigate} from "react-router-dom";



export default function Login() {
    let {setToken} = useContext(tokenContext)
    const navigate = useNavigate()

     async function login (values){
        let {data} =  await  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch(reason =>
        console.log(reason))

         if (data.message === 'success'){
             localStorage.setItem('userToken', data.token)
             setToken(data.token)
             navigate('/home')
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
        <div >
            <form onSubmit={formik.handleSubmit} className={'vh-100 d-flex justify-content-center align-items-center'}>
                <div className={'row text-start w-50 bg-light shadow p-4 gy-3'}>

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



                </div>

            </form>


        </div>
    )
}
