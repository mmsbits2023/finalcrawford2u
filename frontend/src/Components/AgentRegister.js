import React, { useState} from 'react'
//import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AgentRegister = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        whatsAppNumber: '',
        alternativeNumber: '',
        email: '',
        mpin:'',
        adharCard: '',
        panCard: '',
        buildingName: '',
        flatNumber: '',
        streetName: '',
        pinCode: ''
    })
    const handleInput = (event) => { 
        setData({ ...data, [event.target.name]: event.target.value })
  }
  

/*function handleSubmit(event) { 
        event.preventDefault()
        console.log("all data......", data);
        axios.post('http://localhost:5050/agent/register', { data })
            .then(response => console.log(response))
        .catch(err=>console.log(err))
    }*/
  const [errors, setErrors] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {}

    if (!data.firstName) { 
      validationErrors.firstName='FirstName is required'
    }
     if (!data.middleName) { 
      validationErrors.middleName='MiddleName is required'
    }
     if (!data.lastName) { 
      validationErrors.lastName='LastName is required'
    }

    if (!data.phoneNumber) {
      validationErrors.phoneNumber = 'PhoneNumber is required'
    } else if (data.phoneNumber.length < 10) {
      validationErrors.phoneNumber = "PhoneNumber should be at least 10 digit"
    } else if (data.phoneNumber.length > 10) {
      validationErrors.phoneNumber = "PhoneNumber should be at least 10 digit"
    }
        
    if (!data.whatsAppNumber) {
      validationErrors.whatsAppNumber = 'whatsAppNumber is required'
    } else if (data.whatsAppNumber.length < 10) {
      validationErrors.whatsAppNumber = "whatsAppNumber should be at least 10 digit"
    } else if (data.whatsAppNumber.length > 10) {
      validationErrors.whatsAppNumber = "whatsAppNumber should be at least 10 digit"
    }
          
    if (!data.alternativeNumber) {
      validationErrors.alternativeNumber = 'alternativeNumber is required'
    } else if (data.alternativeNumber.length < 10) {
      validationErrors.alternativeNumber = "alternativeNumber should be at least 10 digit"
    } else if (data.alternativeNumber.length > 10) {
      validationErrors.alternativeNumber = "alternativeNumber should be at least 10 digit"
    }
    
    if (!data.email) {
      validationErrors.email = "email is required"
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email)) {
      validationErrors.email = "email is not valid"
    }

    if (!data.mpin) {
      validationErrors.mpin = 'Password is required'
    } else if (data.mpin.length < 8) {
      validationErrors.mpin = "Password should be at least 8 char"
    } else if (data.mpin.length > 8) {
      validationErrors.mpin = "Password should be at least 8 char"
    }
               
    if (!data.adharCard) {
      validationErrors.adharCard = 'Adharcard number is required'
    } else if (data.adharCard.length < 12) {
      validationErrors.adharCard = "Adharcard number should be at least 12 digit"
    } else if (data.adharCard.length > 12) {
      validationErrors.adharCard= "Adharcard number should be at least 12 digit"
    }
          
    if (!data.panCard) {
      validationErrors.panCard = 'Pancard number is required'
    } else if (data.panCard.length < 10) {
      validationErrors.panCard = "Pancard number should be at least 10 digit"
    } else if (data.panCard.length > 10) {
      validationErrors.panCard = "Pancard number should be at least 10 digit"
    }
    if (!data.buildingName) { 
      validationErrors.buildingName='BuildingName is required'
    }

     if (!data.flatNumber) { 
      validationErrors.flatNumber='FlatNumber is required'
    }
     
     if (!data.streetName) { 
      validationErrors.streetName='StreetName is required'
    }

    if (!data.pinCode) {
      validationErrors.pinCode = 'Pincode is required'
    } else if (data.pinCode.length < 6) {
      validationErrors.pinCode = "Pincode should be at least 6 digit"
    } else if (data.pinCode.length > 6) {
      validationErrors.pinCode = "Pincode should be at least 6 digit"
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { firstName, middleName, lastName,
        phoneNumber, whatsAppNumber, alternativeNumber,
        email, mpin, adharCard, panCard, buildingName, flatNumber,
        streetName, pinCode } = data;
        
      const response = await fetch("https://finalcrawford.onrender.com/agent/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          whatsAppNumber: whatsAppNumber,
          alternativeNumber: alternativeNumber,
          email: email,
          mpin: mpin,
          adharCard: adharCard,
          panCard: panCard,
          buildingName: buildingName,
          flatNumber: flatNumber,
          streetName: streetName,
          pinCode: pinCode
        })
        
      })
      
      const result = await response.json();

      if (result.status === 422 || !data) {
        window.alert("Inavalid Registeration");
        console.log("Inavalid Registration");
      }
      else {
        window.alert("Registeration Successfully");
        console.log("Successfully Registration");
        navigate('/agentLogin');
          
            
      }
    }
  }
  return (
    <div>
      
      <div className="container mt-3 shadow-lg p-3" >
        <h2 className="text-center">Agent Registration Form</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-1 register">
                  <label htmlFor="MiddleNameId" className="form-label">
                    FirstName</label>
                      <input type="text" name="firstName" className="form-control" id="FirstNameId" //autocomplete="off"
              onChange={handleInput} />
            {errors.firstName && <span className='errorData'>{ errors.firstName}</span> }
            </div>
            <div className="mb-1 register">
                <label htmlFor="MiddleNameId" className="form-label">
                    MiddleName</label>
                      <input type="text" name="middleName" className="form-control" id="MiddleNameId" //autocomplete="off"
              onChange={handleInput} />
            {errors.middleName && <span className='errorData'>{ errors.middleName}</span> }
            </div>
            <div className="mb-1 register">
                <label htmlFor="LastNameId" className="form-label">
                    LastName </label>
                      <input type="text" name="lastName" className="form-control" id="LastNameId" //autocomplete="off"
              onChange={handleInput} />
            {errors.lastName && <span className='errorData'>{ errors.lastName}</span> }
            </div>
            <div className="mb-1 register">
                <label htmlFor="PhoneNumberId" className="form-label">
                    PhoneNumber</label>
                      <input type="text" name="phoneNumber" className="form-control" id="phoneNumber"//autocomplete="off"
              onChange={handleInput} />
            {errors.phoneNumber && <span className='errorData'>{ errors.phoneNumber}</span> }
            </div>
            <div className="mb-1 register">
                <label htmlFor="whatsAppNumberId" className="form-label">
                    WhatsAppNumber </label>
                      <input type="text" name="whatsAppNumber" className="form-control" id="whatsAppNumberId" //autocomplete="off"
              onChange={handleInput} />
            {errors.whatsAppNumber && <span className='errorData'>{ errors.whatsAppNumber}</span> }
                  </div>
                  <div className="mb-1 register">
                <label htmlFor="AlternativeNumberId" className="form-label">
                    AlternativeNumber </label>
                      <input type="text" name="alternativeNumber" className="form-control" id="alternativeNumberId" //autocomplete="off"
              onChange={handleInput} />
            {errors.alternativeNumber && <span className='errorData'>{ errors.alternativeNumber}</span> }
            </div>
            <div className="mb-1 register">
                <label htmlFor="EmailId" className="form-label">
                    Email</label>
                      <input type="text" name="email" className="form-control" id="EmailId" //autoComplete='off'
              onChange={handleInput} />
            {errors.email && <span className='errorData'>{ errors.email}</span> }
                  </div>
                  <div className="mb-1 register">
                <label htmlFor="mpinId" className="form-label">
                    Password</label>
                      <input type="password" name="mpin" className="form-control" id="mpinId" //autoComplete='off'
              onChange={handleInput} />
            {errors.mpin && <span className='errorData'>{ errors.mpin}</span> }
            </div>
            <div className="mb-1 register">
                <label htmlFor="adharCardId" className="form-label">
                    AdharCard</label>
                      <input type="text" name="adharCard" className="form-control" id="adharCardId" //autoComplete='off'
              onChange={handleInput} />
            {errors.adharCard && <span className='errorData'>{ errors.adharCard}</span> }
          </div>
          
                   <div className="mb-1 register">
                <label htmlFor="panCardId" className="form-label">
                    PanCard</label>
                      <input type="text" name="panCard" className="form-control" id="panCardId" //autoComplete='off'
              onChange={handleInput} />
            {errors.panCard && <span className='errorData'>{ errors.panCard}</span> }
          </div>
          
            <div className="mb-1 register">
                <label htmlFor="buildingNameId" className="form-label">
                    BuildingName</label>
                      <input type="text" name="buildingName" className="form-control" id="buildingNameId" 
              onChange={handleInput} />
            {errors.buildingName && <span className='errorData'>{ errors.buildingName}</span> }
          </div>
          
                   <div className="mb-1 register">
                <label htmlFor="flatNumber" className="form-label">
                    FlatNumber</label>
                      <input type="text" name="flatNumber" className="form-control" id="flatNumberId"
              onChange={handleInput} />
            {errors.flatNumber && <span className='errorData'>{ errors.flatNumber}</span> }
          </div>
          
            <div className="mb-1 register">
                <label htmlFor="streetNameId" className="form-label">
                    StreetName</label>
                      <input type="text" name="streetName" className="form-control" id="streetNameId" //autocomplete="off"
              onChange={handleInput} />
            {errors.streetName && <span className='errorData'>{ errors.streetName}</span> }
          </div>
          
            <div className="mb-1 register">
                <label htmlFor="PincodeId" className="form-label">
                    Pincode</label>
                      <input type="text" name="pinCode" className="form-control" id="PincodeId" //autocomplete="off"
              onChange={handleInput} />
            {errors.pinCode && <span className='errorData'>{ errors.pinCode}</span> }
          </div>
          
          <br /><br />
          
            <button type="submit" name="submit" className="btn btn-primary button">
            Register
          </button>
          <p>I am already register here...</p>
           <NavLink to="/agentLogin"> Login</NavLink>
        </form>
          </div>
          
    </div>
  )
}

export default AgentRegister
