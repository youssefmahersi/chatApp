import React from 'react'
import { UilPlus } from '@iconscout/react-unicons'

const Footer = () => {
    return (
        <div className='footerFind'>
            <div className='footer'>
                <ul className='languages'>
                    <h1>English (US)</h1>
                    <li>العربية</li>
                    <li>Français (France)</li>
                    <li>Русский</li>
                    <li>Deutsch</li>
                    <li>Bahasa Indonesia</li>
                    <li>Español</li>
                    <li>Türkçe</li>
                    <li>ภาษาไทย</li>
                    <li>Português (Brasil)</li>
                    <li>Italiano</li>
                    <span>{<UilPlus size='15px'/>}</span>
                </ul>
                <div className='line'>
                    <span></span>
                </div>
                <ul className='page'>
                    <li>Sign Up</li>
                    <li>Log In</li>
                    <li>Messenger</li>
                    <li>Services</li>
                    <li>Voting Information Center</li>
                    <li>Groups</li>
                    <li>About</li>
                    <li>Create Ad</li>
                    <li>Create Page</li>
                    <li>Developers</li>
                    <li>Careers</li>
                    <li>Privacy</li>
                    <li>Cookies</li>
                    <li>Ad choices</li>
                    <li>Terms</li>
                    <li>Help</li>
                    <li>Contact Uploading & Non-UsersSettings</li>
                </ul>
                <div className='company'>
                    <h1>Qandeeil © 2022</h1>
                </div>
            </div>
        </div>
    )
}

export default Footer