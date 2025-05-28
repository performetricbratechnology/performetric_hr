import { useState } from "react";
import { Login } from "../components/login/login";
import { HeaderLogin } from "../components/login/header-login";
import { VerifyTwoFactor } from "../components/login/verify-two-factor";
import type { CurrentStepTypes } from "../types/login";

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState<CurrentStepTypes>("login");

  const handleTwoFactorVerification = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentStep("login");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentStep("verify-2fa");
  };

  return (
    <>
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
              <Login LoginWithEmailAndPassword={handleSubmit} />
            )}
            {currentStep === "verify-2fa" && (
              <VerifyTwoFactor
                VerifyTwoFactorCode={handleTwoFactorVerification}
                BackToLogin={() => setCurrentStep("login")}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
