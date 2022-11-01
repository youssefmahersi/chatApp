import React, { useState, useEffect } from 'react'
import { joinChannels, leavingChannels, pushUser } from '../../../Store/Channels/ChannelsStore'
import { UilTimesSquare } from '@iconscout/react-unicons'
import { isLoadingChat } from '../../Extensions/React'

const ShowChannel = (props) => {
    const {
        ChannelsStore,
        idShowChannel,
        dispatch,
        userData,
        setShowChannel,
        setSearch,
        UsersStore,
        colorPage
    } = props
    const [checkJoin,setCheckJoin] = useState(false)
    const joinChannel = (e) => {
        e.preventDefault();
        let pushData
        UsersStore.users.map(user => {
            return user._id === userData._id ? (
                pushData = {
                    idChannel: idShowChannel,
                    user
                }
            ) : (null)
        })
        const Data = {
            _id: idShowChannel,
            users: [
                userData._id
            ]
        }
        dispatch(joinChannels(Data))
        dispatch(pushUser(pushData))
        setShowChannel(false)
        setSearch('')
    }
    const leavingChannel = (e) => {
        e.preventDefault();
        const Data = {
            _id: idShowChannel,
            users: [
                userData._id
            ]
        }
        dispatch(leavingChannels(Data))
        window.location.reload();
    }

    useEffect(() => {
        ChannelsStore.Channels.map(item => {
            return item._id === idShowChannel ? (
                item.users.map(user => {
                    let found = true
                    console.log(user._id)
                    if(user._id == userData._id){
                        setCheckJoin(true)
                        return found = true
                    }else if(!found){
                        setCheckJoin(false)
                    }
                }) 
            ) : null
        })
    },[idShowChannel])

  return (
    <div className={colorPage ? 'showChannel showChannelWhite' : 'showChannel showChannelDark'}>
        <div className='header'>
            <h1>Server Overview</h1>
            <span onClick={() => setShowChannel(false)}>{<UilTimesSquare size='30px'/>}</span>
        </div>
        {ChannelsStore.isLoading ? (isLoadingChat()) : (
            ChannelsStore.Channels.map(item => {
                return item._id === idShowChannel ? (
                    <div className='serverOverView' key={item._id}>
                        <div className='sliderLeft'>
                            <div className='image'>
                                <span>{item.name[0]+item.name[1]}</span>
                            </div>
                            <div className='text'>
                                <p>{item.description}</p>
                            </div>
                        </div>
                        <div className='sliderRight'>
                            <div className='infoServer'>
                                <h1>Server Name</h1>
                                <label>{item.name}</label>
                            </div>
                            <div className='infoServer'>
                                <h1>Server Admin</h1>
                                <label>{item.admin.name}</label>
                            </div>
                            <div className='infoServer'>
                                <h1>Users Number</h1>
                                <label>{item.users.length} User</label>
                            </div>
                            <div className='button'>
                                {checkJoin ? (
                                    <button onClick={leavingChannel}>Leaving</button>
                                ) : (
                                    <button onClick={joinChannel}>Join</button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (null)
            })
        )}
        {}
        <div className='line'>
            <span></span>
        </div>
    </div>
  )
}

export default ShowChannel