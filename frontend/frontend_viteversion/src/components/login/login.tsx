import { Shield } from "lucide-react";
import type { LoginTypes } from "../../types/login";

export function Login({
  LoginWithEmailAndPassword,
  email,
  setEmail,
  password,
  setPassword,
}: LoginTypes) {
  return (
    <div className="space-y-6">
      <div className="flex max-sm:flex-col-reverse items-start sm:items-center justify-between gap-2">
        <div>
          <h1
            className="text-2xl font-bold text-slate-900 dark:text-slate-100"
            aria-label="Login title"
            role="heading"
          >
            Entrar
          </h1>
          <p
            className="text-sm text-slate-500 dark:text-slate-400"
            aria-label="Login description"
            role="note"
          >
            Entre na sua conta com autenticação dupla
          </p>
        </div>
        <span
          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-200/60 
          dark:bg-slate-700 px-2 py-1 rounded-full"
          aria-label="Two-factor authentication badge"
          role="status"
        >
          <Shield className="size-4 text-blue-500" />
          2FA
        </span>
      </div>

      <form
        onSubmit={LoginWithEmailAndPassword}
        className="space-y-4"
        aria-label="Login form"
        role="form"
      >
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-800 dark:text-slate-200"
            aria-label="Email label"
            role="label"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-800 dark:text-slate-200"
            aria-label="Password label"
            role="label"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
            placeholder="Digite sua senha"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 focus:outline-blue-400 dark:focus:outline-blue-500 text-white 
          font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-400"
          aria-label="Submit button for login"
          role="button"
        >
          Continuar
        </button>
      </form>

      <div className="grid justify-center items-center gap-2 mt-8">
        <p
          className="flex justify-center items-center gap-2 text-xs text-slate-500 dark:text-slate-400 text-center"
          aria-label="Two-factor authentication info"
          role="note"
        >
          <Shield className="size-3" />
          Protegido com autenticação de dois fatores
        </p>
        <p
          className="text-xs text-slate-500 dark:text-slate-400 text-center"
          aria-label="Two-factor authentication instructions"
          role="note"
        >
          Após inserir suas credenciais, você precisará confirmar com seu
          aplicativo autenticador.
        </p>
      </div>
    </div>
  );
}
