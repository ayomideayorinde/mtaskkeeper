import { Header } from "../components/Header";
import { Tasks } from "../components/Tasks";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export function Dashboard({
  setIsLoggedIn,
  isLoggedIn,
  currentUser,
  darkMode,
  setDarkMode,
}) {
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        // If no user logged in
        if (!user) {
          setUserName("Guest");
          return;
        }

        // Get user document from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          setUserName(
            userData?.fName ||
              user.displayName ||
              user.email?.split("@")[0] ||
              "User"
          );
        } else {
          // For Google login users without Firestore profile
          setUserName(
            user.displayName ||
              user.email?.split("@")[0] ||
              "User"
          );
        }
      } catch (error) {
        console.error("Error fetching user info:", error);

        setUserName(
          user?.displayName ||
            user?.email?.split("@")[0] ||
            "Guest"
        );
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="Dashboard min-h-screen w-full bg-white dark:bg-black">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="w-full flex flex-col p-4 lg:px-36 lg:gap-2 mt-3">
        <p className="lg:text-xl text-md text-black dark:text-white">
          Hi{" "}
          <span className="font-bold dark:text-blue-300 text-blue-700">
            {userName}
          </span>
          , Welcome to your dashboard!
        </p>

        <hr className="border-b-2" />
      </div>

      <Tasks
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </section>
  );
}