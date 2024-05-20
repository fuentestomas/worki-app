import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { Button, Colors } from "react-native-ui-lib";
import back from "../assets/img/back.png";
import { postUserRegister } from "../services/user";
import { AuthContext } from "../context/AuthContext";
export const FormWorkerScreen = ({ role, navigation, route }) => {
  const { login } = useContext(AuthContext);
  const { isProfessional, initialUserRegister } = route.params;
  const [userRegister, setUserRegister] = useState(initialUserRegister);
  const [fromAvgPayRate, setFromAvgPayRate] = useState("");
  const [toAvgPayRate, setToAvgPayRate] = useState("");

  useEffect(() => {}, [userRegister]);

  useEffect(() => {
    const resultText = `${fromAvgPayRate} - ${toAvgPayRate}`;
    onChange("avgPayRate", resultText, "string");
  }, [fromAvgPayRate, toAvgPayRate]);

  const onHandleRegister = async () => {
    const data = await postUserRegister(userRegister);
    if (data) {
      validateLogin(data);
    }
  };

  const validateLogin = (data) => {
    login({
      // Token
      // token: result.idToken,
      // User info
      // uid: result.uid,
      email: data.emailAddress,
      name: data.fullName,
    });
    navigation.navigate("TabNavigator", {
      screen: "HomeScreen",
    });
  };

  const getAvgPayRate = (text, type) => {
    if (type === "from") {
      setFromAvgPayRate(text);
    } else {
      setToAvgPayRate(text);
    }
  };

  const onChange = (name, value, type) => {
    setUserRegister((prev) => ({
      ...prev,
      [name]: type === "string" ? value : Number(value),
    }));
  };

  return (
    <SafeAreaView
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: "#e7e7e7",
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RegisterScreen", {
            role: "worker",
          })
        }
      >
        <View style={{ width: 25, height: 80, marginLeft: 10 }}>
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={back}
          />
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={{ marginLeft: 22, marginTop: 32 }}>
          <Text style={{ fontSize: 20, color: "black" }}>
            Completar información del Trabajador
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 42 }}>
            <Text style={{ fontSize: 17, color: "black", textAlign: "center" }}>
              Indique su Título o Trabajo
            </Text>
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Título o trabajo"
              placeholderTextColor={"gray"}
              value={userRegister?.job}
              onChangeText={(text) => onChange("job", text, "string")}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 25, marginTop: 45 }}>
          <Text
            style={{
              paddingLeft: 3,
              color: "black",
              marginBottom: 5,
              fontWeight: 600,
            }}
          >
            Descripción breve
          </Text>
          <TextInput
            placeholder={"Descripción breve"}
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={8}
            style={{
              borderColor: "gray",
              borderRadius: 10,
              backgroundColor: "#f5f5f5",
              fontSize: 15,
              paddingLeft: 12,
              color: "black",
              display: "flex",
            }}
            onChangeText={(text) => onChange("description", text, "string")}
          />
        </View>
        {isProfessional && (
          <View style={{ alignItems: "center" }}>
            <View style={{ marginTop: 42 }}>
              <Text
                style={{ fontSize: 17, color: "black", textAlign: "center" }}
              >
                Indique el rango de sueldo pretendido
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                width: "70%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 25,
                marginBottom: 25,
              }}
            >
              <TextInput
                placeholder={"Desde"}
                placeholderTextColor={"gray"}
                keyboardType="numeric"
                style={{
                  width: 80,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5",
                  color: "black",
                  textAlign: "center",
                }}
                onChangeText={(text) => getAvgPayRate(text, "from")}
              />
              <TextInput
                placeholder={"Hasta"}
                placeholderTextColor={"gray"}
                keyboardType="numeric"
                style={{
                  width: 80,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5",
                  color: "black",
                  textAlign: "center",
                }}
                onChangeText={(text) => getAvgPayRate(text, "to")}
              />
            </View>
          </View>
        )}
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 25,
              marginBottom: 50,
            }}
          >
            <View style={{ width: "65%" }}>
              <Button
                style={{ borderRadius: 15 }}
                labelStyle={{ fontSize: 20 }}
                label={"Registrarme"}
                backgroundColor={Colors.blue30}
                size={Button.sizes.large}
                onPress={() => onHandleRegister()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "70%",
    marginTop: 20,
    marginHorizontal: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    color: "black",
  },
  dropdown: {
    width: "100%",
    maxHeight: 200,
    borderWidth: 1,
    borderTopWidth: 0,
    borderTopColor: "white",
    borderColor: "gray",
  },
  optionItem: {
    width: "100%",
    paddingVertical: 10,
    color: "black",
    borderColor: "gray",
    paddingHorizontal: 10,
  },
});
