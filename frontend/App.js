import React from "react";
// Components
import { AppNavigator } from "./src/navigator/AppNavigator";
// Context
import { AuthProvider } from "./src/context/AuthContext";
import PushNotification from "react-native-push-notification";


const App = () => {
  PushNotification.createChannel(
    {
      channelId: "download-channel", // El mismo ID que usarás en la notificación
      channelName: "Descargas",
      channelDescription: "Un canal para las notificaciones de descargas",
      importance: 4, // Configura la importancia de las notificaciones en este canal
      vibrate: true, // Define si la notificación vibrará
    },
    (created) => console.log(`¿Canal creado? ${created}`) // Comprobación opcional para ver si el canal fue creado
  );
  return (
    <AuthProvider>
        <AppNavigator />
    </AuthProvider>
  );
};

export default App;
