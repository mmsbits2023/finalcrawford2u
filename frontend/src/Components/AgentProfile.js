import React, { useState} from 'react'
//import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import profile from './profile.png'

const AgentProfile = () => {
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const { firstName, middleName, lastName,
        phoneNumber, whatsAppNumber, alternativeNumber,
        email, mpin, adharCard, panCard, buildingName, flatNumber,
        streetName, pinCode } = data;
        
      const response = await fetch("http://localhost:5050/agent/updateAgentDetails", {
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
        window.alert("Inavalid updated");
        console.log("Inavalid updated");
      }
      else {
        window.alert(" Profile update Successfully");
        console.log("Successfully updated profile");
        navigate('/agentLogout');
          
            
      }
    }
  
  return (
    <div>
      
      <div className="container mt-3 shadow-lg p-3" >
        <h2 className="text-center"> Agent Profile</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-1 register">
             <img
             /*style={{
                width:"150px",
                height:"150px",
                borderRadius:"50%",
                objectFit:"cover",
                border:"4px solid black"
             }} */
             style={{width:"250px",height:"250px", textAlign:"center"}}
             src={profile}alt=''/>
           
            </div><br/>
            <div className="mb-1 register">
                  <label htmlFor="MiddleNameId" className="form-label">
                    FirstName</label>
                      <input type="text" name="firstName" className="form-control" id="FirstNameId" //autocomplete="off"
              onChange={handleInput} />
           
            </div>
            <div className="mb-1 register">
                <label htmlFor="MiddleNameId" className="form-label">
                    MiddleName</label>
                      <input type="text" name="middleName" className="form-control" id="MiddleNameId" //autocomplete="off"
              onChange={handleInput} />
          </div>
          
            <div className="mb-1 register">
                <label htmlFor="LastNameId" className="form-label">
                    LastName </label>
                      <input type="text" name="lastName" className="form-control" id="LastNameId" //autocomplete="off"
              onChange={handleInput} />
           
            </div>
            <div className="mb-1 register">
                <label htmlFor="PhoneNumberId" className="form-label">
                    PhoneNumber</label>
                      <input type="text" name="phoneNumber" className="form-control" id="phoneNumber"//autocomplete="off"
              onChange={handleInput} />
                      </div>
            <div className="mb-1 register">
                <label htmlFor="whatsAppNumberId" className="form-label">
                    WhatsAppNumber </label>
                      <input type="text" name="whatsAppNumber" className="form-control" id="whatsAppNumberId" //autocomplete="off"
              onChange={handleInput} />
            
                  </div>
                  <div className="mb-1 register">
                <label htmlFor="AlternativeNumberId" className="form-label">
                    AlternativeNumber </label>
                      <input type="text" name="alternativeNumber" className="form-control" id="alternativeNumberId" //autocomplete="off"
              onChange={handleInput} />
            
            </div>
            <div className="mb-1 register">
                <label htmlFor="EmailId" className="form-label">
                    Email</label>
                      <input type="text" name="email" className="form-control" id="EmailId" //autoComplete='off'
              onChange={handleInput} />
            
                  </div>
                  <div className="mb-1 register">
                <label htmlFor="mpinId" className="form-label">
                    Password</label>
                      <input type="password" name="mpin" className="form-control" id="mpinId" //autoComplete='off'
              onChange={handleInput} />
           
            </div>
            <div className="mb-1 register">
                <label htmlFor="adharCardId" className="form-label">
                    AdharCard</label>
                      <input type="text" name="adharCard" className="form-control" id="adharCardId" //autoComplete='off'
              onChange={handleInput} />
            
          </div>
          
                   <div className="mb-1 register">
                <label htmlFor="panCardId" className="form-label">
                    PanCard</label>
                      <input type="text" name="panCard" className="form-control" id="panCardId" //autoComplete='off'
              onChange={handleInput} />
            
          </div>
          
            <div className="mb-1 register">
                <label htmlFor="buildingNameId" className="form-label">
                    BuildingName</label>
                      <input type="text" name="buildingName" className="form-control" id="buildingNameId" 
              onChange={handleInput} />
            
          </div>
          
                   <div className="mb-1 register">
                <label htmlFor="flatNumber" className="form-label">
                    FlatNumber</label>
                      <input type="text" name="flatNumber" className="form-control" id="flatNumberId"
              onChange={handleInput} />
            
          </div>
          
            <div className="mb-1 register">
                <label htmlFor="streetNameId" className="form-label">
                    StreetName</label>
                      <input type="text" name="streetName" className="form-control" id="streetNameId" //autocomplete="off"
              onChange={handleInput} />
            
          </div>
          
            <div className="mb-1 register">
                <label htmlFor="PincodeId" className="form-label">
                    Pincode</label>
                      <input type="text" name="pinCode" className="form-control" id="PincodeId" //autocomplete="off"
              onChange={handleInput} />
           
          </div>
          
          <br />
          <div>
          <NavLink to="/agentLogout"> Logout</NavLink>
          </div>
          
          <button type='submit'name="submit" className="btn btn-primary button">Update</button>
           
        </form>
          </div>
          
    </div>
  )
}

export default AgentProfile
