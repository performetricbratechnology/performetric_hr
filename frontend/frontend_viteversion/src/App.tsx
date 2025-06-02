import { useEffect, useState } from 'react';
import "./App.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import HomeScreen from './screens/loginpage';
import Reviews from './screens/reviews';

function App() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    fetch("http://localhost:5152/api/test")
      .then((res) => {
        if (res.ok) {
          setStatus(`Status HTTP: ${res.status}`);
        } else {
          setStatus("Falhou ao conectar com a API");
        }
      })
      .catch((err) => {
        setStatus(err.message);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home status={status} />} />
        <Route path="/login" element={<HomeScreen />} />
        <Route path='/reviews' element={<Reviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

