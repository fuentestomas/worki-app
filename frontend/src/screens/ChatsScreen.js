import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Colors } from "react-native-ui-lib";

const chats = [
  {
    id: 1,
    name: "Carlos Gutierrez",
    lastMessage:
      "Hola! Hemos visto tu postulación y nos encantaría agendar una entrevista para conocer un poco más acerca de vos. Tenes disponibilidad para mañana a las 14:00?",
    dateTime: "15:50",
    image: "",
    read: true,
  },
  {
    id: 2,
    name: "Luciana Acosta",
    lastMessage:
      "Hola! Hemos visto tu postulación y nos encantaría agendar una entrevista para conocer un poco más acerca de vos. Tenes disponibilidad para mañana a las 14:00?",
    dateTime: "11:30",
    image: "",
    read: false,
  },
  {
    id: 3,
    name: "Marcos García",
    lastMessage:
      "Hola! Hemos visto tu postulación y nos encantaría agendar una entrevista para conocer un poco más acerca de vos. Tenes disponibilidad para mañana a las 14:00?",
    dateTime: "08:15",
    image: "",
    read: true,
  },
];

export const ChatsScreen = ({ navigation }) => {
  const [chatsList, setChatsList] = useState(chats);

  useEffect(() => {}, []);

  return (
    <View style={{ padding: 0, flex: 1}}>
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
      {
        chatsList?.length > 0 ? (
            <FlatList
              data={chatsList}
              renderItem={({ item }) => <Item item={item} navigation={navigation} />}
              keyExtractor={(item) => item.id}
            />

        ) : (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'gray', textAlign: 'center', fontSize: 15}}>No hay conversaciones</Text>
            </View>
        )
       }
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
        backgroundColor: 'white'
      }}
      onPress={() => {
        navigation.navigate("StackNavigator", {
          screen: "ChatScreen",
          params: {
            fullName: item.name,
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
            borderRadius: 100,
            marginHorizontal: 13,
          }}
        ></View>
        <View style={{ width: "80%" }}>
          <Text style={{ color: "black", fontSize: 17, fontWeight: 500 }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: item.read ? "gray" : "black",
              fontSize: 13,
              marginLeft: 1,
              fontWeight: 500,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", width: "15%" }}>
        <Text
          style={{
            color: item.read ? "gray" : "black",
            textAlign: "right",
            marginRight: 13,
            fontWeight: 500,
          }}
        >
          {item.dateTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
