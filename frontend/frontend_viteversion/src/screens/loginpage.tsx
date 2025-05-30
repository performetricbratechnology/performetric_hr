import { useState } from "react";
import { Login } from "../components/login/login";
import { VerifyTwoFactor } from "../components/login/verify-two-factor"; // importe seu componente 2FA
import { HeaderLogin } from "../components/login/header-login";
import type { CurrentStepTypes } from "../types/login";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentStep, setCurrentStep] = useState<CurrentStepTypes>("login");
  // Estado para mensagens de erro
  const [errorMessage, setErrorMessage] = useState<string>("");


  const LoginWithEmailAndPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await fetch("http://localhost:5152/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mailId: email, passwordId: password }),
    });
    
    const data = await res.json();

    if (res.ok) {
      //Envia mensagem de sucesso
      setErrorMessage("");
      setCurrentStep("verify-2fa");
    } else {
      //mensagem de erro
      setErrorMessage(data.message || "");
    }
  };


  const VerifyTwoFactorCode = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const code = formData.get("code")?.toString();

    const res = await fetch("http://localhost:5152/api/auth/verify-2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login finalizado com sucesso!");
  
    } else {
      alert(data.message || "Código inválido.");
    }
  };

  // Voltar para tela de login
  const BackToLogin = () => {
    setCurrentStep("login");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <HeaderLogin />
      <main
        className="flex items-center justify-center py-6 sm:pt-8 px-4"
        aria-label="Main content"
        role="main"
      >
        <div
          className="bg-slate-50 dark:bg-gray-800 py-6 px-4 sm:px-8 rounded-lg shadow-lg border border-slate-200
          dark:border-slate-800 w-full max-w-md"
        >
        {currentStep === "login" && (
      <>
      
        <Login
          LoginWithEmailAndPassword={LoginWithEmailAndPassword}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        
        {errorMessage && (
          <div className="mt-4 text-red-600 font-medium text-sm text-center" role="alert" aria-live="assertive">
            {errorMessage}
          </div>
        )}
      </>
    )}


            
        
          {currentStep === "verify-2fa" && (
            <VerifyTwoFactor
              VerifyTwoFactorCode={VerifyTwoFactorCode}
              BackToLogin={BackToLogin}
            />
          )}
        </div>
      </main>
    </div>
  );
}
