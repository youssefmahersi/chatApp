import React, {useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkSignin } from '../../../../Store/Signin/SigninStore'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'react-use-storage'

const Header = () => {
    const [isLogin,setIsLogin] = useLocalStorage('isLogin', false)
    const [userData,setUserData] = useLocalStorage('userData', [])
    const dispatch = useDispatch();
    const {SigninStore} = useSelector(state => state)
    const email = useRef();
    const password = useRef();
    const [emailEmpty,setEmailEmpty] = useState(false)
    const [passwordEmpty,setPasswordEmpty] = useState(false)
    const signinHandler = (e) => {
        e.preventDefault();
        if(email.current.value){
            setEmailEmpty(false)
        }else{
            setEmailEmpty(true)
        }
        if(password.current.value){
            setPasswordEmpty(false)
        }else{
            setPasswordEmpty(true)
        }
        if(email.current.value && password.current.value){
            const Data = {
                email: email.current.value,
                password: password.current.value
            }
            dispatch(checkSignin(Data))
        }
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
        <div className='headerFind'>
            <div className='header'>
                <div className='logo'>
                    <h1>Chat App</h1>
                </div>
                <form>
                    <input className={emailEmpty ? 'emptyInput' : null} ref={email} type='text' placeholder='Email or username'/>
                    <input className={passwordEmpty ? 'emptyInput' : null} ref={password} type='password' placeholder='password'/>
                    <button onClick={signinHandler}>Log in</button>
                    <Link to='/login/identify'>Forgot Account?</Link>
                </form>
            </div>
        </div>
    )
}

export default Header