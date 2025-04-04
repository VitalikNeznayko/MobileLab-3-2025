import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./components/MainTabs";
import { ScoreProvider } from "./components/ScoreContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView>
      <ScoreProvider>
        <>
          <NavigationContainer>
            <MainTabs />
          </NavigationContainer>
        </>
      </ScoreProvider>
    </GestureHandlerRootView>
  );
};

export default App;
