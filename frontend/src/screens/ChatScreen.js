import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import back from "../assets/img/back.png";
import { Button, Colors } from "react-native-ui-lib";

export const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({});
  const ws = new WebSocket("ws://localhost:3000");
  const { fullName } = route.params;
  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (e) => {
      const numero = Math.floor(Math.random() * 10);
      const newMessage = {
        text: e.data,
        side: numero % 2 === 0 ? "right" : "left",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.onclose = (e) => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (message.length > 0) {
      ws.send(message);
      setMessage("");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 60,
          backgroundColor: "#D3D3D3",
        }}
      >
        <View style={{ width: "100%" }}>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 17,
              fontWeight: 500,
            }}
          >
            {fullName}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ maxWidth: 50, position: "absolute" }}
        onPress={() =>
          navigation.navigate("TabNavigator", {
            screen: "Chats",
          })
        }
      >
        <View style={{ width: 25, height: 60, marginLeft: 10 }}>
          <Image
            style={{
              resizeMode: "contain",
              width: "100%",
              height: "100%",
              tintColor: "black",
            }}
            source={back}
          />
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View
              style={{
                width: "100%",
                alignItems: item.side === "left" ? "flex-start" : "flex-end",
                paddingRight: item.side === "left" ? 0 : 12,
                paddingLeft: item.side === "left" ? 12 : 0,
              }}
            >
              <View
                style={{
                  backgroundColor:
                    item.side === "left" ? "gray" : Colors.blue30,
                  borderRadius: 14,
                  marginVertical: 5,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  maxWidth: "60%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ width: "75%", paddingRight: 2 }}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Escriba un mensaje"
            placeholderTextColor={"gray"}
            style={{
              borderWidth: 1,
              marginVertical: 20,
              paddingVertical: 5,
              paddingHorizontal: 13,
              color: "black",
              borderRadius: 20,
            }}
          />
        </View>
        <View style={{ width: "25%", alignItems: "flex-end" }}>
          <Button
            style={{
              borderRadius: 5,
              width: 40,
            }}
            labelStyle={{
              fontSize: 14,
              color: Colors.white,
              fontFamily: "Avenir-Medium",
            }}
            label={"Enviar"}
            backgroundColor={Colors.blue20}
            disabled={message === ""}
            onPress={() => sendMessage()}
          />
        </View>
      </View>
    </View>
  );
};
