import React, { useEffect, useRef, useState } from 'react'
import { postSignup } from '../../../Store/Signup/SignupStore'
import { 
    UilEnvelopeAlt, 
    UilKeySkeleton, 
    UilUser, 
    UilQuestionCircle, 
    UilTimes, 
    UilSyncExclamation 
} from '@iconscout/react-unicons'

const Signup = (props) => {
    const {
        dispatch,
        SignupStore,
        setShowSignup,
        setSuccessfull
    } = props

    const [firstNameEmpty,setFirstNameEmpty] = useState(false)
    const [lastNameEmpty,setLastNameEmpty] = useState(false)
    const [usernameEmpty,setUsernameEmpty] = useState(false)
    const [emailEmpty,setEmailEmpty] = useState(false)
    const [passwordEmpty,setPasswordEmpty] = useState(false)
    const [birthdayEmpty,setBirthdayEmpty] = useState(false)
    const [genderEmpty,setGenderEmpty] = useState(false)
    const [showError,setShowError] = useState()
    const [foundUsername,setFoundUsername] = useState(false)
    const [foundEmail,setFoundEmail] = useState(false)
    const errorHendler = (e) => {
        setShowError(e)
    }
    const firstName = useRef();
    const lastName = useRef();
    const userName = useRef();
    const email = useRef();
    const password = useRef();
    const birthday = useRef();
    const [gender,setGender] = useState()
    const emptyHandler = (e) => {
        return(
            <div className='messageError'>
                <span className='message'>{e}</span>
                <div className="arrow-1"></div>
            </div>
        )
    }
    const postSignUp = (e) => {
        e.preventDefault();
        const Data = {
            name: firstName.current.value + " " + lastName.current.value,
            username: userName.current.value ,
            birthday: birthday.current.value,
            gender: gender,
            email: email.current.value,
            password: password.current.value
        }
        if(!firstName.current.value){
            setFirstNameEmpty(true)
        }else{
            setFirstNameEmpty(false)
        }
        if(!lastName.current.value){
            setLastNameEmpty(true)
        }else{
            setLastNameEmpty(false)
        }
        if(!userName.current.value){
            setUsernameEmpty(true)
        }else{
            setUsernameEmpty(false)
        }
        if(!email.current.value){
            setEmailEmpty(true)
        }else{
            setEmailEmpty(false)
        }
        if(password.current.value.length > 6){
            setPasswordEmpty(false)
        }else{
            setPasswordEmpty(true)
        }
        if(!birthday.current.value){
            setBirthdayEmpty(true)
        }else{
            setBirthdayEmpty(false)
        }
        if(!gender){
            setGenderEmpty(true)
        }else{
            setGenderEmpty(false)
        }
        if(firstName.current.value && 
            lastName.current.value && 
            userName.current.value &&
            email.current.value && 
            password.current.value.length > 6 &&
            birthday.current.value &&
            gender){
                dispatch(postSignup(Data))
        }
    }
    console.log(SignupStore.Result)
    useEffect(() => {
        if(SignupStore.Result){
            if(SignupStore.Result.checkUsername){
                setFoundUsername(true)
                setFoundEmail(false)
            }else if(SignupStore.Result.checkEmail){
                setFoundUsername(false)
                setFoundEmail(true)
            }
            if(SignupStore.Result.created){
                setFoundEmail(false)
                setShowSignup(false)
                setSuccessfull(true)
            }
        }
    },[SignupStore.Result])
    return (
        <div className='signup'>
            <span className='close' onClick={() => setShowSignup(false)}>{<UilTimes size='30px'/>}</span>
            <div className='content'>
                <div className='header'>
                    <h1>Sign Up</h1>
                    <p>It’s quick and easy.</p>
                </div>
                <form onSubmit={postSignUp}>
                    <h2 className='hSignUp'>Registration</h2>
                    <p>Join thousands of learners from around the world</p>
                    <div className='name'>
                        <div className='firstName'>
                            <input className={firstNameEmpty ? 'emptyInput' : null} ref={firstName} type='text' placeholder='First name'/>
                            {firstNameEmpty || lastNameEmpty ? (
                                <span className='iconHandler' onClick={() => errorHendler('firsName')}>{<UilSyncExclamation size='20px'/>}</span>
                            ) : (null)}
                            {showError === "firsName" ? (
                                emptyHandler('What`s your name?')
                            ) : (null)}
                        </div>
                        <div className='lastName'>
                            <input className={lastNameEmpty ? 'emptyInput' : null} ref={lastName} type='text' placeholder='Last name'/>
                        </div>
                    </div>
                    <div className='userName input'>
                        <span>{<UilUser color = {usernameEmpty || foundUsername ? 'red' : '#828282'}/>}</span>
                        <input className={usernameEmpty || foundUsername ? 'emptyInput' : null} ref={userName} type='text' placeholder='Uesrname'/>
                        {usernameEmpty || foundUsername ? (
                            <span className='iconHandler' onClick={() => errorHendler('username')}>{<UilSyncExclamation size='20px'/>}</span>
                        ) : (null)}
                        {showError === "username" ? (
                            usernameEmpty ? (emptyHandler('Please enter username')) : (
                                foundUsername ? (emptyHandler(SignupStore.Result.message)) : (null)
                            )
                        ) : (null)}
                    </div>
                    <div className={emailEmpty ? 'email emptyInput input' : 'email input'}>
                        <span>{<UilEnvelopeAlt color = {emailEmpty || foundEmail ? 'red' : '#828282'}/>}</span>
                        <input className={emailEmpty || foundEmail ? 'emptyInput' : null} ref={email} type='email' placeholder='Email'/>
                        {emailEmpty || foundEmail ? (
                            <span className='iconHandler' onClick={() => errorHendler('email')}>{<UilSyncExclamation size='20px'/>}</span>
                        ) : (null)}
                        {showError === "email" ? (
                            emailEmpty ? (emptyHandler("You'll use this when you log in and if you ever need to reset your password.")) : (
                                foundEmail ? (emptyHandler(SignupStore.Result.message)) : (null)
                            )
                        ) : (null)}
                    </div>
                    <div className={passwordEmpty ? 'password emptyInput input' : 'password input'}>
                        <span>{<UilKeySkeleton color = {passwordEmpty ? 'red' : 'null'}/>}</span>
                        <input className={passwordEmpty ? 'emptyInput' : null} ref={password} type='password' placeholder='New password'/>
                        {passwordEmpty ? (
                            <span className='iconHandler' onClick={() => errorHendler('password')}>{<UilSyncExclamation size='20px'/>}</span>
                        ) : (null)}
                        {showError === "password" ? (
                            emptyHandler("Enter a combination of at least six numbers, letters and punctuation marks (like ! and &).")
                        ) : (null)}
                    </div>
                    <div className='birthday'>
                        <div className='infoBirthday'>
                            <span>Birthday</span>
                            <span>{<UilQuestionCircle size='17px'/>}</span>
                        </div>
                        <div className='inputBirthday'>
                            <input className={birthdayEmpty ? 'emptyInput' : null} ref={birthday} type='date' placeholder='Birthday' min="0" max="100"/>
                            <span className='old'>Years old</span>
                            <span className='old'>{birthdayEmpty ? (
                                <span className='birthdayError'>It looks like you entered the wrong info. Please be sure to use your real birthday.</span>
                            ) : (null)}</span>
                        </div>
                    </div>
                    <div className='gender'>
                        <div className='infoGender'>
                            <span>Gender</span>
                            <span>{<UilQuestionCircle size='17px'/>}</span>
                        </div>
                        <div className='inputGender'>
                            <label htmlFor='female' className={genderEmpty ? 'emptylabel' : null} onClick={() => setGender('Female')}>
                                <input id='female' name='gender' type='radio' value='Female'/>
                                <span>Female</span>
                            </label>
                            <label htmlFor='male' className={genderEmpty ? 'emptylabel' : null} onClick={() => setGender('Male')}>
                                <input id='male' name='gender' type='radio' value='Male'/>
                                <span>Male</span>
                            </label>
                        </div>
                    </div>
                    <button>Registration</button>
                </form>
            </div>
        </div>
    )
}

export default Signup