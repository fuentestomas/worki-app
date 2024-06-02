import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import back from "../assets/img/back.png";

export const FormPost = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TabNavigator", {
              screen: "Home",
            })
          }
        >
          <View style={{ width: 25, height: 25 }}>
            <Image
              style={{ resizeMode: "contain", width: "100%", height: "100%" }}
              source={back}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 , justifyContent: "center", alignContent:"center", width: "100%" }}>
        <Text>FormPost</Text>
      </View>
    </View>
  );
};
