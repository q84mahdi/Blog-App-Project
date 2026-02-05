"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// Types Definition
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: Dispatch<SetStateAction<boolean>>;
}

// Data initialization
const DarkModeContext = createContext<DarkModeContextType>(
  {} as DarkModeContextType,
);

// Provider Component
export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const storedValue = localStorage.getItem("isDarkMode");

    return storedValue
      ? JSON.parse(storedValue)
      : typeof window !== "undefined" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom Hook
export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");

  return context;
}
