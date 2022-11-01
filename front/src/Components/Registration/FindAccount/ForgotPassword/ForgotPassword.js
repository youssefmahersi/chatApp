import React, {useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { checkVerification } from '../../../../Store/CheckVerification/CheckVerification'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const {verificationStore} = useSelector(state => state)
    const checkInput = useRef()
    const [inputEmpty,setInputEmpty] = useState(false)
    const searchHandler = (e) => {
        e.preventDefault();
        if(checkInput.current.value){
            setInputEmpty(false)
            const data = {
                email: checkInput.current.value
            }
            dispatch(checkVerification(data))
        }else{
            setInputEmpty(true)
        }
    }
    useEffect(() => {
        if(verificationStore.Result){
            if(verificationStore.Result.checkVerification){
                window.location = `/login/${verificationStore.Result._id}`
            }
        }
    },[verificationStore.Result])
    return (
        <div className='forgotPassword'>
            {<Header />}
            <div className='content'>
                <form>
                    <h1 className='headerFind'>Find Your Account</h1>
                    <div className='line'>
                        <span></span>
                    </div>
                    {inputEmpty ? (
                        <div className='errorEmpty'>
                            <h1>Please fill in at least one field</h1>
                            <p>Fill in at least one field to search for your account</p>
                        </div>
                    ) : (null)}
                    {inputEmpty ? (null) : (
                        verificationStore.Result ? verificationStore.Result.checkVerification ? (null) : (
                        <div className='errorEmpty'>
                            <h1>No Search Results</h1>
                            <p>Your search did not return any results. Please try again with other information.</p>
                        </div>
                    ) : (null)
                    )}
                    <p className='message'>Please enter your email or mobile number to search for your account.</p>
                    <input ref={checkInput} type='text' placeholder='Email or username'/>
                    <div className='line'>
                        <span></span>
                    </div>
                    <div className='button'>
                        <Link to='/'>Cancel</Link>
                        <button className={verificationStore.isLoading ? 'isLoadingButton' : null} onClick={searchHandler}>Search</button>
                    </div>
                </form>
            </div>
            {<Footer />}
        </div>
    )
}

export default ForgotPassword