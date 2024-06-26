// Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Components
import { LoginScreen } from "../screens/LoginScreen";
import { RoleScreen } from "../screens/RoleScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { RegisterForm } from "../components/RegisterForm";
import { FormCompanyScreen } from "../screens/FormCompanyScreen";
import { FormWorkerScreen } from "../screens/FormWorkerScreen";
import { PostDescription } from "../screens/PostDescription";
import {FormPost} from "../screens/FormPost";
import ApplicationScreen from "../screens/ApplicationScreen";
import { AppliersScreen } from "../screens/AppliersScreen";
import { ApplierDetailsScreen } from "../screens/ApplierDetailsScreen";
import { ChatScreen } from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RoleScreen" component={RoleScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="FormCompanyScreen" component={FormCompanyScreen} />
      <Stack.Screen name="FormWorkerScreen" component={FormWorkerScreen} />
      <Stack.Screen name="PostDescription" component={PostDescription} />
      <Stack.Screen name="FormPost" component={FormPost} />
      <Stack.Screen name="ApplicationScreen" component={ApplicationScreen} />
      <Stack.Screen name="AppliersScreen" component={AppliersScreen} />
      <Stack.Screen name="ApplierDetailsScreen" component={ApplierDetailsScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};
