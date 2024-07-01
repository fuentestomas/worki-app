import { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
} from "react-native";
import { Button, Colors, Switch } from "react-native-ui-lib";
import { postUserRegister } from "../services/user";
import { AuthContext } from "../context/AuthContext";
import { saveToLocalStorage } from "../hooks/useLocalStorage";
import { EmptyList } from "./EmptyList";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";

export const RegisterForm = ({ role, navigation, initialUserRegister }) => {
  const { login } = useContext(AuthContext);
  const [isProfessional, setProfessional] = useState(false);
  const [userRegister, setUserRegister] = useState(initialUserRegister);

  const toggleSwitch = () => setProfessional((previousState) => !previousState);

  useEffect(() => {}, [userRegister]);

  const getRole = () => {
    switch (role) {
      case "worker":
        return "Trabajador";
      case "person":
        return "Particular";
      case "company":
        return "Organizacion";
      default:
        return "";
    }
  };

  const onHandleRegister = async () => {
    const data = await postUserRegister(userRegister);
    if (data) {
      validateLogin(data);
    }
  };

  const validateLogin = (data) => {
    const userObj = {
      // Token
      // token: result.idToken,
      // User info
      uid: userRegister.uid,
      id: data._id,
      email: data.emailAddress,
      name: data.fullName,
      role: data.roles[0],
      photo: data.photo,
    };

    login(userObj);
    saveToLocalStorage("auth", userObj);

    navigation.navigate("TabNavigator", {
      screen: "Home",
    });
  };

  const validateNextStep = (role) => {
    if (role === "company") {
      navigation.navigate("FormCompanyScreen", {
        initialUserRegister: userRegister,
      });
    } else if (role === "worker") {
      navigation.navigate("FormWorkerScreen", {
        isProfessional,
        initialUserRegister: userRegister,
      });
    } else {
      onHandleRegister();
    }
  };

  const selectImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (res && res[0]) {
        const file = res[0];
        const base64Data = await RNFS.readFile(file.uri, "base64");

        onChange("photo", base64Data);
      } else {
        Alert.alert("Error", "No se seleccionó ningún archivo");
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Document selection was cancelled");
      } else {
        console.error("Unknown error: ", err);
        Alert.alert("Error", "Ocurrió un error desconocido");
      }
    }
  };

  const onChange = (name, value, type) => {
    setUserRegister((prev) => ({
      ...prev,
      [name]: name === "emailAddress" ? value.toLowerCase().trim() : value,
    }));
  };

  return (
    <SafeAreaView
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: "#e7e7e7",
        marginVertical: 30,
      }}
    >
      <ScrollView>
        <View style={{ marginLeft: 22 }}>
          <Text style={{ fontSize: 20, color: "black" }}>
            Registro {getRole()}
          </Text>
        </View>
        {!userRegister.uid && (
          <View style={{ alignItems: "center" }}>
            <View style={{ marginTop: 42 }}>
              <Text
                style={{ fontSize: 17, color: "black", textAlign: "center" }}
              >
                Cargar foto de perfil
              </Text>
            </View>

            <View
              style={{
                width: 250,
                height: 250,
                marginTop: 15,
              }}
            >
              {userRegister.photo ? (
                <View style={{ elevation: 2, marginVertical: 8 }}>
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${userRegister.photo}`,
                    }}
                    style={{ width: 250, height: 250, borderRadius: 13 }}
                  />
                </View>
              ) : (
                <EmptyList
                  text={"Seleccione una imagen."}
                  maxWidth={250}
                  minHeight={250}
                />
              )}
            </View>
            <View style={{ marginTop: 30 }}>
              <Button
                style={{ borderRadius: 15 }}
                labelStyle={{ fontSize: 15, padding: 2 }}
                label={"Cargar imagen"}
                backgroundColor={Colors.blue30}
                size={Button.sizes.medium}
                onPress={selectImage}
              />
            </View>
          </View>
        )}

        {!userRegister?.uid && (
          <View>
            <View style={{ paddingHorizontal: 25, marginTop: 45 }}>
              <Text style={{ paddingLeft: 3, color: "black", fontWeight: 600 }}>
                {role === "company"
                  ? "Nombre de la organizacion"
                  : "Nombre completo"}
              </Text>
              <TextInput
                placeholder={
                  role === "company"
                    ? "Nombre de la organizacion"
                    : "Nombre completo"
                }
                placeholderTextColor={"gray"}
                style={styles.input}
                onChangeText={(text) => onChange("fullName", text, "string")}
                value={userRegister?.fullName || ""}
              />
            </View>
            <View style={{ paddingHorizontal: 25, paddingTop: 10 }}>
              <Text
                style={{ paddingLeft: 3, color: "black", fontWeight: "600" }}
              >
                Email
              </Text>
              <TextInput
                placeholder="worki@gmail.com"
                placeholderTextColor={"gray"}
                keyboardType="email-address"
                style={styles.input}
                onChangeText={(text) =>
                  onChange("emailAddress", text, "string")
                }
                value={userRegister?.emailAddress || ""}
              />
            </View>
            <View style={{ paddingHorizontal: 25, paddingTop: 10 }}>
              <Text
                style={{ paddingLeft: 3, color: "black", fontWeight: "600" }}
              >
                Contraseña
              </Text>
              <TextInput
                placeholder="********"
                placeholderTextColor={"gray"}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(text) => onChange("password", text, "string")}
                value={userRegister?.password || ""}
              />
            </View>
          </View>
        )}
        <View style={{ paddingHorizontal: 25, paddingTop: 10 }}>
          <Text style={{ paddingLeft: 3, color: "black", fontWeight: "600" }}>
            Celular
          </Text>
          <TextInput
            placeholder="Numero de celular"
            placeholderTextColor={"gray"}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => onChange("phoneNumber", text, "number")}
            value={
              userRegister?.phoneNumber
                ? userRegister?.phoneNumber.toString()
                : ""
            }
          />
        </View>
        <View style={{ paddingHorizontal: 25, paddingTop: 10 }}>
          <Text style={{ paddingLeft: 3, color: "black", fontWeight: "600" }}>
            Dirección
          </Text>
          <TextInput
            placeholder="Escriba su dirección"
            placeholderTextColor={"gray"}
            style={styles.input}
            onChangeText={(text) => onChange("address", text, "string")}
            value={userRegister?.address || ""}
          />
        </View>
        {role === "worker" && (
          <View
            style={{
              paddingHorizontal: 25,
              flex: 1,
              justifyContent: "flex-start",
              marginVertical: 5,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                paddingLeft: 3,
                color: "black",
                fontWeight: "600",
                marginBottom: 10,
              }}
            >
              ¿Es profesional?
            </Text>
            <View
              style={{
                paddingLeft: 3,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "black", marginRight: 10, fontSize: 15 }}>
                No
              </Text>
              <Switch
                value={isProfessional}
                onValueChange={toggleSwitch}
                onColor={Colors.blue30}
              />
              <Text style={{ color: "black", marginLeft: 10, fontSize: 15 }}>
                Sí
              </Text>
            </View>
          </View>
        )}

        <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
          <View style={{ width: "65%" }}>
            <Button
              style={{ borderRadius: 15 }}
              labelStyle={{ fontSize: 20 }}
              label={
                role === "company" || role === "worker"
                  ? "Siguiente"
                  : "Registrarme"
              }
              backgroundColor={Colors.blue30}
              size={Button.sizes.large}
              onPress={() => validateNextStep(role)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    fontSize: 15,
    paddingLeft: 12,
    marginVertical: 5,
    marginBottom: 30,
    color: "black",
  },
};
