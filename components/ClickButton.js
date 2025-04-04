import React, { useState, useRef } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  FlingGestureHandler,
  Directions,
} from "react-native-gesture-handler";
import styled from "styled-components/native";

export default function ClickButton({
  onTap,
  onDoubleTap,
  onLongPress,
  onPan,
  onFling,
  onPinch,
}) {
  const [activeGesture, setActiveGesture] = useState(null);
  const [isPanActivated, setIsPanActivated] = useState(false);
  const [panTimeout, setPanTimeout] = useState(null);

  const panRef = useRef();
  const flingRightRef = useRef();
  const flingLeftRef = useRef();
  const doubleTapRef = useRef();
  const longPressRef = useRef();

  const updateActiveGesture = (gesture) => {
    if (activeGesture !== gesture) {
      setActiveGesture(gesture);
    }
  };
  const handleSingleTap = (event) => {
    if (event.nativeEvent.state === 4) {
      updateActiveGesture("tap");
      onTap();
    }
  };

  const handleDoubleTap = (event) => {
    if (event.nativeEvent.state === 4) {
      updateActiveGesture("doubleTap");
      onDoubleTap();
    }
  };

  const handleLongPress = (event) => {
    if (event.nativeEvent.state === 4) {
      updateActiveGesture("longPress");
      onLongPress();
    }
  };

  const handlePanGesture = (event) => {
    const { state } = event.nativeEvent;

    if (state === 4) {
      setIsPanActivated(false);
      if (panTimeout) {
        clearTimeout(panTimeout);
        setPanTimeout(null);
      }
    }

    if (state === 2 && !isPanActivated) {
      if (!panTimeout) {
        setIsPanActivated(true);
        onPan();
      }
    }
  };

  const handleFlingRight = (event) => {
    if (event.nativeEvent.state === 4) {
      onFling();
    }
  };

  const handleFlingLeft = (event) => {
    if (event.nativeEvent.state === 4) {
      onFling();
    }
  };

  const handlePinch = (event) => {
    onPinch();
  };
  return (
    <GestureHandlerRootView>
      <PinchGestureHandler onGestureEvent={handlePinch}>
        <FlingGestureHandler
          ref={flingRightRef}
          direction={Directions.RIGHT}
          onHandlerStateChange={handleFlingRight}
          simultaneousHandlers={[panRef]}
        >
          <FlingGestureHandler
            ref={flingLeftRef}
            direction={Directions.LEFT}
            onHandlerStateChange={handleFlingLeft}
            simultaneousHandlers={[panRef]}
          >
            <PanGestureHandler
              ref={panRef}
              onGestureEvent={handlePanGesture}
              onHandlerStateChange={handlePanGesture}
              minDist={240}
              simultaneousHandlers={[flingRightRef, flingLeftRef]}
            >
              <LongPressGestureHandler
                ref={longPressRef}
                onHandlerStateChange={handleLongPress}
                minDurationMs={3000}
                waitFor={[doubleTapRef]}
              >
                <TapGestureHandler
                  onHandlerStateChange={handleSingleTap}
                  numberOfTaps={1}
                  waitFor={[doubleTapRef]}
                >
                  <TapGestureHandler
                    ref={doubleTapRef}
                    onHandlerStateChange={handleDoubleTap}
                    numberOfTaps={2}
                  >
                    <Button>
                      <TextButton>Click Me</TextButton>
                    </Button>
                  </TapGestureHandler>
                </TapGestureHandler>
              </LongPressGestureHandler>
            </PanGestureHandler>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
}
const Button = styled.TouchableOpacity`
  background: rgb(255, 0, 0);
  width: 200px;
  height: 200px;
  padding: 20px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  margin: 150px;
`;
const TextButton = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
