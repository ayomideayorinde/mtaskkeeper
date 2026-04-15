import { LuSquareCheck, LuLogOut, LuSun, LuMoon } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export function Header ({  setIsLoggedIn, darkMode, setDarkMode }) {
    const navigate = useNavigate();

    return (
        <div className="lg:py-5 py-2 lg:px-36 px-2 flex justify-between items-center shadow-xl sticky dark:bg-gradient-to-tr dark:from-gray-200 dark:via-gray-50 dark:to-gray-200 bg-gradient-to-tr from-blue-100 via-blue-50 to-blue-100">
            <div>
                <p className="flex items-center lg:text-3xl text-xl font-semibold gap-1 text-blue-700"><LuSquareCheck className="bg-blue-700 text-3xl p-1 lg:text-4xl text-white rounded" /> MTaskKeeper</p>
            </div>
            <button 
                onClick={() => setDarkMode(!darkMode)}
                className="bg-black dark:bg-white text-white dark:text-black py-2 px-2 rounded-full transition"
            >
                {darkMode ? 
                    <LuSun size={20} /> : 
                    <LuMoon size={20} />
                }
            </button>
            <div>
                <button 
                    className="flex items-center lg:text-xl text-md font-medium gap-1 hover:text-red-600 text-gray-400 group/logout"
                    onClick={()=>{
                        signOut(auth);
                        setIsLoggedIn(false);
                        navigate('/');
                    }}
                >
                    <LuLogOut className="text-gray-400 text-2xl p-1 lg:text-3xl rounded group-hover/logout:text-red-600" /> Logout
                </button>
            </div>
        </div>
    )
}