import React, { useContext, useEffect, useState } from "react";
import { Button, Colors, Card, Icon } from "react-native-ui-lib";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import restaurant from "../assets/img/restaurant.png";
import bell from "../assets/img/bell.png";
import chef from "../assets/img/chef.png";
import maid from "../assets/img/maid.png";
import plumber from "../assets/img/plumber.png";
import cashier from "../assets/img/cashier.png";
import plus from "../assets/img/plus.png";
import calendar from "../assets/img/calendar-2.png";
import pin from "../assets/img/pin.png";
import clock from "../assets/img/clock.png";
import { getPosts, postCreateNewPost } from "../services/posts";

export const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState({});
  const [refreshView, setRefreshView] = useState(Math.random());
  const { role } = user;

  useEffect(() => {
    getData();
    console.log("user:", user);
  }, [refreshView]);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handlePostNewPost = async () => {
    const data = await postCreateNewPost();
    if (data) {
      setRefreshView(Math.random());
    }
  };

  const getData = async () => {
    const data = await getPosts();
    if (data) {
      console.log("data:", data);
      setPosts(data);
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "lightgray" : "white";
    const textColor = item.id === selectedId ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={textColor}
        navigation={navigation}
        fullWidth
      />
    );
  };

  // const handleSelectOption = (option) => {
  //   setCategory(option);
  //   setSearchText("");
  // };

  // const renderOptionItem = ({ item }) => (
  //   <TouchableOpacity onPress={() => handleSelectOption(item)}>
  //     <Text style={styles.optionItem}>{item.label}</Text>
  //     <View
  //       style={{ width: "100%", backgroundColor: "gray", height: 1 }}
  //     ></View>
  //   </TouchableOpacity>
  // );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          {role === "worker" && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  placeholder="Buscar..."
                  placeholderTextColor={"gray"}
                  onChangeText={handleSearchTextChange}
                  value={searchText}
                />
                {/* <FlatList
                data={filteredOptions}
                renderItem={renderOptionItem}
                keyExtractor={(item) => item.id.toString()}
                style={[
                  styles.dropdown,
                  { display: searchText ? "flex" : "none" },
                ]}
              /> */}
              </View>
            </View>
          )}

          <View style={{ alignItems: "center" }}>
            <Text style={styles.cardsTitle}>Últimas ofertas laborales</Text>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginHorizontal: 10,
              marginBottom: 30,
            }}
          >
            <FlatList
              data={posts}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
              extraData={selectedId}
              horizontal={true}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.cardsTitle}>Postulaciones</Text>
          </View>
          {role === "worker" && (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginHorizontal: 10,
                marginBottom: 40,
              }}
            >
              <FlatList
                data={POSTULACIONES_DATA}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                extraData={selectedId}
                horizontal={true}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {(role === "person" || role === "business") && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={navigation.navigate("StackNavigator", {
            screen: "FormPost",
          })}
        >
          <Image source={plus} style={styles.plusIcon} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "70%",
    marginVertical: 20,
    marginTop: 10,
    marginHorizontal: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    color: "black",
    backgroundColor: "white",
    borderRadius: 8,
  },

  dropdown: {
    width: "100%",
    maxHeight: 200,
    borderWidth: 1,
    borderTopWidth: 0,
    borderTopColor: "white",
    borderColor: "gray",
  },
  optionItem: {
    width: "100%",
    paddingVertical: 10,
    color: "black",
    borderColor: "gray",
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 13,
    elevation: 2,
  },
  title: {
    fontSize: 32,
  },
  cardImage: {
    width: "100%",
    minWidth: 300,
    height: 140,
  },
  cardButton: {
    width: "100%",
    borderRadius: 5,
    fontFamily: "Avenir-Medium",
  },
  cardsTitle: {
    fontSize: 24,
    marginBottom: 5,
    color: "black",
    fontFamily: "Avenir-Medium",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.blue30,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
});

const Item = ({ item, onPress, backgroundColor, textColor, navigation }) => (
  <View style={[styles.item]}>
    <Card flex style={{ width: "100%", maxWidth: 300, minHeight: 300 }}>
      <Card.Image source={restaurant} style={styles.cardImage} />
      <View
        style={{
          width: 90,
          height: 35,
          backgroundColor: Colors.blue30,
          borderRadius: 5,
          alignContent: "center",
          justifyContent: "center",
          marginLeft: 15,
          marginTop: 15,
          position: "absolute",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 14,
            fontFamily: "Avenir-Medium",
          }}
        >
          {item.payRate || "Sin info"}
        </Text>
      </View>
      <View style={{ height: 100, padding: 12, width: "100%" }}>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              color: "black",
              fontFamily: "Avenir-Black",
              fontSize: 18,
              marginVertical: -5,
            }}
          >
            {item.title}
          </Text>
        </View>
        <View
          style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
        >
          <Icon source={pin} size={14} tintColor={Colors.grey40} />
          <Text
            style={{
              color: Colors.grey30,
              paddingHorizontal: 4,
              fontSize: 12.5,
              fontFamily: "Avenir-Medium",
            }}
          >
            Av. Sabattini 3605, Córdoba, Argentina
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              marginTop: 13,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon source={calendar} size={16} tintColor={Colors.blue30} />
            <Text
              style={{
                color: "black",
                paddingHorizontal: 6,
                fontSize: 11,
                fontFamily: "Avenir-Medium",
              }}
            >
              15-06-2024 - 15-07-2024
            </Text>
          </View>
          <View
            style={{
              marginTop: 13,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon source={clock} size={16} tintColor={Colors.blue30} />
            <Text
              style={{
                color: "black",
                paddingHorizontal: 6,
                fontSize: 11,
                fontFamily: "Avenir-Medium",
              }}
            >
              09:00 - 18:00
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 15, marginLeft: 2 }}>
          <Text
            style={{
              color: Colors.grey20,
              fontSize: 13,
              fontFamily: "Avenir-Medium",
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <View
          style={{
            width: 145,
            marginRight: 15,
            marginBottom: 15,
          }}
        ></View>
      </View>
    </Card>
  </View>
);

const POSTULACIONES_DATA = [
  {
    id: "1",
    title: "Super Mami",
    payRate: "$2k - $2.5k",
    description:
      "Estamos buscando un cajero dinámico y orientado al cliente para unirse a nuestro equipo. El candidato ideal debe tener excelentes habilidades de servicio al cliente, ser eficiente en el manejo de transacciones y poseer una actitud positiva y profesional.",
    image: cashier,
  },
  {
    id: "2",
    title: "Plomero",
    payRate: "$3k - $4k",
    description:
      "Se necesita un plomero con experiencia y compromiso para unirse a nuestro equipo. El candidato ideal debe poseer conocimientos sólidos en la instalación, mantenimiento y reparación de sistemas de plomería en entornos residenciales y comerciales, así como una actitud profesional y orientada al cliente.",
    image: plumber,
  },
  {
    id: "3",
    title: "Burger King",
    payRate: "$1.5k - $2k",
    description:
      "Se requiere un empleado motivado y entusiasta para unirse al equipo de Burger King. El candidato ideal debe tener excelentes habilidades de atención al cliente, capacidad para trabajar en equipo y un compromiso con la calidad y la limpieza.",
    image: restaurant,
  },
];
