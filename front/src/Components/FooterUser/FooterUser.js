import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'react-use-storage'
import { 
    UilAngleDown,
    UilListUiAlt, 
    UilUserCircle, 
    Uil21Plus, 
    UilMoon, 
    UilSun, 
    UilSignout 
} from '@iconscout/react-unicons'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../Store/getUsers/UsersStore'

const FooterUser = ({setColorPage,colorPage}) => {
    const dispatch = useDispatch();
    const {UsersStore} = useSelector(state => state)
    useEffect(() => {
        dispatch(getUsers())
    },[])
    const [isLogin,setIsLogin] = useLocalStorage('isLogin', false)
    const [userData,setUserData] = useLocalStorage('userData', [])
    const [bubbleProfle,setBubbleProfile] = useState(false)

    return (
        <div className={colorPage ? ('footerUser footerUserWhite') : ('footerUser footerUserDark')}>
            {UsersStore.users.map(user => {
                return userData._id === user._id ? (
                        <Fragment key={user._id}>
                            <div className='content'>
                                <div className='name'>
                                    <img src={user.profilePhoto}/>
                                    <h1>{user.name}</h1>
                                </div>
                                {bubbleProfle ? (
                                    <span onClick={() => setBubbleProfile(false)}>{<UilAngleDown />}</span>
                                ) : (
                                    <span onClick={() => setBubbleProfile(true)}>{<UilListUiAlt />}</span>
                                )}
                            </div>
                            {bubbleProfle ? (
                                <div className='listProfile'>
                                    <Link to={`/Profile/${user.username}`} className='list'>
                                        <span>{<UilUserCircle size='22px'/>}</span>
                                        <h1>My Profile</h1>
                                    </Link>
                                    <div className='list'>
                                        <span>{<Uil21Plus size='22px'/>}</span>
                                        <h1>Tweeter</h1>
                                    </div>
                                    <div className='list' onClick={() => setColorPage(!colorPage)}>
                                        <span>{colorPage ? (<UilMoon size='22px'/>) : (<UilSun size='22px'/>)}</span>
                                        <h1>{colorPage ? ('Dark') : ('White')}</h1>
                                    </div>
                                    <div className='line'>
                                        <span></span>
                                    </div>
                                    <div className='logout list' onClick={() => setIsLogin(false)}>
                                        <span>{<UilSignout size='22px'/>}</span>
                                        <h1>Logout</h1>
                                    </div>
                                </div>
                            ) : (null)}
                        </Fragment>
                ) : (null)
            })}
        </div>
    )
}

export default FooterUser