import React, { useState } from 'react'
import "./Login.scss"
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import { loginvalidation } from "./loginvalidation"
import toast, { Toaster } from 'react-hot-toast'

const Login = ({setUserAuth}) => {


    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const initialValues = {
        email: "", password: ""
    }
    const { values, handleBlur, handleChange, handleSubmit, resetForm, errors, touched } = useFormik({
        initialValues,
        validationSchema: loginvalidation,
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password).then((val) => {
                console.log(val.user.accessToken)
                localStorage.setItem("token",val.user.accessToken)
                localStorage.setItem("auth",true)
                toast.success('Login Successfull');
                resetForm()
                setUserAuth(true)
                setTimeout(() => navigate("/"), 1000)

            }).catch((e) => {
                console.log(e);
                toast.error('email password not matched')
            })
        }
    })



    return (
        <div className='login'>
            <Toaster />
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input">
                    <input type="email" name='email' value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder='email' />
                    {
                        errors.email && touched.email && <small className='error'>{errors.email}</small>
                    }
                </div>

                <div className="input">
                    <input name='password' onBlur={handleBlur} onChange={handleChange} value={values.password} type={showPassword ? "text" : "password"} placeholder='password' required />
                    {
                        errors.password && touched.password && <small className='error'>{errors.password}</small>
                    }
                </div>
                <div className="check">
                    <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                    <span>Show Password</span>
                </div>
                <div className="button">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
