import React, { Fragment } from 'react'
import { UilStepBackward } from '@iconscout/react-unicons'
import FooterUser from '../../FooterUser/FooterUser'
import { isLoadingChannel } from '../../Extensions/React'

const ChatChannel = (props) => {
    const {
        idChannel,
        ChannelsStore,
        setGoMembers,
        colorPage,
        setColorPage,
    } = props

    const showDataChannel = () => {
        return ChannelsStore.Channels.map(item => {
            return idChannel === item._id ? (
                <Fragment key={item._id}>
                    <div className='info'>
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>
                    </div>
                    <h1 className='h1Members'>Members: {item.users.length}</h1>
                </Fragment>
            ) : (null)
        })
    }

    const showMembers = () => {
        return ChannelsStore.Channels.map(item => {
            return idChannel === item._id ? (
                item.users.map(user => {
                    return(
                        <div className='membersUser' key={user._id}>
                            <img src={user.profilePhoto}/>
                            <h1>{user.name}</h1>
                        </div>
                    )
                })
            ) : (null)
        })
    }

    return (
        <Fragment>
            <div className={colorPage ? ('chatChannel channels channelsWhite chatChannelWight'): ('chatChannel channels channelsDark chatChannelDark')}>
                <div className='backChannels' onClick={() => setGoMembers(false)}>
                    <div className='back'>
                        <span>{<UilStepBackward size='20px'/>}</span>
                        <span>All channels</span>
                    </div>
                </div>
                {showDataChannel()}
                <div className='members'>
                    {ChannelsStore.isLoading ? (isLoadingChannel()) : (showMembers())}
                </div>
                <div className='user'>
                    {<FooterUser 
                        colorPage = {colorPage}
                        setColorPage = {setColorPage}
                    />}
                </div>
            </div>
        </Fragment>
    )
}

export default ChatChannel