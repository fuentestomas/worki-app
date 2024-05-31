// Components
import { Text, View, Image, TextInput } from "react-native";
import { Button, Card, Colors } from "react-native-ui-lib";
import LoaderKit from "react-native-loader-kit";
// Assets
import working from "../assets/img/working.png";
// Context
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
// OAuth
import {
  onGoogleSignIn,
  onSilentGoogleSignIn,
} from "../firebase/googleProvider";
import { useFocusEffect } from "@react-navigation/native";
import { postUserLogin } from "../services/user";
import { saveToLocalStorage } from "../hooks/useLocalStorage";
import back from "../assets/img/back.png";
import { TouchableOpacity } from "react-native";

export const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [isLoginEnabled, setLoginEnabled] = useState(false);
  const [userLogin, setUserLogin] = useState({});

  useEffect(() => {}, [userLogin]);

  useFocusEffect(
    React.useCallback(() => {
      setLoginEnabled(false);
      setTimeout(async () => {
        await onSilentGoogleSignIn(login, navigation, setLoading);
      }, 500);
    }, [])
  );

  const onChange = (name, value) => {
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const onHandleVisibilityLogin = () => {
    setLoginEnabled(true);
  };

  const onHandleLogin = async () => {
    const data = await postUserLogin(userLogin);

    const authObj = {
      id: data._id,
      name: data.fullName,
      email: data.emailAddress,
      role: data.roles[0],
    };

    if (data) {
      login(authObj);
      await saveToLocalStorage("auth", authObj);
      navigation.navigate("TabNavigator", {
        screen: "Home",
      });
    }
  };

  return (
    <View style={{ height: "100%", backgroundColor: "#f5f5f5" }}>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LoaderKit
            style={{ width: 90, height: 90 }}
            name={"BallClipRotate"}
            color={Colors.blue30}
          />
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          {!isLoginEnabled && (
            <View style={{ alignItems: "center", width: "100%" }}>
              <View
                style={{
                  width: 300,
                  height: 300,
                  marginTop: 55,
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={working}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    marginTop: 20,
                    marginBottom: 6,
                    fontSize: 23,
                    color: "black",
                  }}
                >
                  Hola, Bienvenido!
                </Text>
                <Text style={{ color: "gray", fontSize: 13.5 }}>
                  Inicia sesión o crea una cuenta!
                </Text>
              </View>
              <View style={{ marginTop: 35, width: "80%" }}>
                <Button
                  style={{ borderRadius: 15 }}
                  labelStyle={{ fontSize: 20 }}
                  label={"Registrarme"}
                  backgroundColor={Colors.blue30}
                  size={Button.sizes.large}
                  onPress={() => navigation.navigate("RoleScreen")}
                />
              </View>
            </View>
          )}
          {isLoginEnabled && (
            <View
              style={{ width: "80%", marginTop: isLoginEnabled ? 149 : 20 }}
            >
              <TouchableOpacity onPress={() => setLoginEnabled(false)}>
                <View style={{ width: 25, height: 80 }}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                    source={back}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 15,
                  marginBottom: 20,
                  shadowColor: "#e7e7e7",
                  elevation: 6,
                }}
              >
                <View style={{ marginTop: 20, marginLeft: 22 }}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Iniciar sesión
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 25, paddingTop: 15 }}>
                  <Text
                    style={{ paddingLeft: 3, color: "black", fontWeight: 600 }}
                  >
                    E-Mail
                  </Text>
                  <TextInput
                    placeholder="worki@gmail.com"
                    placeholderTextColor={"gray"}
                    keyboardType="email-address"
                    style={{
                      width: "100%",
                      height: 50,
                      color: "black",
                      borderColor: "gray",
                      borderRadius: 10,
                      backgroundColor: "#f5f5f5",
                      paddingHorizontal: 10,
                      paddingHorizontal: 2,
                      fontSize: 15,
                      paddingLeft: 12,
                      marginVertical: 5,
                    }}
                    onChangeText={(text) => onChange("emailAddress", text)}
                  />
                </View>
                <View style={{ paddingHorizontal: 25, paddingTop: 10 }}>
                  <Text
                    style={{ paddingLeft: 3, color: "black", fontWeight: 600 }}
                  >
                    Contraseña
                  </Text>
                  <TextInput
                    placeholder="********"
                    placeholderTextColor={"gray"}
                    secureTextEntry={true}
                    style={{
                      width: "100%",
                      height: 50,
                      color: "black",
                      borderColor: "gray",
                      borderRadius: 10,
                      backgroundColor: "#f5f5f5",
                      paddingHorizontal: 10,
                      paddingHorizontal: 2,
                      fontSize: 15,
                      paddingLeft: 12,
                      marginVertical: 5,
                      marginBottom: 30,
                    }}
                    onChangeText={(text) => onChange("password", text)}
                  />
                </View>
              </View>
            </View>
          )}
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: 15,
              marginTop: 12,
              shadowColor: "#e7e7e7",
              elevation: 6,
            }}
          >
            <Button
              style={{
                borderRadius: 15,
                borderWidth: isLoginEnabled ? 2 : 0,
                borderColor: isLoginEnabled ? Colors.blue40 : "none",
                backgroundColor: isLoginEnabled ? "#f5f5f5" : Colors.grey60,
              }}
              labelStyle={{
                fontSize: 20,
                color: "black",
                color: isLoginEnabled ? Colors.blue40 : "black",
              }}
              label={"Iniciar sesión"}
              backgroundColor={Colors.grey60}
              size={Button.sizes.large}
              onPress={() =>
                !isLoginEnabled ? onHandleVisibilityLogin() : onHandleLogin()
              }
            />
          </View>
          <View
            style={{
              width: "85%",
              marginVertical: 25,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "#E5E5E5" }} />
            <Text style={{ color: "black", paddingHorizontal: 12 }}>o</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#E5E5E5" }} />
          </View>
          <View
            style={{
              width: "85%",
            }}
          >
            <Button
              style={{
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "gray",
                marginBottom: 7,
              }}
              onPress={() => onGoogleSignIn(login, navigation)}
              labelStyle={{ fontSize: 15, color: "black" }}
              label={"Continuar con Google"}
              iconSource={require("../assets/img/google.png")}
              iconStyle={{ width: 28, height: 25, tintColor: "black" }}
              backgroundColor={Colors.white}
            />
          </View>
        </View>
      )}
    </View>
  );
};
