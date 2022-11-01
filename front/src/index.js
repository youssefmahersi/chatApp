import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHome from './App/AppHome';
import AppRegistration from './App/AppRegistration';
import AppPersonalInfo from './App/AppPersonalInfo';
import Store from './Store';
import { Provider } from 'react-redux';
import ForgotPassword from './Components/Registration/FindAccount/ForgotPassword/ForgotPassword';
import CheckAccount from './Components/Registration/FindAccount/CheckAccount/CheckAccount';
import ResetPassword from './Components/Registration/FindAccount/ResetPassword/ResetPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={Store}>
        <Routes>
          <Route path='/' element={<AppRegistration />}/>
          <Route path='/login/identify' element={<ForgotPassword />}/>
          <Route path='/login/:_id' element={<CheckAccount />}/>
          <Route path='/login/ResetPassword/:_id' element={<ResetPassword />}/>
          <Route path='/Home' element={<AppHome />}/>
          <Route path='/Profile/:username' element={<AppPersonalInfo />}/>
        </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
