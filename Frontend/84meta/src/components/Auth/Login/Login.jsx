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

const Login = () => {
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
            email:"",
            password:""
        },
        
        validationSchema:Yup.object({
            email: Yup.string()
            .required('Email required')
            .email('Invalid email'),
            password: Yup.string()
            .required('Password Required')
            // .min(8, 'Password must be up to eight (8) characters')
            // .minLowercase(1, 'Password must contain at least 1 lower case letter')
            // .minUppercase(1, 'Password must contain at least 1 upper case letter')
            // .minNumbers(1, 'Password must contain at least 1 number')

        })
        
    })
    

    const handleLogin = () => {
        setSubmitting(true)
        setOpenAlert(false)

        const {email, password} = formik.values

        if(Object.keys(formik.errors).length > 0){
            formik.setTouched({
                email: !email,
                password: !password,
              });
            setSubmitting(false)
            return
        }

        try {
            axios.post(`${import.meta.env.VITE_BASEURL}users/login`, {email:email, password:password})
            .then((res)=>{

                // console.log("login response =>", res);
                setAlertValues({...alertValues, message:res.data.message, type:res.data.status.toString().charAt(0) == 2 ? 'auth' : 'danger' })
                if(res.data.token){
                    sessionStorage.setItem('token', JSON.stringify(res.data.token));
                }
                if(res.data.user){
                    sessionStorage.setItem('user', JSON.stringify(res.data.user));
                }
                document.cookie=`token=${res.data.token};expires=${new Date(new Date().getTime()+60*60*1000*24).toGMTString()}`
                setOpenAlert(true)
                setSubmitting(false)
                if(res.data.status.toString().charAt(0) == 2){
                    setTimeout(() => {
                        window.location.href = `${fromLocation}${searchInLocation}` || '/dashboard'
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
    <AuthTemplate page={'login'}>
        <div className={`max-w-sm mx-auto w-full`}>
            <AuthFormHeader />
            <div className={`font-jost mx-auto w-full bg-white text-black rounded-10 py-4 px-6 text-center`}>
                <form className={'flex flex-col gap-5 py-8'}>
                    <FormInput type={'email'} handleBlur={formik.handleBlur} handleChange={formik.handleChange} value={formik.values.email} label={'Email Address'} placeholder={'Email Address'} id={'email'} name={'email'} fieldError={formik.touched.email && formik.errors.email} />
                    <FormPassword forgotPassword handleBlur={formik.handleBlur} handleChange={formik.handleChange} placeholder={'********'} label={'Enter Password'} value={formik.values.password} fieldError={formik.touched.password && formik.errors.password} />
                    <div className={`pt-4`}>
                        <FormButton handleClick={handleLogin} disabled={submitting} text={'Log in'} />
                    </div>
                </form>
                {/* <AltSignIn /> */}
            </div>
            </div>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </AuthTemplate>
  )
}

export default Login