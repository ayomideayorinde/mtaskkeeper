import { Header } from '../components/Header'
import { Tasks } from '../components/Tasks';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export function Dashboard({ setIsLoggedIn, isLoggedIn, currentUser, darkMode, setDarkMode }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userinfo = async () => {
        if (!user) return;
          try {
              const userDocRef = doc(db, "users", user.uid);

              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserName(`${userData?.fName || 'User'}`);
              } else {
                setUserName(user.displayName);
              }
            } catch (error) {
              console.error("Error fetching user info:", error);
              setUserName('Guest');
            }
          };
      userinfo();
    });
    return unsubscribe;
  }, [setIsLoggedIn, currentUser?.uid]);

  

  return (
    <section className='Dashboard min-h-screen w-full bg-white dark:bg-black'>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className='w-full flex flex-col p-4 lg:px-36 lg:gap-2 mt-3'>
        <p className='lg:text-xl text-md text-black dark:text-white'>Hi <span className='font-bold dark:text-blue-300 text-blue-700'>{userName}</span>, Welcome to your dashboard!</p>
        <hr className='border-b-2' />
      </div>
      <Tasks currentUser={currentUser} isLoggedIn={isLoggedIn} darkMode={darkMode} setDarkMode={setDarkMode} />
    </section>
  );
}