import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigator } from "./StackNavigator";
import { TabNavigator } from "./TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { getFcmToken, registerListenerWithFCM } from "../firebase/pushNotification";
import { useEffect } from "react";

const RootStack = createNativeStackNavigator();

export const AppNavigator = () => {
  useEffect(() => {
    getFcmToken();
    const unsubscribe = registerListenerWithFCM();

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="StackNavigator" component={StackNavigator} />
        <RootStack.Screen name="TabNavigator" component={TabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
