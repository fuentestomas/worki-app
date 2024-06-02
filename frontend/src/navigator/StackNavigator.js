// Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Components
import { LoginScreen } from "../screens/LoginScreen";
import { FormLoginScreen } from "../screens/FormLoginScreen";
import { RoleScreen } from "../screens/RoleScreen";
import { FormRegisterScreen } from "../screens/FormRegisterScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { RegisterForm } from "../components/RegisterForm";
import { FormCompanyScreen } from "../screens/FormCompanyScreen";
import { FormParticularScreen, FormWorkerScreen } from "../screens/FormWorkerScreen";
import { PostDescription } from "../screens/PostDescription";
import {FormPost} from "../screens/FormPost";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RoleScreen" component={RoleScreen} />
      <Stack.Screen name="FormLoginScreen" component={FormLoginScreen} />
      <Stack.Screen name="FormRegisterScreen" component={FormRegisterScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="FormCompanyScreen" component={FormCompanyScreen} />
      <Stack.Screen name="FormWorkerScreen" component={FormWorkerScreen} />
      <Stack.Screen name="PostDescription" component={PostDescription} />
      <Stack.Screen name="FormPost" component={FormPost} />
    </Stack.Navigator>
  );
};
