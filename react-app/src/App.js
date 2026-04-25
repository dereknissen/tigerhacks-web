import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Pages */
import ComingSoon from './pages/ComingSoon/ComingSoon';
import NotFound from './pages/404/404';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<ComingSoon />} />
          <Route path = "*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
