import { LuSquareCheck, LuLogOut } from "react-icons/lu"
import { useNavigate } from "react-router"

export function Header ({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    return (
        <div className="lg:py-5 py-2 lg:px-36 px-2 flex justify-between items-center shadow-xl sticky bg-gradient-to-tr from-blue-100 via-blue-50 to-blue-100">
            <div>
                <p className="flex items-center lg:text-3xl text-xl font-semibold gap-1 text-blue-700"><LuSquareCheck className="bg-blue-700 text-3xl p-1 lg:text-4xl text-white rounded" /> MTaskKeeper</p>
            </div>
            <div>
                <button 
                    className="flex items-center lg:text-xl text-md font-medium gap-1 text-red-600"
                    onClick={() => {
                        setIsLoggedIn(!isLoggedIn);
                        navigate('/');
                    }}
                >
                    <LuLogOut className="bg-red-600 text-2xl p-1 lg:text-3xl text-white rounded" /> Logout
                </button>
            </div>
        </div>
    )
}