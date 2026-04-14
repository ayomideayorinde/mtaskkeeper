import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useState } from "react"

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/invalid-credential":
      return "Incorrect email/password.";

    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/invalid-email":
      return "Please enter a valid email.";

    case "auth/weak-password":
      return "Password must be at least 6 characters.";

    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";

    default:
      return "Something went wrong. Please try again.";
  }
};

export function LoginForm({errr, setErrr, setIsLoggedIn, isLoggedIn, setIsLoading}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Handle Google Login
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            setIsLoggedIn(true);
            setIsLoading(true);
            navigate('/dashboard');
        } catch (error) {
            setErrr(`Google Login failed: ${error.code}`);
        } finally {
            setIsLoading(false);
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setErrr('');
        if(!email.trim()) {
            setErrr('Email is required');
            return;
        }
        if(!password.trim()) {
            setErrr('Password is required');
            return;
        }
        if(password.length < 6) {
            setErrr('Password must be at least 6 characters long');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setErrr('Log In Successfully')
            setEmail("")
            setPassword("")
            setTimeout(() => {
                setErrr("")
            }, 3000)
            setIsLoggedIn(!isLoggedIn)
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                navigate('/dashboard')
            }, 3000)

        } catch (error) {
            setErrr(getErrorMessage(error.code))
            setTimeout(() => {
                setErrr("")
            }, 3000)
        }
        
    }

  return (
    <div className="LoginForm">
      <form 
        action=""
        onSubmit={handleLogin}
    >
        {
            errr && <p className="text-red-600 text-left font-medium mb-3">{errr}</p>
        }
        <div className="text-left">
            <label htmlFor="email">Email <span className="text-red-600">*</span></label>
            <input type="email" name="email" id="email" className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mt-4 text-left">
            <label htmlFor="password">Password <span className="text-red-600">*</span></label>
            <input type="password" name="password" id="password" className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>
            <button 
                type="submit" 
                className="bg-blue-700 text-white py-2 rounded mt-4 w-full"
            >
                Login
            </button>
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