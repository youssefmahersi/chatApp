import React, { useState, useEffect, Fragment } from 'react'
import ProfileView from '../Components/PersonalInfo/ProfileView/ProfileView'
import HeaderProfile from '../Components/PersonalInfo/Header/HeaderPersonInfo'
import ChangeInfo from '../Components/PersonalInfo/ChangeInfo/ChangeInfo'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../Store/getUsers/UsersStore'
import { useLocalStorage } from 'react-use-storage'

const AppPersonalInfo = () => {
    const [userData,setUserData] = useLocalStorage('userData', [])
    const [colorPage,setColorPage] = useLocalStorage('backgroundPage', false)
    const [goChangeInfo,setGoChangeInfo] = useState(false)
    const dispatch = useDispatch();
    const {UsersStore} = useSelector(state => state)
    useEffect(() => {
        dispatch(getUsers())
    },[])
    return (
        <div className='appPersonalInfo'>
            {UsersStore.users.map(user => {
                return userData._id === user._id ? (
                    <Fragment key={user._id}>
                        {<HeaderProfile 
                            profilePhoto = {user.profilePhoto}
                            name = {user.name}
                            colorPage = {colorPage}
                            setColorPage = {setColorPage}
                        />}
                        {goChangeInfo ? (
                            <ChangeInfo 
                                setGoChangeInfo = {setGoChangeInfo}
                                profilePhoto = {user.profilePhoto}
                                colorPage = {colorPage}
                            />
                        ) : (
                            <ProfileView 
                                setGoChangeInfo = {setGoChangeInfo}
                                profilePhoto = {user.profilePhoto}
                                name = {user.name}
                                username = {user.username}
                                bio = {user.bio}
                                phone = {user.phoneNumber}
                                email = {user.email}
                                password = {user.password}
                                colorPage = {colorPage}
                            />
                        )}
                    </Fragment>
                ) : (null)
            })}
        </div>
    )
}

export default AppPersonalInfo