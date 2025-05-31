import { createContext } from "react";
import type { ThemeContextType } from "../../types/theme";

const defaultValues: ThemeContextType = {
  theme: "light",
  setTheme: () => "",
};

export const ThemeContext = createContext<ThemeContextType>(defaultValues);
