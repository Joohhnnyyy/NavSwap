"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ColorTheme = "default" | "matrix" | "cyberpunk" | "volcanic" | "arctic" | "cobalt";

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("navswap-color-theme") as ColorTheme;
    if (savedTheme) {
      setColorTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("navswap-color-theme", colorTheme);
      // Here you could also apply global CSS classes or variables if needed
      // document.documentElement.setAttribute('data-color-theme', colorTheme);
    }
  }, [colorTheme, mounted]);

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
}
