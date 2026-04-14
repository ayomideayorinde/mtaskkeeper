import { Header } from '../components/Header'
import { Tasks } from '../components/Tasks';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export function Dashboard({ setIsLoggedIn, isLoggedIn, currentUser }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userinfo = async () => {
        if (!currentUser?.uid) return;
          try {
              const userDocRef = doc(db, "users", currentUser.uid);

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
  }, [setIsLoggedIn, currentUser.uid]);

  

  return (
    <section className='Dashboard w-full'>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} />
      <div className='w-full flex flex-col p-4 lg:px-36 lg:gap-2 mt-3'>
        <p className='lg:text-xl text-md'>Hi <span className='font-bold'>{userName}</span>, Welcome to your dashboard!</p>
        <hr className='border-b-2' />
      </div>
      <Tasks currentUser={currentUser} isLoggedIn={isLoggedIn} />
    </section>
  );
}