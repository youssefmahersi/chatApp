import React, {Fragment, useEffect, useRef, useState} from 'react'
import Footer from '../Footer/Footer'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../../../Store/Signup/SignupStore'
import { checkData, resetPassword } from '../../../../Store/CheckVerification/CheckVerification'

const ResetPassword = () => {
    const dispatch = useDispatch();
    const {SignupStore,verificationStore} = useSelector(state => state)
    const {_id} = useParams();
    useEffect(() => {
        dispatch(getUsers())
    },[])
    const showData = () => {
        return SignupStore.users.map(user => {
            return _id === user._id ? (<span key={user._id}>{user.email}</span>) : (null)
        })
    }
    const birthday = useRef()
    const [birthdayEmpty,setBirthdayEmpty] = useState(false)
    const [passwordLength,setPasswordLength] = useState(false)
    const [resetSuccessfully,setResetSuccessfully] = useState(false)
    const checkHandler = (e) => {
        e.preventDefault();
        if(birthday.current.value){
            setBirthdayEmpty(false)
            const Data = {
                _id : _id,
                birthday: birthday.current.value
            }
            dispatch(checkData(Data))
        }else{
            setBirthdayEmpty(true)
        }
    }
    useEffect(() => {
        if(verificationStore.Result){
            if(verificationStore.Result.check){
                setResetSuccessfully(true)
            }else{
                setResetSuccessfully(false)
            }
        }
    },[verificationStore.Result])
    const password = useRef();
    const changeHandler = (e) => {
        e.preventDefault();
        const changePassowrd = {
            _id: _id,
            password: password.current.value
        }
        if(password.current.value.length > 6){
            setPasswordLength(false)
            dispatch(resetPassword(changePassowrd))
        }else{
            setPasswordLength(true)
        }
    }
    useEffect(() => {
        if(verificationStore.checkVerification){
            if(verificationStore.checkVerification.change){
                window.location = '/'
            }
        }
    },[verificationStore.checkVerification])
    return (
        <Fragment>
            <div className='resetPassword'>
                <div className='header'>
                    <h1>Chat App</h1>
                </div>
                <div className='content'>
                    <form>
                        <h3>Enter security code</h3>
                        <div className='line'>
                            <span></span>
                        </div>
                        {birthdayEmpty ? (
                            <div className='errorEmpty'>
                                <h1>Please fill in at least one field</h1>
                                <p>Please enter the user's date of birth for the account</p>
                            </div>
                        ) : (null)}
                        {verificationStore.Result ? (
                            verificationStore.Result.check ? (null) : (
                                <div className='errorEmpty'>
                                    <h1> Wrong entry</h1>
                                    <p>The date of birth you entered does not match the user's date of birth for the account</p>
                                </div>
                            )
                        ) : (null)}
                        <p className='p'>Please enter the account birth date correctly to be able to continue.</p>
                        <div className='input'>
                            <input type='date' ref={birthday}/>
                            <div className='datauser'>
                                <h3>Enter date of birth</h3>
                                {showData()}
                            </div>
                        </div>
                        <div className='line'>
                            <span></span>
                        </div>
                        <div className='button'>
                            <a href=''>Didn't get a code?</a>
                            <div className='click'>
                                <Link to='/login/identify'>Not you?</Link>
                                <button className={verificationStore.isLoading ? 'isLoadingButton' : null} onClick={checkHandler}>Continue</button>
                            </div>
                        </div>
                    </form>
                </div>
                {<Footer />}
            </div>
            {resetSuccessfully ? (
                <div className='resetSuccessfully'>
                    <form onSubmit={changeHandler}>
                        <h3>Password Reset</h3>
                        <div className='line'>
                            <span></span>
                        </div>
                        {passwordLength ? (
                            <div className='errorEmpty'>
                                <h1>Please fill in the password field correctly</h1>
                                <p>Password must be greater than 6 letters or numbers in order to strengthen the security of your account.</p>
                            </div>
                        ) : (null)}
                        <input className={passwordLength ? 'inputEmpty' : null} type='password' placeholder='Enter a new password' ref={password}/>
                        <div className='line'>
                            <span></span>
                        </div>
                        <div className='button'>
                            <button onClick={changeHandler}>Continue</button>
                            <button onClick={() => setResetSuccessfully(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (null)}
        </Fragment>
    )
}

export default ResetPassword