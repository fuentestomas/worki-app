import notifee, { EventType, AndroidStyle } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { PERMISSIONS, request } from 'react-native-permissions';
import { Platform } from 'react-native';

// Obtener el token FCM para la notificación
export const getFcmToken = async () => {
  let token = null;
  await checkApplicationNotificationPermission();
  await registerAppWithFCM();
  try {
    token = await messaging().getToken();
    console.log('token:', token);
  } catch (error) {
    console.log('getFcmToken Device Token error ', error);
  }
  return token;
};

// Registrar la app con FCM
export async function registerAppWithFCM() {
  const isIOS = Platform.OS === "ios";
  if (!isIOS) {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }
  }
}

// Desregistrar la app de FCM
export async function unRegisterAppWithFCM() {
  if (messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().unregisterDeviceForRemoteMessages();
  }
  await messaging().deleteToken();
}

// Verificar los permisos de notificación de la app
export const checkApplicationNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (Platform.OS === 'android') {
    await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  }
};

// Registrar el listener para FCM
export function registerListenerWithFCM(callback) {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    if (callback) {
      callback(remoteMessage);
    }

    if (remoteMessage?.notification?.title && remoteMessage?.notification?.body) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data,
        remoteMessage.notification?.android?.imageUrl,
      );
    }
  });

  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        break;
      case EventType.DELIVERED:
        console.log('User delivered notification', detail.notification);
        break;
    }
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('onNotificationOpenedApp Received', JSON.stringify(remoteMessage));
  });

  messaging().getInitialNotification();
  
  return unsubscribe;
}

// Mostrar notificación
async function onDisplayNotification(title, body, data, imageUrl) {
  // Crear un canal (requerido para Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Configurar la notificación
  const notificationConfig = {
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  };

  // Agregar imagen si está disponible
  if (imageUrl) {
    notificationConfig.android.style = {
      type: AndroidStyle.BIGPICTURE,
      picture: imageUrl,
    };
  }

  // Mostrar la notificación
  await notifee.displayNotification(notificationConfig);
}

// Registrar el manejador de mensajes en segundo plano
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
