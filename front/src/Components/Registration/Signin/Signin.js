import React, { useRef, useState, useEffect, Fragment } from 'react'
import { UilEnvelopeAlt, UilKeySkeleton, UilPlus, UilExclamationTriangle } from '@iconscout/react-unicons'
import { checkSignin } from '../../../Store/Signin/SigninStore'
import Signup from '../Signup/Signup'
import { Link } from 'react-router-dom'
import Footer from '../FindAccount/Footer/Footer'
import { useLocalStorage } from 'react-use-storage'

const Signin = (props) => {
    const [isLogin,setIsLogin] = useLocalStorage('isLogin', false)
    const [userData,setUserData] = useLocalStorage('userData', [])

    const {
        setMovetoregister,
        dispatch,
        SigninStore,
        SignupStore
    } = props
    const [emailEmpty,setEmailEmpty] = useState(false)
    const [passwordEmpty,setPasswordEmpty] = useState(false)
    const [successfull,setSuccessfull] = useState(false)
    const [showSignup,setShowSignup] = useState(false)

    const email = useRef();
    const password = useRef();
    const postSignin = (e) => {
        e.preventDefault();
        const Data = {
            email: email.current.value,
            password: password.current.value
        }
        dispatch(checkSignin(Data))
    }

    useEffect(() => {
        if(SigninStore.Result){
            if(SigninStore.Result.checkEmail){
                setEmailEmpty(false)
                if(SigninStore.Result.checkPassword){
                    setPasswordEmpty(false)
                }else{
                    setPasswordEmpty(true)
                    setEmailEmpty(false)
                }
            }else{
                setEmailEmpty(true)
                setPasswordEmpty(false)
            }
            if(SigninStore.Result.checkAccount){
                setEmailEmpty(false)
                setIsLogin(true)
                setUserData(SigninStore.Result.Data)
            }
        }
    },[SigninStore.Result])

    useEffect(() => {
        if(isLogin){
            window.location = '/Home'
        }
    })

    return (
        <Fragment>
            <div className='signin'>
                <div className='f1h0'>
                    <div className='content'>
                        <form onSubmit={postSignin}>
                            <h1>Login</h1>
                            <div className='email inputLogin' >
                                <span className='icon'>{<UilEnvelopeAlt color = {emailEmpty ? 'red' : '#828282'}/>}</span>
                                <input className={emailEmpty ? 'emptyInput' : null} ref={email} type='text' placeholder='Email or username'/>
                                {emailEmpty ? (
                                    <span className='errorIcon'>{<UilExclamationTriangle />}</span>
                                ) : (null)}
                            </div>
                            {SigninStore.Result ? (
                                SigninStore.Result.messageEmail ? (
                                    <span>{SigninStore.Result.messageEmail} <Link to='login/identify'>Find your account and log in.</Link></span>
                                ) : (null)
                            ) : (null)}
                            <div className='password inputLogin' >
                                <span className='icon'>{<UilKeySkeleton color = {passwordEmpty ? 'red' : '#828282'}/>} </span>
                                <input className={passwordEmpty ? 'emptyInput' : null} ref={password} type='password' placeholder='Password'/>
                            </div>
                            {SigninStore.Result ? (
                                SigninStore.Result.messagePassword ? (
                                    <span>{SigninStore.Result.messagePassword} <Link to='login/identify'>Forgot Password?</Link></span>
                                ) : (null)
                            ) : (null)}
                            <button className={SigninStore.isLoading ? 'isLoadingButton' : null}>Login</button>
                            <Link to='login/identify?' className='forgotPassword'>Forgot password?</Link>
                        </form>
                        <div className='line'>
                            <span></span>
                        </div>
                        <div className='createAccount'>
                            <span onClick={() => setShowSignup(true)}>Create new account</span>
                        </div>
                        {successfull ? (
                            <span className='successfully'>Account successfully created</span>
                        ) : null}
                    </div>
                    <div className='info'>
                        <h1>Chat App</h1>
                        <p>Connect with friends and the world around you on Facebook.</p>
                    </div>
                </div>
            </div>
            {<Footer />}
            {showSignup ? (
                <div className='pageSignup'>
                    <Signup 
                        setMovetoregister = {setMovetoregister}
                        dispatch = {dispatch}
                        SignupStore = {SignupStore}
                        setShowSignup = {setShowSignup}
                        setSuccessfull = {setSuccessfull}
                    />
                </div>
            ) : (null)}
        </Fragment>
    )
}

export default Signin