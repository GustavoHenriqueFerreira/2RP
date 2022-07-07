import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import Profile from './pages/Profile/profile';
import Login from './pages/Login/login';
import Geral from './pages/Geral/geral';

const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} /> {/* Login */}
        <Route path="/Geral" element={<Geral />} /> {/* Perfil usuário geral */}
        <Route path="/Perfil" element={<Profile />} /> {/* Perfil usuário root */}
        {/* <Route path="*" element={<NotFound/> } /> */}
      </Routes>
    </div>
  </Router>
)

ReactDOM.render(
  routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
