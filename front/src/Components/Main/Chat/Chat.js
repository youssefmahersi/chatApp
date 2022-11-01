import React, {useState, useEffect, useRef} from 'react'
import { UilMessage } from '@iconscout/react-unicons'
import { postChat, getChat } from '../../../Store/chatChnnel/ChatStore'
import EmojiPicker from 'emoji-picker-react';
import { UilSmile } from '@iconscout/react-unicons'

const Chat = (props) => {
    const {
        ChatStore,
        colorPage,
        idChannel,
        ChannelsStore,
        UsersStore,
        userData,
        dispatch,
        setShowChannel,
        setIdShowChannel
    } = props
    const scrollMessage = useRef()
    const [scroll,setScroll] = useState();
    const [showEmoji,setShowEmoji] = useState(false)
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const onEmojiClick = (emojiObject) => {
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
      };
    useEffect(() => {
        scrollMessage.current?.scrollIntoView();
    },[idChannel])
    useEffect(() => {
        dispatch(getChat())
    },[ChatStore.Chat])
    const showDataChannel = (e) => {
        setShowChannel(true)
        setIdShowChannel(e)
    }
    const headerChat = () => {
        return ChannelsStore.Channels.map(item => {
            return item._id === idChannel ? (
                    <div className='header' key={item._id}>
                        <h1 onClick={() => showDataChannel(item._id)}>{item.name}</h1>
                    </div>
            ) : (null)
        })
    }
    const showChat = () => {
        return ChatStore.Chat.map(chat => {
            return chat.channel ? (
                chat.channel._id === idChannel ? (
                    UsersStore.users.map(user => {
                        return user._id === chat.chatChannel.idUser ? (
                            <div className='chatPerson' key={chat._id}>
                                <div className='image'>
                                    <img src={user.profilePhoto}/>
                                </div>
                                <div className='contentPerson'>
                                    <div className='name'>
                                        <h1>{user.name}</h1>
                                        <span>{chat.chatChannel.date}</span>
                                    </div>
                                    <div className='comment'>
                                        {chat.chatChannel.chat.map(ch => {
                                            return(
                                                <p ref={scrollMessage} key={ch + Date()}>{ch}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (null)
                    })
                ) : (null)
            ) : (null)
        })
    }

    function formatAMPM(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = new Date();
        const dayName = days[day.getDay()];
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return dayName + " " + strTime;
      }
    
    const sendMessage = (e) => {
        e.preventDefault();
        const Data = {
            channel: {_id: idChannel},
            chatChannel: {
                idUser: userData._id,
                chat: [inputStr],
                date: formatAMPM(new Date)
            }
        }
        if(inputStr){
            dispatch(postChat(Data))
            setInputStr('')
            setScroll(true)
        }
    }

    useEffect(() => {
        if(scroll){
            scrollMessage.current?.scrollIntoView({behavior:"smooth"});
        }
    })
    useEffect(() => {
        const scrollDemo = document.querySelector(".chat");
        const maxScroll = scrollDemo.scrollHeight - scrollDemo.clientHeight;
        const scrollBottom = maxScroll - scrollDemo.scrollTop;
        if(scrollBottom > 100){
            setScroll(false)
        }else{
            setScroll(true)
        }
    })

    return (
        <div className={colorPage ? ('main mainWhite') : ('main mainDark')}>
            {headerChat()}
            <div className='EmojiPickercontent'>
                <div className='chat'>
                    {showChat()}
                </div>
                <form className='inputChat' onSubmit={sendMessage}>
                    <div className='boxChat'>
                        <input value={inputStr} onChange={e => setInputStr(e.target.value)} type='text' placeholder='Type a message here' />
                        <button onClick={sendMessage}>{<UilMessage color='#fff'/>}</button>
                    </div>
                    <div className='boxEmoji' onClick={() => setShowEmoji(!showEmoji)}>
                        <span className='emoji'>{<UilSmile size='30px'/>}</span>
                        {showEmoji && colorPage ? (
                            <span className='clickEmoji'>{<EmojiPicker 
                                width = {350}
                                height = {370}
                                theme = 'light'
                                onEmojiClick={onEmojiClick}
                            />}</span>
                        ) : (null)}
                        {showEmoji && !colorPage ? (
                            <span className='clickEmoji'>{<EmojiPicker 
                                width = {350}
                                height = {370}
                                theme = 'dark'
                                onEmojiClick={onEmojiClick}
                            />}</span>
                        ) : (null)}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat