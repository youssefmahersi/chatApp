import React, {useEffect, useRef} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../../../Store/Signup/SignupStore'
import { isLoading } from '../../../Extensions/React'

const CheckAccount = () => {
    const dispatch = useDispatch();
    const {SignupStore} = useSelector(state => state)
    const {_id} = useParams();
    useEffect(() => {
        dispatch(getUsers())
    },[])
    const birthday = useRef();
    const email = useRef();
    const nextPageHandler = (e) => {
        e.preventDefault();
        if(birthday.current.checked){
            window.location = `/login/ResetPassword/${_id}`
        }
    }

    const showData = () => {
        return SignupStore.users.map(user => {
            return _id === user._id ? (
                <div className='data' key={user._id}>
                    <div className='sliderLeft'>
                        <p>How do you want to get the code to reset your password?</p>
                        <div className='select'>
                            <input type='radio' id='check1' name='reset' ref={birthday}/>
                            <label htmlFor='check1'>
                                <h1>Use my Birthday</h1>
                                <p>You must enter your date of birth to quickly reset your password.</p>
                            </label>
                        </div>
                        <div className='select'>
                            <input type='radio' id='check2' name='reset' ref={email}/>
                            <label htmlFor='check2'>
                                <h1>Send code via email <span style={{fontSize: '12px', color:'red'}}>(Not Supported)</span></h1>
                                <p>{user.email}</p>
                            </label>
                        </div>
                    </div>
                    <div className='sliderRight'>
                        <img src='https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80'/>
                        <h1>{user.name}</h1>
                        <span>Chat User</span>
                    </div>
                </div>
            ) : (null)
        })
    }

    return (
        <div className='checkAccount'>
            {<Header />}
            {SignupStore.isLoading ? (<div>{isLoading()}</div>) : (
                <div className='content'>
                    <form>
                        <h2>Reset your password</h2>
                        <div className='line'>
                            <span></span>
                        </div>
                        {showData()}
                        <div className='line'>
                            <span></span>
                        </div>
                        <div className='button'>
                            <a href=''>No longer have access to these?</a>
                            <div className='click'>
                                <Link to='/login/identify'>Not you?</Link>
                                <button className={SignupStore.isLoading ? 'isLoadingButton' : null} onClick={nextPageHandler}>Continue</button>
                            </div>
                        </div>
                    </form>
                    <p>You can see your name and profile picture because you're using a computer network you've logged in on before.</p>
                </div>
            )}
            {<Footer />}
        </div>
    )
}

export default CheckAccount