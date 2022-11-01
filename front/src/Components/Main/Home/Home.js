import React from 'react'
import { isLoadingChat } from '../../Extensions/React'

const Home = ({colorPage}) => {
    return(
        <div className={colorPage ? 'home homeWhite' : 'home homeDark'}>
            <h1>Welcome to the chat app</h1>
            <span>{isLoadingChat()}</span>
        </div>
    )
}
export default Home;