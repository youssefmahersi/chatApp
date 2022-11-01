import React from 'react'

const PersonalInfo = (props) => {
    const {
        setGoChangeInfo,
        profilePhoto,
        name,
        username,
        bio,
        phone,
        email,
        colorPage
    } = props
    return (
        <div className={colorPage ? 'personalInfo personalInfoWhite' : 'personalInfo personalInfoDark'}>
            <div className='content'>
                <div className='headerForm'>
                    <h1>Personal info</h1>
                    <p>Basic info, like your name and photo</p>
                </div>
                <form>
                    <div className='profile'>
                        <div className='textProfile'>
                            <h1>Profile</h1>
                            <p>Some info may be visible to other people</p>
                        </div>
                        <span onClick={() => setGoChangeInfo(true)}>Edit</span>
                    </div>
                    <div className='photo image'>
                        <span>Photo</span>
                        <img src={profilePhoto}/>
                    </div>
                    <div className='name text'>
                        <span>Name</span>
                        <h1>{name}</h1>
                    </div>
                    <div className='username text'>
                        <span>Username</span>
                        <h1>{username}</h1>
                    </div>
                    <div className='bio text'>
                        <span>Bio</span>
                        <h1>{bio}</h1>
                    </div>
                    <div className='phone text'>
                        <span>Phone</span>
                        <h1>{phone}</h1>
                    </div>
                    <div className='email text'>
                        <span>Email</span>
                        <h1>{email}</h1>
                    </div>
                    <div className='password text'>
                        <span>Password</span>
                        <h1>*******</h1>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PersonalInfo