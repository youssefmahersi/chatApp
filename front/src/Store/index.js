import { configureStore } from "@reduxjs/toolkit";
import SignupStore from "./Signup/SignupStore";
import SigninStore from "./Signin/SigninStore";
import verificationStore from './CheckVerification/CheckVerification'
import EditStore from "./EditPersonInfo/EditStore";
import UsersStore from "./getUsers/UsersStore";
import ChannelsStore from "./Channels/ChannelsStore";
import ChatStore from './chatChnnel/ChatStore'

const Store = configureStore({reducer:{
    SignupStore,
    SigninStore,
    verificationStore,
    EditStore,
    UsersStore,
    ChannelsStore,
    ChatStore
}})
export default Store