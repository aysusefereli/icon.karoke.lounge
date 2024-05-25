import "./App.css";
import MainPage from "./components/MainPage";
import useLocalStorage from "use-local-storage";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  console.log(theme);

  return (
    <>
      <MainPage switchTheme={switchTheme} theme={theme} />
    </>
  );
}

export default App;
