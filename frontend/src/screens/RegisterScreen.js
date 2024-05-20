import { RegisterForm } from "../components/RegisterForm";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import back from "../assets/img/back.png";

export const RegisterScreen = ({ route, navigation }) => {
  const { role, userRegister } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("RoleScreen")} style= {{ width: 35 }}>
          <View style={{ width: 25, height: 80, marginLeft: 10 }}>
            <Image
              style={{ resizeMode: "contain", width: "100%", height: "100%" }}
              source={back}
            />
          </View>
        </TouchableOpacity>
        <RegisterForm role={role} navigation={navigation} initialUserRegister={userRegister}/>
      </ScrollView>
    </SafeAreaView>
  );
};
