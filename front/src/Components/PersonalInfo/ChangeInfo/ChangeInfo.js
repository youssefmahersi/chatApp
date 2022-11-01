import React, {useEffect,useState} from 'react'
import { UilPrevious } from '@iconscout/react-unicons'
import { UilCameraPlus } from '@iconscout/react-unicons'
import { useLocalStorage } from 'react-use-storage'
import { postEdit } from '../../../Store/EditPersonInfo/EditStore'
import { useDispatch, useSelector } from 'react-redux'

const ChangeInfo = ({setGoChangeInfo,profilePhoto,colorPage}) => {
    const dispatch = useDispatch();
    const {EditStore} = useSelector(state => state)
    const [userData,setUserData] = useLocalStorage('userData', [])
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [name,setName] = useState()
    const [bio,setBio] = useState()
    const [username,setUsername] = useState()
    const [phoneNumber,setPhoneNumber] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    const updateHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if(name){
            formData.append('name',name)
        }
        if(bio){
            formData.append('bio',bio)
        }
        if(username){
            formData.append('username',username)
        }
        if(phoneNumber){
            formData.append('phoneNumber',phoneNumber)
        }
        if(email){
            formData.append('email',email)
        }
        if(password){
            formData.append('password',password)
        }
        if(selectedFile){
            formData.append('profilePicture',selectedFile)
        }
        formData.append('_id',userData._id)
        dispatch(postEdit(formData))
    }
    useEffect(() => {
        if(EditStore.Result){
            if(EditStore.Result.update){
                window.location.reload();
            }
        }
    },[EditStore.Result])
    return (
        <div className={colorPage ? 'changeInfo changeInfoWhite' : 'changeInfo changeInfoDark'}>
            <div className='back' onClick={() => setGoChangeInfo(false)}>
                <span>{<UilPrevious size='30px'/>}</span>
                <h1>Back</h1>
            </div>
            <form>
                <div className='info'>
                    <h1>Change Info</h1>
                    <p>Changes will be reflected to every services</p>
                </div>
                <div className='image'>
                    <input onChange={onSelectFile} id='image' type='file' accept='image/*'/>
                    <label htmlFor='image'>
                        {preview ? (
                            <img src={preview}/>
                        ) : (
                            <img src={profilePhoto}/>
                        )}
                        <span>{<UilCameraPlus />}</span>
                    </label>
                    <label htmlFor='image'>CHANGE PHOTO</label>
                </div>
                <div className='name input'>
                    <input onChange={(e) => setName(e.target.value)} id='name' type='text' placeholder='Enter your name...'/>
                    <label htmlFor='name'>Name</label>
                </div>
                <div className='bio input'>
                    <textarea onChange={(e) => setBio(e.target.value)} id='bio' placeholder='Enter your bio...'/>
                    <label htmlFor='bio'>Bio</label>
                </div>
                <div className='username input'>
                    <input onChange={(e) => setUsername(e.target.value)} id='username' type='text' placeholder='Enter your username...'/>
                    <label htmlFor='username'>Username</label>
                </div>
                <div className='phone input'>
                    <input onChange={(e) => setPhoneNumber(e.target.value)} id='phone' type='text' placeholder='Enter your phone...'/>
                    <label htmlFor='phone'>Phone</label>
                </div>
                <div className='email input'>
                    <input onChange={(e) => setEmail(e.target.value)} id='email' type='email' placeholder='Enter your email...'/>
                    <label htmlFor='email'>Email</label>
                </div>
                <div className='password input'>
                    <input onChange={(e) => setPassword(e.target.value)} id='password' type='password' placeholder='Enter your password...'/>
                    <label htmlFor='password'>Password</label>
                </div>
                <button onClick={updateHandler}>Save</button>
            </form>
        </div>
    )
}

export default ChangeInfo