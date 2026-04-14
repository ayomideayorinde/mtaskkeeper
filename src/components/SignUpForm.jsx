import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export function SignUpForm({errr, setErrr, successDisplay, setSuccessDisplay, setIsLoggedIn, setIsLoading}) {

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setIsLoading(true);
            await signInWithPopup(auth, provider);
            setIsLoggedIn(true);
            navigate('/dashboard');
        } catch (error) {
            setErrr(`Google Login failed. ${error.code}`);
        } finally {
            setIsLoading(false);
        }
    }

    const navigate = useNavigate(); 

    const handleSignUp = async (e) => {
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

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setDoc(doc(db, "users", userCredential.user.uid), {
                fName: fName,
                lName: lName,
                email: email,
            })
            setSuccessDisplay('Account created successfully! Redirecting to login...')
            setFName('')
            setLName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setTimeout(() => {
                setSuccessDisplay('')
            }, 3000)
            setIsLoading(true);
            setTimeout(()=>{
                setIsLoading(false);
                navigate('/dashboard')
            },3000)
        } catch (error) {
            setErrr(`${error.code === 'auth/email-already-in-use' ? 'Email is already in use. Please use a different email.' : `Sign Up failed. ${error.code}`}`);
            errdisplay
        }
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
                onClick={handleGoogleLogin}
            >
                <FaGoogle className="mr-2 text-blue-700" />
                Login with Google
            </button>
        </div>
      </form>
    </div>
  );
}