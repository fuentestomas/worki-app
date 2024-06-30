import React, { useEffect, useState, useRef, useContext } from "react";
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
import io from 'socket.io-client';
import { getChatInfo } from "../services/chat"
import { loadFromLocalStorage } from "../hooks/useLocalStorage";
import { AuthContext } from "../context/AuthContext";

export const ChatScreen = ({ navigation, route }) => {
  const initialStateMessage = { text: "" };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(initialStateMessage);
  const socketRef = useRef(null); // Use useRef to persist socket instance
  const { fullName, chatId, contactId } = route.params;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    handleSocket();

    getChatData(chatId);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [chatId]);

  const handleSocket = async () => {
    const { id } = await loadFromLocalStorage("auth");

    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3000');
      
      socketRef.current.on('connect', () => {
        console.log('Connected to socket server with id', socketRef.current.id);
        
        if (chatId !== 'none') {
          socketRef.current.emit('join', chatId);
        }
      });

      socketRef.current.on('message', (received) => {
        console.log('received', received);
        const newMessage = {
          message: received.newMessage.message,
          userId: received.newMessage.userId,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }

  const onChange = (value) => {
    setMessage({ text: value });
  }

  const getChatData = async (chatId) => {
    console.log('chatId', chatId);
    if (chatId !== 'none') {
      const data = await getChatInfo(chatId);
      console.log('server messages', data);
      setMessages(data);
    }
  }

  const sendMessage = async () => {
    const { id } = await loadFromLocalStorage("auth");
    if (message.text.length > 0) {
      socketRef.current.emit('message', {
        message: message.text,
        chatId: chatId,
        from: id,
        to: contactId
      });
      setMessage(initialStateMessage);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", height: 60, backgroundColor: "#D3D3D3" }}>
        <View style={{ width: "100%" }}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 17, fontWeight: 500 }}>{fullName}</Text>
        </View>
      </View>
      <TouchableOpacity style={{ maxWidth: 50, position: "absolute" }} onPress={() => navigation.navigate("TabNavigator", { screen: "Chats" })}>
        <View style={{ width: 25, height: 60, marginLeft: 10 }}>
          <Image style={{ resizeMode: "contain", width: "100%", height: "100%", tintColor: "black" }} source={back} />
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={{ width: "100%", alignItems: item.userId.toString() !== user.id ? "flex-start" : "flex-end", paddingRight: item.userId.toString() !== user.id ? 0 : 12, paddingLeft: item.userId.toString() !== user.id ? 12 : 0 }}>
              <View style={{ backgroundColor: item.userId.toString() !== user.id ? "gray" : Colors.blue30, borderRadius: 14, marginVertical: 5, paddingHorizontal: 12, paddingVertical: 10, maxWidth: "60%" }}>
                <Text style={{ color: "white" }}>{item.message}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", position: "absolute", bottom: 0, paddingHorizontal: 10 }}>
        <View style={{ width: "75%", paddingRight: 2 }}>
          <TextInput
            value={message.text}
            onChangeText={onChange}
            placeholder="Escriba un mensaje"
            placeholderTextColor={"gray"}
            style={{ borderWidth: 1, marginVertical: 20, paddingVertical: 5, paddingHorizontal: 13, color: "black", borderRadius: 20 }}
          />
        </View>
        <View style={{ width: "25%", alignItems: "flex-end" }}>
          <Button
            style={{ borderRadius: 5, width: 40 }}
            labelStyle={{ fontSize: 14, color: Colors.white, fontFamily: "Avenir-Medium" }}
            label={"Enviar"}
            backgroundColor={Colors.blue20}
            disabled={message.text === ""}
            onPress={sendMessage}
          />
        </View>
      </View>
    </View>
  );
};
