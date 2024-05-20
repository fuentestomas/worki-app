// Components
import { Text, View } from "react-native";
import { Button, Colors } from "react-native-ui-lib";

export const FormLoginScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>FormLoginScreen</Text>
      <Button
        style={{ width: "50%", marginTop: 20 }}
        labelStyle={{ fontSize: 20, color: "white" }}
        label={"Go to Login"}
        backgroundColor={Colors.blue30}
        size={Button.sizes.large}
        onPress={() => navigation.navigate("LoginScreen")}
      />
    </View>
  );
};
