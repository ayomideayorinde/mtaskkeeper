import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";

export function LoginForm({setIsLoggedIn, isLoggedIn, setIsLoading}) {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log({email, password});
        setIsLoggedIn(!isLoggedIn)
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false);
            navigate('/dashboard')
        },3000)
    }

  return (
    <div className="LoginForm">
      <form 
        action=""
        onSubmit={handleLogin}
    >
        <div className="text-left">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
        <div className="mt-4 text-left">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
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
                
            >
                <FaGoogle className="mr-2 text-blue-700" />
                Login with Google
            </button>
        </div>
      </form>
    </div>
  );
}