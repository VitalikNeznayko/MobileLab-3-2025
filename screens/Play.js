import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useScore } from "../components/ScoreContext";
import ClickButton from "../components/ClickButton";
import styled from "styled-components/native";

export default function Play() {
  const { score, incrementScore, incrementAction } = useScore();

  const handleTap = () => {
    incrementAction("singleClick");
    incrementScore(1);
  };

  const handleDoubleTap = () => {
    incrementAction("doubleClick");
    incrementScore(2);
  };

  const handleLongPress = () => {
    incrementAction("longPress");
    incrementScore(5);
  };

  const handlePan = () => {
    incrementAction("drag");
    incrementScore(4);
  };

  const handleFling = () => {
    incrementAction("swipe");
    incrementScore(3);
  };

  const handlePinch = () => {
    incrementAction("pinch");
    incrementScore(1);
  };

  return (
    <Container>
      <ScoreText>Your score: {score}</ScoreText>
      <ClickButton
        onTap={handleTap}
        onDoubleTap={handleDoubleTap}
        onLongPress={handleLongPress}
        onPan={handlePan}
        onFling={handleFling}
        onPinch={handlePinch}
      />
    </Container>
  );
}

const Container = styled.View`
  padding-top: 150px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ScoreText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
