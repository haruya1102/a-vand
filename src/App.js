//App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Components/Main';
import MyPage from './Components/MyPage';
import NoMatch from './Components/NoMatch';
import SignIn from './Components/SignIn';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './Components/Firebase';
import EventDetail from './Components/EventDetail';
import UserList from './Components/UserList';
import Chat from './Components/Chat';


const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div className=" min-h-screen bg-back" >
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route index element={(user ? <Main /> : <SignIn />)} />
        <Route path='/event/:id' element={<EventDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/chat/:participantId" element={<Chat />} />
      </Routes>
    </div >
  )
};

export default App;
