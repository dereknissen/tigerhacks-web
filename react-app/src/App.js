/* React Imports */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';

/* Styles */
import './styles/fonts.css';
import './styles/theme.css';
import './styles/main.css';

/* Pages */
import ComingSoon from './pages/ComingSoon/ComingSoon';
import Landing from './pages/Landing/Landing';
import Register from './pages/Register/Register';
import NotFound from './pages/404/404';

export const WindowWidthContext = createContext();

export default function App() {

  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);

   useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


  return (
    <div className="App">
      <WindowWidthContext.Provider value={windowWidth}>
         <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Landing />} />
          <Route path = "/register" element = {<Register />} />
          <Route path = "/coming-soon" element = {<ComingSoon />} />
          <Route path = "*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </WindowWidthContext.Provider>
       
    </div>
  );
}

