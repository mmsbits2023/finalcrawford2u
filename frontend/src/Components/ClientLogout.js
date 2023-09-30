
import React,{ useState} from 'react'
import './AgentClient.css';
import { useNavigate } from 'react-router-dom';

const ClientLogout = () => {
     const navigate = useNavigate();
    const [data, setData] = useState({
        email:'',
        clientPhoneNumber: '',
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
      validationErrors.email = "email is not valid"
    }

    if (!data.clientPhoneNumber) {
      validationErrors.clientPhoneNumber = 'PhoneNumber is required'
    } else if (data.clientPhoneNumber.length < 10) {
      validationErrors.clientPhoneNumber = "PhoneNumber should be at least 10 digit"
    } else if (data.clientPhoneNumber.length > 10) {
      validationErrors.clientPhoneNumber = "PhoneNumber should be at least 10 digit"
    }
        
    if (!data.mpin) {
      validationErrors.mpin = 'Password is required'
    } else if (data.mpin.length < 8) {
      validationErrors.mpin = "Password should be at least 8 char"
    } else if (data.mpin.length > 8) {
      validationErrors.mpin = "Password should be at least 8 char"
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { email, clientPhoneNumber, mpin } = data;
      const response = await fetch("https://finalcrawford.onrender.com/client/clientlogout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          clientPhoneNumber: clientPhoneNumber,
          mpin: mpin
        })
      });
      const result = await response.json();
      if (result.status === 422 || !data) {
        window.alert("Inavalid Login");
        console.log("Inavalid Login");
      }
      else {
        window.alert("Logout Successfully");
        console.log("Successfully Logout");
        navigate('/clientRegister');
          
            
      }
    }
  }

  return (
    <div>
      <div className="container mt-3 shadow-lg p-3">
        <h2 className="text-center">Client Logout Form</h2>
       <form onSubmit={handleSubmit}>
                  <div className="mb-1 data">
                <label for="EmailId" className="form-label">
                    Email: </label>
                      <input type="text" name="email" className="form-control" id="emailId" autocomplete="off"
              onChange={handleInput} />
             {errors.email && <span className='errorData'>{ errors.email}</span> }
               </div>     
            <div className="mb-1 data">
                <label for="clientPhoneNumberId" className="form-label">
                    PhoneNumber: </label>
                      <input type="text" name="clientPhoneNumber" class="form-control" id="clientPhoneNumberId" autocomplete="off"
              onChange={handleInput} />
             {errors.clientPhoneNumber && <span className='errorData'>{ errors.clientPhoneNumber}</span> }
            </div>
            <div className="mb-1 data">
                <label for="MpinId" className="form-label">
                    Password:</label>
                      <input type="password" name="mpin" className="form-control" id="mpinId" autocomplete="off"
              onChange={handleInput} />
             {errors.mpin && <span className='errorData'>{ errors.mpin}</span> }
            </div>
           
                  <button type="submit" name="submit" className="btn btn-primary">
                Logout
            </button>
        </form>
    </div>
    </div>
  )
}

export default ClientLogout
