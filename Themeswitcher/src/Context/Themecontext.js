import { useContext, createContext } from "react";

export const Themecontext = createContext(
    {
        Thememode : "light",
        darkmode : () => {},
        lightmode : () => {}
    }
);

export const ThemecontextProvider = Themecontext.Provider

export default  function usetheme(){
    return useContext(Themecontext)
}
