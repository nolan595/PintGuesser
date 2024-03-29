import React, {useContext, createContext, useState} from "react";
const StateContext = createContext();


export const ContextProvider = ({children}) => {
    const [pubData, setPubData] = useState({});
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [score, setScore] = useState(0);


return (
    <StateContext.Provider
    value={{
        pubData, setPubData,
        isAnswerCorrect, setIsAnswerCorrect,
        score, setScore
    }}>
       {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);

