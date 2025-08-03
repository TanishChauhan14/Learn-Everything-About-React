import { useEffect } from "react";
import React, { useState } from "react";
import { ThemecontextProvider } from "./Context/Themecontext"; 
import ThemeBtn from "./Context/ThemeBtn";
import Card from "./Context/Card";

const App = () => {
  const [Thememode, setthemeselect] = useState("light");

  const darkmode = () => {
    setthemeselect("dark");
  };

  const lightmode = () => {
    setthemeselect("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(Thememode);
  }, [Thememode]);

  return (
    <ThemecontextProvider value={{ Thememode, darkmode, lightmode }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            < ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
             < Card />
          </div>
         
        </div>
      </div>
    </ThemecontextProvider>
  );
};

export default App;
