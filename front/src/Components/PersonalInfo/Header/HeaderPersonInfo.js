import React, {useState,useEffect, Fragment} from 'react'
import { 
  UilChat,
  UilAngleDown, 
  UilUserCircle, 
  UilMoon,
  UilSun,
  UilSignout, 
  UilUsersAlt, 
  UilAngleUp 
} from '@iconscout/react-unicons'
import { useLocalStorage } from 'react-use-storage'
import { Link } from 'react-router-dom'

const HeaderProfile = (props) => {
  const {
    colorPage,
    setColorPage,
    profilePhoto,
    name
  } = props
  const [isLogin,setIsLogin] = useLocalStorage('isLogin', false)
  const [showItemBubble,setShowItemBubble] = useState(false)
  useEffect(() => {
    if(!isLogin){
      window.location = '/'
    }
  })
  return (
    <div className={colorPage ? 'personalInfo personalInfoWhite' : 'personalInfo personalInfoDark'}>
      <div className='header'>
        <div className='logo'>
            <span>{<UilChat size='20px'/>}</span>
            <h1>Chat app</h1>
        </div>
        <div className='user'>
            <img src={profilePhoto}/>
            <h1>{name}</h1>
            <span onClick={() => setShowItemBubble(!showItemBubble)}>{showItemBubble ? (<UilAngleUp />) : (<UilAngleDown />)}</span>
            {showItemBubble ? (
              <div className='listProfile'>
                <div className='list myProfile'>
                    <span>{<UilUserCircle size='22px'/>}</span>
                    <h1>My Profile</h1>
                </div>
                <Link to={`/Home`}className='list tweeter'>
                    <span>{<UilUsersAlt size='22px'/>}</span>
                    <h1>Group Chat</h1>
                </Link>
                <div className='list colorPage' onClick={() => setColorPage(!colorPage)}>
                  <span>{colorPage ? (<UilMoon size='22px'/>) : (<UilSun size='22px'/>)}</span>
                  <h1>{colorPage ? ('Dark') : ('White')}</h1>
                </div>
                <div className='line'>
                    <span></span>
                </div>
                <div className='list logout' onClick={() => setIsLogin(false)}>
                    <span>{<UilSignout size='22px'/>}</span>
                    <h1>Logout</h1>
                </div>
              </div>
            ) : (null)}
        </div>
      </div>
    </div>
  )
}

export default HeaderProfile