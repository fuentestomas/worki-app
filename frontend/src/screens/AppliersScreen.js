import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import back from "../assets/img/back.png";
export const AppliersScreen = ({ navigation, route }) => {
  const { id } = route.params;
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
          navigation.navigate({
            name: "PostDescription",
            params: { id },
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
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};
