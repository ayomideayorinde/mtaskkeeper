import { LuSquareCheck } from "react-icons/lu";
import { LoginForm } from "../components/LoginForm";
import { SignUpForm } from "../components/SignUpForm";
import { useState, useEffect } from "react";

export function Login({isLoggedIn, setIsLoggedIn}) {
    const [isLogin, setIsLogin] = useState(true);
    const [errr, setErrr] = useState('');
    const [successDisplay, setSuccessDisplay] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        if(isLoading) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }, [isLoading]);

  return (
    <section className="min-h-[100vh] bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 p-4 flex items-center justify-center w-full">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <div className="space-y-1 flex flex-col items-center">
                    <h1 className="flex items-center text-4xl font-semibold gap-2 text-blue-700"><LuSquareCheck className="bg-blue-700 p-2 text-white rounded" /> MTaskKeeper</h1>
                    <p className="text-gray-600 text-lg">Organize your tasks, simplify your life</p>
                </div>
                <div className="flex items-center justify-center space-x-1 bg-gray-200 rounded p-1 w-full">
                    <button 
                        className={`${isLogin? 'bg-white':'bg-gray-300'} text-black py-2 w-full rounded font-medium`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button className={` ${!isLogin? 'bg-white':'bg-gray-300'} text-black py-2 font-medium w-full rounded`} onClick={() => setIsLogin(false)}>
                        Sign Up
                    </button>
                </div>
                <div className="w-full m-h-full mt-4">
                    {
                        isLogin ? 
                        <LoginForm successDisplay={successDisplay} setSuccessDisplay={setSuccessDisplay} errr={errr} setErrr={setErrr} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsLoading={setIsLoading} /> : 
                        <SignUpForm successDisplay={successDisplay} setSuccessDisplay={setSuccessDisplay} errr={errr} setErrr={setErrr} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsLoading={setIsLoading} />
                    }
                    {isLoading && 
                        <div 
                            className="fixed inset-0 w-full h-full bg-blue-700"
                        >
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <img src="./loading.gif" alt="" width={100} height={100} />
                                <p className="text-white text-lg mt-4">Loading...</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </section>
  );
}