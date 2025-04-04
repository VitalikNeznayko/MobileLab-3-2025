import React, { createContext, useState, useContext } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [actions, setActions] = useState({
    singleClick: 0,
    doubleClick: 0,
    longPress: 0,
    drag: 0,
    swipe: 0,
    pinch: 0,
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

  const resetScore = () => {
    setScore(0);
    setActions({
      singleClick: 0,
      doubleClick: 0,
      longPress: 0,
      drag: 0,
      swipe: 0,
      pinch: 0,
    });
  };

  return (
    <ScoreContext.Provider
      value={{ score, actions, incrementScore, incrementAction, resetScore }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
