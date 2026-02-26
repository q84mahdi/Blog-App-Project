import { useDarkMode } from "@/contexts/DarkModeContext";
import ButtonIcon from "@/ui/ButtonIcon";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function ToggleThemeButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    //  Now we are sure that the component is mounted
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ButtonIcon onClick={toggleDarkMode} variant="primary">
      {isDarkMode ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </ButtonIcon>
  );
}
export default ToggleThemeButton;
