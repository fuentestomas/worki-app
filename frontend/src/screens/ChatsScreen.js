import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Colors } from "react-native-ui-lib";
import { getUserChats } from "../services/chat";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import LoaderKit from "react-native-loader-kit";

export const ChatsScreen = ({ navigation }) => {
  const [chatsList, setChatsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getChats();
    }, [isFocused])
  );

  const getChats = async () => {
    const data = await getUserChats();
    setChatsList(data);
    setIsLoading(false);
  };

  return (
    <View style={{ padding: 0, flex: 1 }}>
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
        <View style={{ padding: 0, flex: 1 }}>
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: Colors.blue30,
              justifyContent: "center",
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 17 }}>
              Chats
            </Text>
          </View>
          {chatsList?.length > 0 ? (
            <FlatList
              data={chatsList}
              renderItem={({ item }) => (
                <Item item={item} navigation={navigation} />
              )}
              keyExtractor={(item, index) => index}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{ color: "gray", textAlign: "center", fontSize: 15 }}
              >
                No hay conversaciones
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const Item = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        minHeight: 70,
        borderBottomWidth: 1,
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "white",
      }}
      onPress={() => {
        navigation.push("StackNavigator", {
          screen: "ChatScreen",
          params: {
            fullName: item.chatUser.fullName,
            chatId: item._id.toString(),
            contactId: item.chatUser.id,
          },
        });
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "85%" }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: "black",
            borderRadius: 20, // Changed to 20 to create a circular view
            marginHorizontal: 13,
            overflow: "hidden", // Ensures the image fits within the circle
            justifyContent: "center", // Centers the content
            alignItems: "center", // Centers the content
          }}
        >
          {item.chatUser.photo ? (
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.chatUser.photo}` }}
              style={{
                width: 40,
                height: 40,
              }}
              resizeMode="cover" // Ensures the image covers the entire area
            />
          ) : null}
        </View>
        <View style={{ width: "80%" }}>
          <Text style={{ color: "black", fontSize: 17, fontWeight: 500 }}>
            {item.chatUser.fullName}
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 13,
              marginLeft: 1,
              fontWeight: 500,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMsg.message}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", width: "15%" }}>
        <Text
          style={{
            color: "gray",
            textAlign: "right",
            marginRight: 13,
            fontWeight: 500,
          }}
        >
          {item.lastMsg.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
