import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import back from "../assets/img/back.png";
import { getPostDetail } from "../services/posts";
import { useEffect, useState } from "react";

export const PostDescription = ({ navigation, route }) => {
  const [postDetails, setPostDetail] = useState({});

  const { id } = route.params;

  useEffect(() => {
    getData();
  }, [postDetails]);

  const getData = async () => {
    const data = await getPostDetail(id);
    if (data) {
      setPostDetail(data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator", {
            screen: "Home"
        })}>
          <View style={{ width: 25, height: 80, marginLeft: 10 }}>
            <Image
              style={{ resizeMode: "contain", width: "100%", height: "100%" }}
              source={back}
            />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ marginVertical: 20 }}>
            <Text style={{ color: "black", fontSize: 30 }}>{postDetails.title}</Text>
          </View>
          <View style={{ marginVertical: 30 }}>
            <Text style={{ color: "black", fontSize: 20 }}>
              Descripción de la publicación
            </Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ color: "black", fontSize: 15 }}>
              {postDetails.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
