import { Dashboard } from './pages/Dashboard';
import Index from './pages/Index';
import { NotFound } from './pages/NotFound';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        setCurrentUser(user)
      } else {
        setIsLoggedIn(false)
        setCurrentUser(null)
      }
    })
    return unsubscribe
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" 
            element={<Index isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} darkMode={darkMode} setDarkMode={setDarkMode} />} 
          />
          <Route path='/dashboard' 
            element={isLoggedIn? 
              <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} darkMode={darkMode} setDarkMode={setDarkMode}
              /> : 
              <Index isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} darkMode={darkMode} setDarkMode={setDarkMode}
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}