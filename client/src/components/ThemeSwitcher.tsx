import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <button onClick={handleTheme} className="rounded-full cursor-pointer">
      {theme === "dark" ? (
        <Moon className="swap-on h-5 w-5 fill-current" />
      ) : (
        <Sun className="swap-on h-5 w-5 fill-current" />
      )}
    </button>
  );
}
