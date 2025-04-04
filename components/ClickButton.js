import React, { useState, useRef } from "react";
import { Dimensions, Animated } from "react-native";
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
  onFlingLeft,
  onFlingRight,
  onPinch,
}) {
  const [activeGesture, setActiveGesture] = useState(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [offsetX, setoffsetX] = useState(0);
  const [offsetY, setoffsetY] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const objectSize = 100;

  const minX = -screenWidth / 2 + objectSize;
  const maxX = screenWidth / 2 - objectSize;
  const minY = -screenHeight / 2 + objectSize;
  const maxY = screenHeight / 2 - objectSize;

  const panRef = useRef();
  const flingRightRef = useRef();
  const flingLeftRef = useRef();
  const doubleTapRef = useRef();
  const longPressRef = useRef();

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const resetTimeout = useRef(null);

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
    updateActiveGesture("pan");

    const newX = offsetX + event.nativeEvent.translationX;
    const newY = offsetY + event.nativeEvent.translationY;

    const boundedX = Math.max(minX, Math.min(maxX, newX));
    const boundedY = Math.max(minY, Math.min(maxY, newY));

    Animated.timing(translateX, {
      toValue: boundedX,
      duration: 0,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: boundedY,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const handlePanStateChange = (event) => {
    if (event.nativeEvent.state === 5) {
        onPan();
      if (resetTimeout.current) {
        clearTimeout(resetTimeout.current);
      }

      resetTimeout.current = setTimeout(() => {
        Animated.timing(translateX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();

        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 2000);
    }
  };

  const handleFlingRight = (event) => {
    if (event.nativeEvent.state === 4) {
      onFlingRight();
      setPosition((prev) => ({ ...prev, x: prev.x + 30 }));
      setTimeout(() => setPosition({ x: 0, y: 0 }), 500);
      updateActiveGesture("flingRight");
    }
  };

  const handleFlingLeft = (event) => {
    if (event.nativeEvent.state === 4) {
      onFlingLeft();
      setPosition((prev) => ({ ...prev, x: prev.x - 30 }));
      setTimeout(() => setPosition({ x: 0, y: 0 }), 500);
      updateActiveGesture("flingLeft");
    }
  };

  const handlePinch = (event) => {
    setScale(event.nativeEvent.scale);
  };

  const handlePinchStateChange = (event) => {
    if (event.nativeEvent.state === 5) {
      onPinch();
      setScale(1);
    }
  };

  return (
    <GestureHandlerRootView>
      <PinchGestureHandler
        onGestureEvent={handlePinch}
        onHandlerStateChange={handlePinchStateChange}
      >
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
              onHandlerStateChange={handlePanStateChange}
              minDist={30}
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
                    <Button
                      style={{
                        transform: [
                          { translateX: translateX },
                          { translateY: translateY },
                          { scale: scale },
                        ],
                      }}
                    >
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
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const TextButton = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
