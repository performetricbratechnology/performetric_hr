import { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import HomeScreen from "./screens/loginpage";
import Reviews from "./screens/reviews";
import { Layout } from "./components/Layout";
import RegistrationsPage from "./screens/registrations";
import DevelopmentPlanPage from "./screens/development-plan";

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
        <Route
          path="/"
          element={
            <Layout>
              <Home status={status} />
            </Layout>
          }
        />
        <Route path="/login" element={<HomeScreen />} />
        <Route
          path="/reviews"
          element={
            <Layout>
              <Reviews />
            </Layout>
          }
        />
        <Route
          path="/registrations"
          element={
            <Layout>
              <RegistrationsPage />
            </Layout>
          }
        />
        <Route
          path="/development-plan"
          element={
            <Layout>
              <DevelopmentPlanPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
