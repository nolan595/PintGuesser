import React, {useContext, createContext, useState} from "react";
const StateContext = createContext();


export const ContextProvider = ({children}) => {
    const [pubData, setPubData] = useState({});
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);


return (
    <StateContext.Provider
    value={{
        pubData, setPubData,
        isAnswerCorrect, setIsAnswerCorrect
    }}>
       {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);

