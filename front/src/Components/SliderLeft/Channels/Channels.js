import React, { Fragment, useState, useEffect } from 'react'
import { UilPlus } from '@iconscout/react-unicons'
import { UilSearch } from '@iconscout/react-unicons'
import FooterUser from '../../FooterUser/FooterUser'
import { UilTimesCircle } from '@iconscout/react-unicons'
import { Search } from '../../../Store/Channels/ChannelsStore'
import { getChannels } from '../../../Store/Channels/ChannelsStore'
import {isLoadingChannel} from '../../Extensions/React'

const Channels = (props) => {
    const {
        setGoMembers,
        setBubbleNewChannel,
        setColorPage,
        colorPage,
        userData,
        setIdChannel,
        dispatch,
        ChannelsStore,
        setShowChannel,
        setIdShowChannel,
        setSearch,
        search,
        setHome
    } = props
    useEffect(() => {
        dispatch(getChannels())
      },[])
    useEffect(() => {
        dispatch(getChannels())
    },[ChannelsStore.addChannel])
    const getIdChannel = (e) => {
        setIdChannel(e)
        setGoMembers(true)
        setHome(true)
    }
    useEffect(() => {
        dispatch(Search(search))
    },[search])
    const channel = () => {
        return ChannelsStore.Channels.map(item => {
            return item.users ? (
                    item.users.map(user => {
                        return userData._id === user._id ? (
                                <div className='channelPerson' key={user._id} onClick={() => getIdChannel(item._id)}>
                                    <span>{item.name[0]+item.name[1]}</span>
                                    <span>{item.name}</span>
                                </div>
                        ) : (null)
                    })
            ) : (null)
        })
    }

    const chowChannelHandler = (e) => {
        setShowChannel(true)
        setIdShowChannel(e)
    }

    return (
        <Fragment>
            <div className={colorPage ? ('channels channelsWhite') : ('channels channelsDark')}>
                <div className='header'>
                    <label htmlFor='check'>{<UilTimesCircle />}</label>
                    <h1>Channels</h1>
                    <span onClick={() => setBubbleNewChannel(true)}>{<UilPlus />}</span>
                </div>
                <div className='search'>
                    <span>{<UilSearch size='17.06px'/>}</span>
                    <input onChange={(e) => setSearch(e.target.value)} value={search} type='search' placeholder='Search'/>
                </div>
                <div className='channel'>
                    {search ? (<span className='search'>Research results</span>) : (null)}
                    {search ? (
                        ChannelsStore.search.map(item => {
                            return(
                                <div className='channelPerson' key={item._id} onClick={() => chowChannelHandler(item._id)}>
                                    <span>{item.name[0]+item.name[1]}</span>
                                    <span>{item.name}</span>
                                </div>
                            )
                        })
                    ) : (
                        ChannelsStore.isLoading ? (isLoadingChannel()) : (channel())
                    )}
                </div>
                <div className='user'>
                    {<FooterUser 
                        setColorPage = {setColorPage}
                        colorPage = {colorPage}
                    />}
                </div>
            </div>
        </Fragment>
    )
}

export default Channels