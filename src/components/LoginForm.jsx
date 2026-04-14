import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useState } from "react"

const getErrorMessage = (errorCode) => {
    switch(errorCode) {
        case 'auth/user-not-found':
            return 'User not found. Please check your email.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/invalid-email':
            return 'Invalid email address.';
        case 'auth/user-disabled':
            return 'This user account has been disabled.';
        default:
            return 'Login failed. Please try again.';
    }
};

export function LoginForm({errr, setErrr, setIsLoggedIn, isLoggedIn, setIsLoading}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Handle Google Login
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
        setIsLoggedIn(true);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 3000);
    };


    const handleLogin = async (e) => {
        e.preventDefault();

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

        const email = e.target.email.value;
        const password = e.target.password.value;
        
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
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mt-4 text-left">
            <label htmlFor="password">Password</label>
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