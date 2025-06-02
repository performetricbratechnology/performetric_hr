import { useEffect, useState } from "react";
import type { ThemeContextProviderType, ThemeType } from "../../types/theme";
import { ThemeContext } from "./theme-context";

export function ThemeContextProvider({ children }: ThemeContextProviderType) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const localValue = localStorage.getItem("theme") as ThemeType;
    return ["dark", "light"].includes(localValue) ? localValue : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
