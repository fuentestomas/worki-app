import React, { useContext, useEffect, useState } from "react";
import { Button, Colors, Card } from "react-native-ui-lib";
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
          {role === "person" && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 25,
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

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginHorizontal: 10,
              marginBottom: 40,
            }}
          >
            <View>
              <Text style={styles.cardsTitle}>Últimas ofertas laborales</Text>
            </View>
            <FlatList
              data={posts}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
              extraData={selectedId}
              horizontal={true}
            />
            {role === "worker" && (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.cardsTitle}>Postulaciones</Text>
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
        </View>
      </ScrollView>
      {(role === "person" || role === "business") && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handlePostNewPost}
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
    marginTop: 20,
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
  },
  cardsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
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

const Item = ({ item, onPress, backgroundColor, textColor, navigation }) => (
  <View style={[styles.item]}>
    <Card flex style={{ width: "100%", maxWidth: 334 }}>
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
        <Text style={{ textAlign: "center", color: "white", fontSize: 14 }}>
          $3k - $5k
        </Text>
      </View>
      <View style={{ height: 100, padding: 12, width: "100%" }}>
        <Card.Section
          content={[{ text: item.title, text65BL: true, black: true }]}
          style={{ width: "100%" }}
        />
        <Card.Section
          content={[{ text: item.description, text80: true, grey20: true }]}
          style={{ width: "100%", marginTop: 6 }}
        />
      </View>
      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <View
          style={{
            width: 145,
            marginRight: 15,
            marginBottom: 15,
          }}
        >
          <Button
            label="Ver publicación"
            backgroundColor={Colors.blue30}
            labelStyle={{ fontSize: 14 }}
            onPress={() => {
              navigation.navigate("StackNavigator", {
                screen: "PostDescription",
                params: {
                  id: item._id.toString(),
                },
              });
            }}
            style={styles.cardButton}
          />
        </View>
      </View>
    </Card>
  </View>
);

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
