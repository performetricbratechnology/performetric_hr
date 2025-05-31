import LogoLight from "../../assets/images/logo/logo-light.png";
import LogoDark from "../../assets/images/logo/logo-dark.png";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/theme";

export function HeaderLogin() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className="flex items-center justify-between max-w-screen-xl mx-auto py-4 px-2 sm:py-6 sm:px-6 lg:px-8"
      aria-label="Header for login page"
      role="banner"
    >
      <img
        src={theme === "dark" ? LogoDark : LogoLight}
        alt="performetric logo"
        className="w-40"
      />
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
        aria-label="Toggle theme"
        role="switch"
      >
        {theme === "dark" ? (
          <Sun className="size-6 text-yellow-400" />
        ) : (
          <Moon className="size-6 text-slate-50" />
        )}
      </button>
    </header>
  );
}
