
import trees from './assets/trees.jpeg';
import {authentication} from "../firebase"
import {RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

import axios from 'axios';

const Login = () => {

  const[number, setNumber] = useState();
  const[expandForm, setExpandForm] = useState(false);
  const[otp, setOtp] = useState();

  const generateRecaptcha = () =>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
       
    }
  }, authentication);

  }

  const getOtp = async(e) => {
    e.preventDefault();
    if(number.length ===10){
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      console.log("+91" + number)
      signInWithPhoneNumber(authentication,"+91" + number,appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const navigate = useNavigate();
  const { setAccount, setLoginStatus, loginStatus } = useContext(LoginContext);

  const verifyOtp = () => {
    console.log(otp)
     if(otp.length === 6){
       let confirmationResult = window.confirmationResult;
       confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user.phoneNumber);
        setAccount(user.phoneNumber);
        setLoginStatus("true");

        axios.post('/api/login', {
          number: user.phoneNumber
        })
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
        
        navigate("/");
    
      }).catch((error) => {
        alert("Wrong OTP");
         console.log(error)
      });
     } 
  }

  return !loginStatus ? (
    <div className='w-full h-screen flex bg-gradient-to-r from-green-400 to-blue-500'>
        <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] bg-white'>
            <div className='w-full h-[550px] hidden md:block'>
                <img className='w-full h-full' src={trees} alt="/" />
            </div>
            <div className='p-4 flex flex-col justify-around'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <h2 className='text-4xl font-bold text-center mb-8'>Login/Signup</h2>
                   
                    <div>
                        <label className='text-xl font-semibold'>Phone Number</label>
                        <div className='w-full border-2 border-gray-300 p-2 rounded-lg mt-2'>
                        <span className='pr-1'>+91</span>
                        <input className='outline-none' type="number" name="mobile" placeholder='Enter your phone number' required  onChange={(e) => setNumber(e.target.value)}/> 
                        </div>
                           
                    </div>
                    
                    {expandForm === true?
                    <>
                    
                    <div className='my-3'>
                        <label className='text-xl font-semibold '> Please Enter Otp</label>
                        <input className='w-full border-2 border-gray-300 p-2 rounded-lg mt-2' type="text" name="otp" placeholder='Enter your otp' required onChange={(e) => setOtp(e.target.value)}/>
                    </div>
                  
                    <button className='w-full py-2 my-4 rounded-lg bg-green-400 to-blue-500 hover:bg-green-500' onClick={verifyOtp}>Verify</button>
                   
                    </>
                      :
                    null
                    }
                    {
                      expandForm === false?
                      <button className='w-full py-2 my-4 rounded-lg bg-green-400 to-blue-500 hover:bg-green-500' onClick={getOtp}>Generate Otp</button>
                      :
                      null
                    }
                    <div id = "recaptcha-container"></div>
                </form>
            </div>
        </div>
    </div>
  ) : (<>
  <h1>You are logged in!!</h1>
  </>)
}

export default Login;