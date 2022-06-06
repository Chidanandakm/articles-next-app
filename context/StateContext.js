import {createContext, useContext, useEffect, useState} from "react";

const context = createContext();

export const StateContext = ({children}) => {
   const [filteredArticles, setFilteredArticles] = useState([]);
   const [text, setText] = useState("");
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState({});
   useEffect(() => {
      if (localStorage.getItem("token")) {
         setIsLoggedIn(true);
      }
   }, []);

   return (
      <context.Provider
         value={{user, setUser, isLoggedIn, setIsLoggedIn, text, setText, filteredArticles, setFilteredArticles}}
      >
         {children}
      </context.Provider>
   );
};

export const useStateContext = () => useContext(context);
