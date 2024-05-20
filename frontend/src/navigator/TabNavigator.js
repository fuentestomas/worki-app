// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Components
import { HomeScreen } from "../screens/HomeScreen";
import homeIcon from "../assets/img/home.png";
import chatIcon from "../assets/img/chat.png";
import userIcon from "../assets/img/user.png"
import { ChatsScreen } from "../screens/ChatsScreen";
import { Image } from "react-native";
import { Colors } from "react-native-ui-lib";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconSource;

          // Asigna el componente de icono personalizado basado en la ruta de la pestaña
          if (route.name === "Home") {
            iconSource = homeIcon;
          } else if (route.name === "Chats") {
            iconSource = chatIcon;
          } else if (route.name === "Mi Perfil") {
            iconSource = userIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{ width: size, height: size, tintColor: color }}
            />
          );
        },
        tabBarActiveTintColor: Colors.blue40,
        tabBarInactiveTintColor: "black",
        headerShown: false, // Oculta el encabezado si es necesario
      })}
    >
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mi Perfil" component={HomeScreen} />

    </Tab.Navigator>
  );
};
