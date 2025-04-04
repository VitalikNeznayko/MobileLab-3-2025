import React, { createContext, useState, useContext } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [actions, setActions] = useState({
    singleClick: 0,
    doubleClick: 0,
    longPress: 0,
    flingRight: 0,
    flingLeft: 0,
    pinch: 0,
    pan: 0,
  });

  const incrementScore = (points) => {
    setScore((prev) => prev + points);
  };

  const incrementAction = (action) => {
    setActions((prev) => ({
      ...prev,
      [action]: prev[action] + 1,
    }));
  };

  return (
    <ScoreContext.Provider
      value={{ score, actions, incrementScore, incrementAction}}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
