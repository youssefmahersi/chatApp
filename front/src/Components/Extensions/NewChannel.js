import React, { useRef, useState } from 'react'
import { postChannels } from '../../Store/Channels/ChannelsStore'

const NewChannel = (props) => {
    const {
        dispatch,
        setBubbleNewChannel,
        colorPage,
        userData,
    } = props

    const name = useRef()
    const description = useRef()
    const [emptyName,setEmptyName] = useState(false)
    const createChannel = (e) => {
        e.preventDefault();
        const String = name.current.value.charAt(0).toLowerCase() + name.current.value.slice(1);
        const Data = {
            name: String,
            description: description.current.value,
            admin: userData._id,
            users: [
                userData._id
            ],
        }
        if(String){
            dispatch(postChannels(Data))
            setBubbleNewChannel(false)
            setEmptyName(false)
        }else{
            setEmptyName(true)
        }
    }

    return (
        <div className={colorPage ? ('newChannel newChannelwhite') : ('newChannel newChannelDark')}>
            <form>
                <h1>New Channel</h1>
                <span>{emptyName ? '* Please enter a channel name' : null}</span>
                <input className={emptyName ? 'emptyInput' : null} ref={name} type='text' placeholder='Channel name'/>
                <textarea ref={description} placeholder='Channel Description'></textarea>
                <div className='button'>
                    <button onClick={createChannel}>Save</button>
                    <button onClick={() => setBubbleNewChannel(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default NewChannel