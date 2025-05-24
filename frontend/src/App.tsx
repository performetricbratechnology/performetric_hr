import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const[status, setStatus] = useState("Conectando...")

  useEffect(() => {
    console.log("Tentando conectar")
    fetch("http://localhost:5152/api/test")
    .then((res) => {
      if (res.ok) {
        setStatus(`Status HTTP: ${res.status}`);
      }
      
      else {
        setStatus("Falhou ao conectar com a API");        
      }
    })
    .catch((err) => {
      setStatus("Erro ao conectar " + err.message);
    });
  }, []);




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Status da conexão: {status}
        </p>
      </header>
    </div>
  );
}

export default App;
