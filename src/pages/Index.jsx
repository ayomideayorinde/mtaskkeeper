import { Login } from './Login';

export default function Index ({isLoggedIn, setIsLoggedIn, currentUser, darkMode, setDarkMode}) {
    return (
        <>
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} darkMode={darkMode} setDarkMode={setDarkMode} />
        </>
    )
};