import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

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
    // console.log(userCredential);
    const { displayName, email, photoURL, uid } = userCredential.user;

    return {
      ok: true,
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
    login({
      // Token
      token: result.idToken,
      // User info
      uid: result.uid,
      email: result.email,
      name: result.displayName,
      photo: result.photoURL,
    });
    navigation.navigate("TabNavigator", {
      screen: "HomeScreen",
    });
    console.log("Inicié sesion");
  } else {
    console.log("No inicié sesión");
  }
};

export const signOutFromGoogle = async (navigation) => {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
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

export const onSilentGoogleSignIn = (login, navigation, setLoading) => {
  silentGoogleSignIn().then(async (result) => {
    if (result.ok) {
      login({
        // Token
        token: result.idToken,
        // User info
        uid: result.uid,
        email: result.email,
        name: result.displayName,
        photo: result.photoURL,
      });
      navigation.navigate("TabNavigator", {
        screen: "HomeScreen",
      });
    } else {
      setLoading(false);
    }
  });
};
