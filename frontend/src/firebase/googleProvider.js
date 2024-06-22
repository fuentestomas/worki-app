import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  clearAllLocalStorage,
  clearLocalStorage,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../hooks/useLocalStorage";

import { getUserInfo } from "../services/user";

GoogleSignin.configure({
  webClientId:
    "809098418-269io6b5kf91ll942vdqbcs9g10kia9j.apps.googleusercontent.com",
  // '.apps.googleusercontent.com'
});

export const signInWithGoogle = async () => {
  try {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // console.log(idToken);
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    console.log(userCredential.user);
    const { displayName, email, photoURL, uid } = userCredential.user;

    return {
      ok: true,
      // New user check
      isNewUser: userCredential.additionalUserInfo.isNewUser,
      // Token
      idToken: await userCredential.user.getIdToken(),
      // User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    console.log("Ocurrió un error al iniciar sesión:", error);
    return {
      ok: false,
      code: error.code,
      message: error.message,
    };
  }
};

export const onGoogleSignIn = async (login, navigation) => {
  const result = await signInWithGoogle();
  if (result.ok) {
    const authObj = {
      // Token
      token: result.idToken,
      // User info
      uid: result.uid,
      email: result.email,
      name: result.displayName,
      photo: result.photoURL,
    };

    //login(authObj);
    //saveToLocalStorage("auth", authObj);
    if (result.isNewUser) {
      navigation.navigate("RoleScreen", {
        googleUser: authObj,
      });
    }
    else {
      const data = await getUserInfo(result.uid);
      if (data) {
        data.role = data.roles[0];
        data.id = data._id.toString();
        login(data);
        saveToLocalStorage("auth", data);
        navigation.navigate("TabNavigator", {
          screen: "Home",
        });
      }
    }
    console.log("Inicié sesion");
  } else {
    console.log("No inicié sesión");
  }
};

export const signOutFromGoogle = async (navigation) => {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      await auth().signOut();
      await GoogleSignin.signOut();
    } else {
      await clearAllLocalStorage();
    }
    navigation.navigate("StackNavigator", {
      screen: "LoginScreen",
    });
    console.log("Cerré sesión");
  } catch (error) {
    console.log("Ocurrió un error al cerrar sesión");
  }
};

export const silentGoogleSignIn = async () => {
  try {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signInSilently();
    // console.log(userCredential);
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    // console.log(userCredential);
    const { displayName, email, photoURL, uid } = userCredential.user;
    return {
      ok: true,
      // Token
      idToken: await userCredential.user.getIdToken(),
      // User info
      displayName,
      photoURL,
      email,
      uid,
    };
  } catch (error) {
    // console.log('Ocurrió un error al iniciar sesión');
    // console.log(error.message);
    return {
      ok: false,
      code: error.code,
      message: error.message,
    };
  }
};

export const onSilentGoogleSignIn = async (login, navigation, setLoading) => {
  const user = await loadFromLocalStorage("auth");
  console.log("user:", user);
  if (user) {
    const userObj = user;
    login(userObj);

    navigation.navigate("TabNavigator", {
      screen: "Home",
    });
  } else {
    silentGoogleSignIn().then(async (result) => {
      if (result.ok) {
        const userObj = {
          // Token
          token: result.idToken,
          // User info
          uid: result.uid,
          email: result.email,
          name: result.displayName,
          photo: result.photoURL,
        };

        const data = await getUserInfo(result.uid);
        if (data) {
          data.role = data.roles[0];
          data.id = data._id.toString();
          login(data);
          saveToLocalStorage("auth", data);
          navigation.navigate("TabNavigator", {
            screen: "Home",
          });
        }
      } else {
        setLoading(false);
      }
    });
  }
};
