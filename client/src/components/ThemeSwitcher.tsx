import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <label className="flex flex-row gap-2 items-center">
      {theme === "dark" ? (
        <Moon className="swap-on h-5 w-5 fill-current" />
      ) : (
        <Sun className="swap-on h-5 w-5 fill-current" />
      )}
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={handleTheme}
        className="toggle toggle-primary"
      />
    </label>
  );
}
