import React, {useState} from 'react'
import Signin from '../Components/Registration/Signin/Signin'
import Signup from '../Components/Registration/Signup/Signup'
import { useSelector, useDispatch } from 'react-redux'

const AppRegistration = () => {
    const [movetoregister,setMovetoregister] = useState(false)
    const dispatch = useDispatch();
    const {SignupStore,SigninStore} = useSelector(state => state)

    return (
        <div className='appRegistration'>
            {movetoregister ? (
                <Signup 
                    setMovetoregister = {setMovetoregister}
                    dispatch = {dispatch}
                    SignupStore = {SignupStore}
                />
            ) : (
                <Signin
                    setMovetoregister = {setMovetoregister}
                    dispatch = {dispatch}
                    SigninStore = {SigninStore}
                    SignupStore = {SignupStore}
                />
            )}
        </div>
    )
}

export default AppRegistration