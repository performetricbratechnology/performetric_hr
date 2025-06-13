import LogoLight from "../assets/images/logo/logo-light.png";
import LogoDark from "../assets/images/logo/logo-dark.png";
import { useTheme } from "../contexts/theme";
import {
  Award,
  ChartColumn,
  Home,
  Menu,
  Settings,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { Separator } from "./separator";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Boards = [
  { label: "Início", href: "/", icon: <Home />, end: true },
  { label: "Cadastros", href: "/registrations", icon: <Users /> },
  { label: "Avaliações", href: "/reviews", icon: <UserCheck /> },
  { label: "Meu Painel", href: "/employee-dashboard", icon: <ChartColumn /> },
  { label: "Painel Líder", href: "/leader-dashboard", icon: <Target /> },
  { label: "PDI", href: "/development-plan", icon: <TrendingUp /> },
  { label: "Rankings", href: "/rankings", icon: <Award /> },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <aside
      className={`fixed h-screen ${
        isOpen ? "w-60" : "w-14 sm:w-18"
      } transition-all duration-300 bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-slate-100 shadow z-10`}
      role="menubar"
      aria-label="sidebar"
    >
      <header
        className={`flex ${
          isOpen ? "justify-between" : "justify-center"
        } items-center pt-4 pb-2 px-2 sm:px-4`}
        aria-label="header"
      >
        {isOpen && (
          <img
            src={theme === "dark" ? LogoDark : LogoLight}
            alt="performetric logo"
            className="w-36 select-none pointer-events-none transition-all"
          />
        )}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-1 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
          aria-label="toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </header>
      <Separator />
      <nav className="px-2 sm:px-4 py-6 space-y-4" aria-label="menu navigation">
        <ul className="space-y-1" aria-label="menu navigation list">
          {Boards.map((link) => (
            <li
              key={link.label}
              className="*:flex *:gap-1 *:items-center *:py-2 *:rounded-lg *:hover:bg-slate-200 *:dark:hover:bg-slate-700"
              aria-label="menu navigation link"
            >
              <NavLink
                to={link.href}
                onClick={() => isOpen && setIsOpen(false)}
                className="aria-[current=page]:bg-slate-200 aria-[current=page]:dark:bg-slate-700 overflow-hidden text-ellipsis text-nowrap"
                end={link.end}
              >
                <span className="px-2">{link.icon}</span>
                <span
                  className={`${
                    isOpen ? "w-auto" : "w-0"
                  } transition-all duration-2000`}
                >
                  {link.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        <Separator />
        <ul className="space-y-1" aria-label="menu navigation list">
          <li
            className="*:flex *:gap-1 *:items-center *:py-2 *:rounded-lg *:hover:bg-slate-200 *:dark:hover:bg-slate-700"
            aria-label="menu navigation link"
          >
            <NavLink
              to="/settings"
              onClick={() => isOpen && setIsOpen(false)}
              className="aria-[current=page]:bg-slate-200 aria-[current=page]:dark:bg-slate-700 overflow-hidden text-ellipsis text-nowrap"
            >
              <span className="px-2">
                <Settings />
              </span>
              <span
                className={`${
                  isOpen ? "w-auto" : "w-0"
                } transition-all duration-2000`}
              >
                Configurações
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
