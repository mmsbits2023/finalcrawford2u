import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
  <div className="container-fluid">
    <a className="navbar-brand m-2  navdata" href="/">Crawford2U</a>
    <button className="navbar-toggler" type="button"  data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className=" navbar-collapse" >
        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
           <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Register
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="/agentRegister">Agent</a></li>
            <li><a className="dropdown-item" href="/clientRegister">Client</a></li>
            
          </ul>
        </li>         
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Login
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="/agentLogin">Agent</a></li>
            <li><a className="dropdown-item" href="/clientLogin">Client</a></li>
            
          </ul>
        </li>       
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Profile
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="/agentProfile">Agent</a></li>
            <li><a className="dropdown-item" href="/clientProfile">Client</a></li>
            
          </ul>
        </li>       
            </ul>
         </div>
             </div>
   </nav>
    </div>
  )
}

export default Navbar