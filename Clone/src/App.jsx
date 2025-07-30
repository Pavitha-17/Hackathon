import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import SideBar from './widgets/SideBar';
import ChatList from './widgets/ChatList';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Status from './pages/Status';



const App = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatList clicked={clicked} />} />
        <Route path="/status" element={<Status />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
