import React, {useState,useEffect,useRef} from 'react'
import '../App.css'
import Channels from '../Components/SliderLeft/Channels/Channels'
import Chat from '../Components/Main/Chat/Chat'
import ChatChannel from '../Components/SliderLeft/ChatChannel/ChatChannel'
import NewChannel from '../Components/Extensions/NewChannel'
import { UilListUl } from '@iconscout/react-unicons'
import { useLocalStorage } from 'react-use-storage'
import { useDispatch, useSelector } from 'react-redux'
import ShowChannel from '../Components/Main/ShowChannel/ShowChannel'
import Home from '../Components/Main/Home/Home'
import { isLoadingChat } from '../Components/Extensions/React'

const App = () => {
  const dispatch = useDispatch();
  const {ChannelsStore,UsersStore,ChatStore} = useSelector(state => state)
  const [isLogin,setIsLogin] = useLocalStorage('isLogin', false)
  const [userData,setUserData] = useLocalStorage('userData', [])
  const [goMembers,setGoMembers] = useState(false)
  const [bubbleNewChannel,setBubbleNewChannel] = useState(false)
  const [colorPage,setColorPage] = useLocalStorage('backgroundPage', false)
  const [idChannel,setIdChannel] = useState()
  const [showChannel,setShowChannel] = useState(false)
  const [idShowChannel,setIdShowChannel] = useState(false)
  const [search,setSearch] = useState('')
  const [home,setHome] = useState(false)
  useEffect(() => {
    if(!isLogin){
      window.location = '/'
    }
  })
  return (
    <div className='App'>
      <input type='checkbox' id='check'/>
      <label className={colorPage ? 'labelWhite' : 'labelDark'} id='checkLabel' htmlFor='check'>{<UilListUl size='33px'/>}</label>
      <div className='mediaQuery'>
        {goMembers ? (<ChatChannel 
          setGoMembers = {setGoMembers}
          colorPage = {colorPage}
          setColorPage = {setColorPage}
          idChannel = {idChannel}
          ChannelsStore = {ChannelsStore}
        />) : (
          <Channels
            setGoMembers = {setGoMembers}
            setBubbleNewChannel = {setBubbleNewChannel}
            colorPage = {colorPage}
            setColorPage = {setColorPage}
            ChannelsStore = {ChannelsStore}
            userData = {userData}
            setIdChannel = {setIdChannel}
            dispatch = {dispatch}
            setShowChannel = {setShowChannel}
            setIdShowChannel = {setIdShowChannel}
            setSearch = {setSearch}
            search = {search}
            setHome = {setHome}
          />
        )}
      </div>
      {showChannel ? (
        <ShowChannel 
          idShowChannel = {idShowChannel}
          ChannelsStore = {ChannelsStore}
          dispatch = {dispatch}
          userData = {userData}
          setShowChannel = {setShowChannel}
          setSearch = {setSearch}
          UsersStore = {UsersStore}
          colorPage = {colorPage}
        />
      ) : (
        home ? (
          <Chat 
          colorPage = {colorPage}
          ChatStore = {ChatStore}
          idChannel = {idChannel}
          ChannelsStore = {ChannelsStore}
          UsersStore = {UsersStore}
          userData = {userData}
          dispatch = {dispatch}
          setShowChannel = {setShowChannel}
          setIdShowChannel = {setIdShowChannel}
        />) : (
          <Home 
            colorPage = {colorPage}
          />
        )
      )}
      {bubbleNewChannel ? (<NewChannel 
        setBubbleNewChannel = {setBubbleNewChannel}
        colorPage = {colorPage}
        dispatch = {dispatch}
        userData = {userData}
      />) : (null)}
    </div>
  )
}

export default App