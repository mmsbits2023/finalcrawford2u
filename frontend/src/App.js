import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import PageNotFound from './Components/PageNotFound';
import ClientRegister from './Components/ClientRegister';
import AgentRegister from './Components/AgentRegister';
import ClientLogin from './Components/ClientLogin';
import AgentLogin from './Components/AgentLogin';
import AgentLogout from './Components/AgentLogout';
import ClientLogout from './Components/ClientLogout';
import AgentProfile from './Components/AgentProfile';
import ClientProfile from './Components/ClientProfile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' />
          <Route path="/agentLogout" element={ <AgentLogout/>}/>
          <Route path='clientProfile'element={<ClientProfile/>}/>
          <Route path="/agentProfile"element={<AgentProfile/>}/>
          <Route path="/clientLogout" element={<ClientLogout/>} />
          <Route path="/agentRegister" element={ <AgentRegister/>}/>
          <Route path="/clientRegister" element={<ClientRegister />} />
          <Route path="/agentLogin" element={<AgentLogin/> } />
          <Route path="/clientLogin"element={<ClientLogin/>}/>
          <Route path="/*"element={<PageNotFound/>}/>
        </Routes>
        
        </BrowserRouter>
    </div>
  );
}

export default App;
