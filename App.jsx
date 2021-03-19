import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Loading from "./components/Loading";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation/DrawerNavigation";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { Provider as ReduxProvider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import MainStore from "./redux/store/MianStore";
import { Root } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return <Loading />;
  } else {
    return (
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    );
  }
};
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#186eb8",
  },
};

export default () => {
  return (
    <ReduxProvider store={MainStore}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <ApplicationProvider {...eva} theme={eva.light}>
            <Root>
              <App />
            </Root>
          </ApplicationProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
};
