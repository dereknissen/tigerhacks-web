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
import MlhBadge from './components/MlhBadge/MlhBadge';

import ClickSound from './assets/sounds/click.mp3';

export const WindowWidthContext = createContext();
export const ThemeContext = createContext();

const THEME_KEY = 'tigerhacks-theme';

export default function App() {

  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
  const [ isDark, setIsDark ] = useState(() => localStorage.getItem(THEME_KEY) === 'dark');

   useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
        // .theme-dark is set on <body> directly (not just the .App div)
        // because CSS custom properties only cascade to descendants —
        // body is App's ancestor, so its own background rule couldn't see
        // an override placed any lower than itself.
        document.body.classList.toggle('theme-dark', isDark);
    }, [isDark]);

    /* Plays a short click sound whenever any button (or button-styled link)
       is clicked, anywhere on the site — a single delegated listener so
       individual components don't each need their own audio wiring. A
       fresh Audio instance per click lets rapid clicks overlap instead of
       cutting each other off. */
    useEffect(() => {
        const onClick = (e) => {
            if (e.target.closest('button, a.btn')) {
                new Audio(ClickSound).play().catch(() => {});
            }
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);


  return (
    <div className="App">
      <MlhBadge />
      <WindowWidthContext.Provider value={windowWidth}>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
         <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Landing />} />
          <Route path = "/register" element = {<Register />} />
          <Route path = "/coming-soon" element = {<ComingSoon />} />
          <Route path = "*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </ThemeContext.Provider>
      </WindowWidthContext.Provider>

    </div>
  );
}

