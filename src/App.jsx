import { Dashboard } from './pages/Dashboard';
import Index from './pages/Index';
import { NotFound } from './pages/NotFound';
import { Routes, BrowserRouter, Route } from 'react-router';
import { useState } from 'react';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" 
            element={<Index isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} 
          />
          <Route path='/dashboard' 
            element={isLoggedIn? 
              <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
              /> : 
              <Index isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}