import React, { useContext, useEffect, useState } from "react";
import { Button, Colors, Card } from "react-native-ui-lib";
import { signOutFromGoogle } from "../firebase/googleProvider";
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
import { getPosts, postCreateNewPost } from "../services/posts";

const Item = ({ item, onPress, backgroundColor, textColor, navigation }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Card flex center onPress={() => console.log("pressed")}>
      <Card.Image source={restaurant} style={styles.cardImage} />
      <Card.Section
        content={[{ text: item.title, text70: true, grey10: true }]}
      />
      <Card.Section
        content={[{ text: item.description, text80: true, grey20: true }]}
      />
      <Button
        label="Ver más"
        backgroundColor={Colors.blue30}
        onPress={() =>{
          console.log('id home:', item._id.toString());
          navigation.navigate("StackNavigator", {
            screen: "PostDescription",
            params: {
              id: item._id.toString(),
            },
          })}
        }
        style={styles.cardButton}
      />
    </Card>
  </TouchableOpacity>
);

export const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([
    // { id: 1, label: "Tecnología y Sistemas" },
    // { id: 2, label: "Marketing" },
    // { id: 3, label: "Finanzas" },
    // { id: 4, label: "Educación" },
    // { id: 5, label: "Entretenimiento" },
    // { id: 6, label: "Medio ambiente" },
  ]);
  const [selectedId, setSelectedId] = useState();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState({});
  const [refreshView, setRefreshView] = useState(Math.random());

  useEffect(() => {
    getData();
  }, [refreshView]);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSelectOption = (option) => {
    setCategory(option);
    setSearchText("");
  };

  const renderOptionItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectOption(item)}>
      <Text style={styles.optionItem}>{item.label}</Text>
      <View
        style={{ width: "100%", backgroundColor: "gray", height: 1 }}
      ></View>
    </TouchableOpacity>
  );

  const filteredOptions = dropdownOptions.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePostNewPost = async () => {
    const data = await postCreateNewPost();
    if (data) {
      setRefreshView(Math.random());
    }
  };

  const getData = async () => {
    const data = await getPosts();
    if (data) {
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Buscar..."
                placeholderTextColor={"gray"}
                onChangeText={handleSearchTextChange}
                value={searchText}
              />
              <FlatList
                data={filteredOptions}
                renderItem={renderOptionItem}
                keyExtractor={(item) => item.id.toString()}
                style={[
                  styles.dropdown,
                  { display: searchText ? "flex" : "none" },
                ]}
              />
            </View>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.cardsTitle}>Últimas ofertas laborales</Text>
            <FlatList
              data={posts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
              horizontal={true}
            />
            <Text style={styles.cardsTitle}>Postulaciones</Text>
            <FlatList
              data={POSTULACIONES_DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
              horizontal={true}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Text
            style={{
              color: "black",
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Hola {user.name.split(" ")[0]}
          </Text>
          <Button
            style={{ width: "50%", marginTop: 20 }}
            labelStyle={{ fontSize: 20, color: "white" }}
            label={"Cerrar sesión"}
            backgroundColor={Colors.blue30}
            size={Button.sizes.large}
            onPress={() => signOutFromGoogle(navigation)}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handlePostNewPost}
      >
        <Image source={plus} style={styles.plusIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "70%",
    marginTop: 20,
    marginHorizontal: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    color: "black",
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
    padding: 20,
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  cardImage: {
    width: 250,
    height: 200,
  },
  cardButton: {
    marginTop: 10,
  },
  cardsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "black",
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

// Datos de ejemplo para las tarjetas de ofertas laborales
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Burger in-N-out",
    description: "Postulación de trabajo.",
    image: restaurant,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Restaurante Don Julio",
    description: "Postulación de trabajo.",
    image: restaurant,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Hotel Holiday Inn",
    description: "Postulación de trabajo.",
    image: restaurant,
  },
];

// Datos de ejemplo para las tarjetas de postulaciones
const POSTULACIONES_DATA = [
  {
    id: "1",
    title: "Super Mami",
    description: "Búsqueda de cajero temporal",
    image: cashier,
  },
  {
    id: "2",
    title: "Plomero express",
    description: "Búsqueda de plomero para el día viernes",
    image: plumber,
  },
  {
    id: "3",
    title: "Burger King",
    description: "Búsqueda de mozo temporal",
    image: restaurant,
  },
];
