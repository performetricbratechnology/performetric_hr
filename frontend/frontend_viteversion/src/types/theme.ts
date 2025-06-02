import type React from "react";

export type ThemeType = "dark" | "light";

export type ThemeContextProviderType = {
  children: React.ReactNode;
};

export type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};
