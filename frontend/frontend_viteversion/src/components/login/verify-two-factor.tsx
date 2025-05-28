import { ArrowLeft, Smartphone } from "lucide-react";
import type { VerifyTwoFactorTypes } from "../../types/login";

export function VerifyTwoFactor({
  VerifyTwoFactorCode,
  BackToLogin,
}: VerifyTwoFactorTypes) {
  return (
    <div className="space-y-6">
      <div className="flex max-sm:flex-col items-start sm:items-center justify-between gap-3">
        <button
          type="button"
          className="p-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          aria-label="Back to login"
          role="link"
          onClick={BackToLogin}
        >
          <ArrowLeft className="inline size-5" />
        </button>
        <div>
          <h1
            className="text-2xl font-bold text-slate-900 dark:text-slate-100"
            aria-label="Verify Two-Factor title"
            role="heading"
          >
            Autenticação de Dois Fatores
          </h1>
          <p
            className="text-sm text-slate-500 dark:text-slate-400"
            aria-label="Verify Two-Factor description"
            role="note"
          >
            Digite o código de 6 dígitos enviado para o seu dispositivo
          </p>
        </div>
      </div>
      <div
        className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        role="alert"
        aria-label="Verify Two-Factor alert"
      >
        <Smartphone className="size-6 text-blue-600 dark:text-blue-400" />
        <div>
          <p
            className="text-sm font-medium text-blue-900 dark:text-blue-100"
            aria-label="Verify Two-Factor alert title"
          >
            Aplicativo Autenticador
          </p>
          <span
            className="text-xs text-blue-700 dark:text-blue-300"
            aria-label="Verify Two-Factor alert description"
          >
            Abra seu app (Google Authenticator, Authy, etc.)
          </span>
        </div>
      </div>
      <form
        onSubmit={VerifyTwoFactorCode}
        className="space-y-4"
        aria-label="Verify Two-Factor form"
        role="form"
      >
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-800 dark:text-slate-200"
            htmlFor="code"
            aria-label="Code label"
            role="label"
          >
            Código de Verificação
          </label>
          <input
            type="text"
            id="code"
            className="w-full p-2 tracking-widest text-2xl text-center text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-2xl placeholder:text-center placeholder:font-mono placeholder:text-slate-500 dark:placeholder:text-slate-400"
            placeholder="000000"
            pattern="\d{3}\d{3}"
            autoComplete="one-time-code"
            aria-label="Verification code input"
            maxLength={6}
            required
          />
          <p
            className="text-center text-xs text-slate-500 dark:text-slate-400"
            role="note"
            aria-label="code input instruction"
          >
            Digite o código de 6 dígitos.
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-400"
          aria-label="Submit button for two-factor authentication"
        >
          Verificar Código
        </button>
      </form>
      <p
        className="mt-8 text-sm text-ceter text-slate-500 dark:text-slate-400"
        aria-label="Two-Factor help text"
        role="note"
      >
        Se você não recebeu o código, verifique se o seu dispositivo está
        conectado à internet ou
        <a
          href="#"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
          aria-label="Resend code link"
        >
          {" "}
          reenvie o código
        </a>
      </p>
    </div>
  );
}
