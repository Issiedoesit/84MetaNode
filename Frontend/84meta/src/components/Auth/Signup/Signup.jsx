import React, { useState } from 'react'
import AuthTemplate from '../Widgets/AuthTemplate'
import {useFormik} from 'formik'
import FormButton from '../Widgets/FormButton'
import FormInput from '../Widgets/FormInput'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import FormPassword from '../Widgets/FormPassword'
import axios from 'axios'
import Alert from "../../Widgets/Alerts/Alert"
// import useUser from '../../../utils/useUser'
import { useLocation } from 'react-router-dom'
import AuthFormHeader from '../Widgets/AuthFormHeader'

YupPassword(Yup)

const Signup = () => {
    const location = useLocation();

    // Access the state 'from'
    const fromLocation = location.state?.from ? location.state?.from.pathname  : '';
    const searchInLocation = location.state?.from ? location.state?.from.search  : '';
    

    const [submitting, setSubmitting] = useState(false)

    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })


    const formik = useFormik({
        initialValues:{
            firstname:"",
            lastname:"",
            email:"",
            username:"",
            password:"",
            confirmPassword:""
        },
        
        validationSchema:Yup.object({
            firstname: Yup.string()
            .required('First name required'),
            lastname: Yup.string()
            .required('Last name required'),
            username: Yup.string()
            .required('User name required'),
            email: Yup.string()
            .required('Email required')
            .email('Invalid email'),
            password: Yup.string()
            .required('Password Required')
            .min(8, 'Password must be up to eight (8) characters')
            .minLowercase(1, 'Password must contain at least 1 lower case letter')
            .minUppercase(1, 'Password must contain at least 1 upper case letter')
            .minNumbers(1, 'Password must contain at least 1 number'),
            confirmPassword: Yup.string()
            .required('Password Required')
            .min(8, 'Password must be up to eight (8) characters')
            .minLowercase(1, 'Password must contain at least 1 lower case letter')
            .minUppercase(1, 'Password must contain at least 1 upper case letter')
            .minNumbers(1, 'Password must contain at least 1 number')
            .oneOf([Yup.ref('password')], 'Passwords must match')

        })
        
    })
    

    const handleLogin = () => {
        setSubmitting(true)
        setOpenAlert(false)

        const {firstname, lastname, username, email, password} = formik.values

        if(Object.keys(formik.errors).length > 0){
            formik.setTouched({
                firstname: !firstname,
                lastname: !lastname,
                username: !username,
                email: !email,
                password: !password,
              });
            setSubmitting(false)
            return
        }

        try {
            axios.post(`${import.meta.env.VITE_BASEURL}users/signup`, {firstname, lastname, username, email, password})
            .then((res)=>{

                console.log("signup response =>", res);
                setAlertValues({...alertValues, message:`${res.data.message}. ${res.data.status.toString().charAt(0) == 2 ? "Redirecting to login..." : ""}`, type:res.data.status.toString().charAt(0) == 2 ? 'auth' : 'danger' })
                // if(res.data.token){
                //     sessionStorage.setItem('token', JSON.stringify(res.data.token));
                // }
                // if(res.data.user){
                //     sessionStorage.setItem('user', JSON.stringify(res.data.user));
                // }
                // document.cookie=`token=${res.data.token};expires=${new Date(new Date().getTime()+60*60*1000*24).toGMTString()}`
                setOpenAlert(true)
                setSubmitting(false)
                if(res.data.status.toString().charAt(0) == 2){
                    setTimeout(() => {
                        window.location.href = "/login"
                    }, 2500);
                }
            })
            .catch((err)=>{
                setSubmitting(false)
                console.error('axios error => ', err);
            })
        } catch (error) {
            setSubmitting(false)
            console.error('try catch error => ', error);
        }

    }

  return (
    <AuthTemplate altAction={'Already have an account?'} link={'/login'} linkText={"Log In"}>
        <div className={`max-w-md mx-auto w-full`}>
            <AuthFormHeader heading={'Create An Account'} />
            <div className={`font-jost mx-auto w-full bg-white text-black rounded-10 py-4 px-8 text-center`}>
                <form className={'flex flex-col gap-5 py-8'}>
                    <FormInput handleBlur={formik.handleBlur} handleChange={formik.handleChange} value={formik.values.firstname} label={'First name'} placeholder={'First Name'} id={'firstname'} name={'firstname'} fieldError={formik.touched.firstname && formik.errors.firstname} />
                    <FormInput handleBlur={formik.handleBlur} handleChange={formik.handleChange} value={formik.values.lastname} label={'Last name'} placeholder={'Last Name'} id={'lastname'} name={'lastname'} fieldError={formik.touched.lastname && formik.errors.lastname} />
                    <FormInput type={'email'} handleBlur={formik.handleBlur} handleChange={formik.handleChange} value={formik.values.email} label={'Email Address'} placeholder={'Email Address'} id={'email'} name={'email'} fieldError={formik.touched.email && formik.errors.email} />
                    <FormInput handleBlur={formik.handleBlur} handleChange={formik.handleChange} value={formik.values.username} label={'Username'} placeholder={'User Name'} id={'username'} name={'username'} fieldError={formik.touched.username && formik.errors.username} />
                    <FormPassword handleBlur={formik.handleBlur} handleChange={formik.handleChange} placeholder={'********'} label={'Create Password'} value={formik.values.password} fieldError={formik.touched.password && formik.errors.password} />
                    <FormPassword handleBlur={formik.handleBlur} handleChange={formik.handleChange} placeholder={'********'} label={'Confirm Password'} id={"confirmPassword"} name={"confirmPassword"} value={formik.values.confirmPassword} fieldError={formik.touched.confirmPassword && formik.errors.confirmPassword} />
                    <div className={`pt-4`}>
                        <FormButton handleClick={handleLogin} disabled={submitting} text={'Sign Up'} />
                    </div>
                </form>
                {/* <AltSignIn /> */}
            </div>
            </div>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </AuthTemplate>
  )
}

export default Signup