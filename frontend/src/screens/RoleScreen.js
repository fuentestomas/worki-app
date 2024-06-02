// Components
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Colors } from "react-native-ui-lib";
import back from "../assets/img/back.png";
import { useEffect } from "react";
import {
  workerRegister,
  particularRegister,
  companyRegister,
  resetData,
} from "../constants/userRegister";

export const RoleScreen = ({ route, navigation }) => {
  useEffect(() => {
    resetData();
  }, []);

  const onRoleType = (role) => {
    if (role === "worker") {
      return workerRegister;
    } else if (role === "person") {
      return particularRegister;
    }
    return (userRegister = companyRegister);
  };
  const navigateToRegisterScreen = (role) => {
    let userRegister = onRoleType(role);
    if (route.params.googleUser) {
      let { googleUser } = route.params; 
      userRegister.fullName = googleUser.name;
      userRegister.emailAddress = googleUser.email;
      userRegister.uid = googleUser.uid;
    }
    navigation.navigate("RegisterScreen", {
      role,
      navigation,
      userRegister,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <View style={{ width: 25, height: 80, marginLeft: 10 }}>
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={back}
          />
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ marginTop: 60 }}>
          <Text style={{ fontSize: 20, color: "black" }}>
            ¿Qué quieres ser en Worki?...
          </Text>
        </View>
        <View style={{ marginTop: 20, justifyContent: "center", flex: 1 }}>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              backgroundColor: Colors.blue30,
              padding: 15,
              marginVertical: 20,
            }}
            onPress={() => navigateToRegisterScreen("worker")}
          >
            <View>
              <Text
                style={{ fontSize: 20, color: "white", textAlign: "center" }}
              >
                Quiero ser Trabajador
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              backgroundColor: Colors.blue30,
              padding: 15,
              marginVertical: 20,
            }}
            onPress={() => navigateToRegisterScreen("person")}
          >
            <View>
              <Text
                style={{ fontSize: 20, color: "white", textAlign: "center" }}
              >
                Quiero ser Particular
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              backgroundColor: Colors.blue30,
              padding: 15,
              marginVertical: 20,
            }}
            onPress={() => navigateToRegisterScreen("company")}
          >
            <View>
              <Text
                style={{ fontSize: 20, color: "white", textAlign: "center" }}
              >
                Quiero ser Empresa
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 25, paddingTop: 15 }}>
          <Text
            style={{ paddingLeft: 3, color: "black", fontWeight: 600 }}
          ></Text>
        </View>
      </View>
    </View>
  );
};
