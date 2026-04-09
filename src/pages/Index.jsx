import { Login } from './Login';

export default function Index ({isLoggedIn, setIsLoggedIn}){
    return (
        <>
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </>
    )
};