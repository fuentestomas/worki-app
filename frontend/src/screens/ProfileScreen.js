import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, Colors } from "react-native-ui-lib";
import { signOutFromGoogle } from "../firebase/googleProvider";


const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 45,
          }}
        >
          <Button
            style={{ width: "50%" }}
            labelStyle={{ fontSize: 20, color: "white" }}
            label={"Cerrar sesión"}
            backgroundColor={Colors.blue30}
            size={Button.sizes.large}
            onPress={() => signOutFromGoogle(navigation)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
