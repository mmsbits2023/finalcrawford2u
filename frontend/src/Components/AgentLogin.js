import React, { useState } from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import './AgentClient.css';

const AgentLogin = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        email:'',
        phoneNumber: '',
        mpin:''
    });
    const handleInput = (event) => { 
        setData({...data,[event.target.name]:event.target.value})
    }
    const [errors, setErrors] = useState('');
    const handleSubmit = async (e) => { 
        e.preventDefault();
        const validationErrors = {}
        if (!data.email) {
            validationErrors.email = "email is required"
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email)) {
            validationErrors.email="email is not valid"
        }

        if (!data.phoneNumber) {
            validationErrors.phoneNumber = 'PhoneNumber is required'
        } else if (data.phoneNumber.length <10) {
            validationErrors.phoneNumber="PhoneNumber should be at least 10 digit"
        }else if (data.phoneNumber.length >10) {
            validationErrors.phoneNumber="PhoneNumber should be at least 10 digit"
        }
        
        if (!data.mpin) {
            validationErrors.mpin = 'Password is required'
        } else if (data.mpin.length < 8 ) {
            validationErrors.mpin="Password should be at least 8 char"
         }else if (data.mpin.length > 8 ) {
            validationErrors.mpin="Password should be at least 8 char"
         }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const { email, phoneNumber, mpin } = data;
            const response = await fetch("https://finalcrawford.onrender.com/agent/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    phoneNumber: phoneNumber,
                    mpin: mpin
                })
            });
            const result = await response.json();
            if (result.status === 422 || !data) {
                window.alert("Inavalid Login");
                console.log("Inavalid Login");
            }
            else {
                window.alert("Login Successfully");
                console.log("Successfully Login");
                navigate('/agentLogout');
          
            
            }
        }
    }
    
  return (
    <div>
      <div className="container mt-3 shadow-lg p-3">
        <h2 className="text-center">Agent Login Form</h2>
       <form onSubmit={handleSubmit}>
             <div className="mb-1 data">
                <label htmlFor="EmailId" className="form-label">
                    Email: </label>
                      <input type="text" name="email" className="form-control" id="emailId" //autocomplete="off"
                          onChange={handleInput} />
                      {errors.email && <span className='errorData'>{ errors.email}</span> }
            </div>     
            <div className="mb-1 data">
                <label htmlFor="PhoneNumberId" className="form-label">
                    PhoneNumber: </label>
                      <input type="text" name="phoneNumber" className="form-control" id="phoneNumberId" //autocomplete="off"
                          onChange={handleInput} />
                       {errors.phoneNumber && <span className='errorData'>{ errors.phoneNumber}</span> }
            </div>
            <div className="mb-1 data">
                <label htmlFor="password1Id" className="form-label">
                    Password:</label>
                      <input type="password" name="mpin" className="form-control" id="password1Id" //autocomplete="off" 
                          onChange={handleInput} />
                       {errors.mpin && <span className='errorData'>{ errors.mpin}</span> }
            </div>
           <br/><br/>
                <button type="submit" name="submit" className="btn btn-primary">
                Login
                  </button><br/><br/>
          <p>Create new account and  register here ...</p>
           <NavLink to="/agentRegister"> Register</NavLink>
        </form>
    </div>
    </div>
  )
}

export default AgentLogin
