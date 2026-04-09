import { FaGoogle } from "react-icons/fa";
//import { useState } from "react";
import { useNavigate } from "react-router";
import { SignUpConfig } from "../config/signUp";

export function SignUpForm({errr, setErrr, successDisplay, setSuccessDisplay, setIsLoggedIn, isLoggedIn, setIsLoading}) {

    const navigate = useNavigate(); 
    const { fName, setFName, lName, setLName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword } = SignUpConfig();

    const handleSignUp = (e) => {
        e.preventDefault();
        setErrr('');
        if(!fName.trim()) {
            setErrr('First name is required');
            errdisplay
            return;
        }
        if(!email.trim()) {
            setErrr('Email is required');
            errdisplay
            return;
        }
        if(!password.trim()) {
            setErrr('Password is required');
            errdisplay
            return;
        }
        if(password.length < 6) {
            setErrr('Password must be at least 6 characters long');
            errdisplay
            return;
        }
        if(!confirmPassword.trim()) {
            setErrr('Please confirm your password');
            errdisplay
            return;
        }
        if(password !== confirmPassword) {
            setErrr('Passwords do not match');
            errdisplay
            return;
        }
        setFName('')
        setLName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setSuccessDisplay('Login Successfully!')
        setTimeout(()=>{
            setSuccessDisplay('')
            setIsLoggedIn(!isLoggedIn)
            navigate('/dashboard')
        },2000)
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false);
            navigate('/dashboard')
        },3000)
    }

    const errdisplay = 
        setTimeout(()=>{
            setErrr('')
        },3000)

  return (
    <div className="SignUpForm">
      {
        errr && <p className="text-red-600 text-left font-medium mb-3">{errr}</p>
      }
      <form 
        action=""
        onSubmit={handleSignUp}
    >
        <div className="text-left">
          <label htmlFor="fName">First Name <span className="text-red-500">*</span></label>
          <input type="text" name="fName" id="fName" className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          />
        </div>
        <div className="mt-4 text-left">
            <label htmlFor="lName">Last Name</label>
            <input type="text" name="lName" id="lName" className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            />
        </div>
        <div className="mt-4 text-left">
            <label htmlFor="email">Email <span className="text-red-500">*</span></label>
            <input type="email" name="email" id="email" className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mt-4 text-left">
            <label htmlFor="password">Password <span className="text-red-500">*</span></label>
            <input type="password" name="password" id="password" className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="mt-4 text-left">
            <label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></label>
            <input type="password" name="confirmPassword" id="confirmPassword" className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>
        {successDisplay && <p className='text-blue-700 font-medium text-left mt-3'>{successDisplay}</p>}
        <div>
            <button type="submit" className="bg-blue-700 text-white py-2 rounded mt-4 w-full">Create Account</button>
            <button 
                className="bg-white text-black py-2 rounded mt-2 w-full border border-blue-700 flex items-center justify-center"
                
            >
                <FaGoogle className="mr-2 text-blue-700" />
                Login with Google
            </button>
        </div>
      </form>
    </div>
  );
}