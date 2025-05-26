import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[status, setStatus] = useState("Connecting...")

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
      setStatus(err.message);
    });
  }, []);
  
  


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      <div className="card">
        {/* <button onClick={() => useState((status:number }> */}

          API is {status}

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
