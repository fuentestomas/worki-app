import React, { useContext, useEffect, useState } from "react";
import { Button, Colors, Card, Icon } from "react-native-ui-lib";
import LoaderKit from "react-native-loader-kit";
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
import plumber from "../assets/img/plumber.png";
import cashier from "../assets/img/cashier.png";
import plus from "../assets/img/plus.png";
import { getPosts, getUserPost } from "../services/posts";
import { PostItems } from "../components/PostItems";
import { EmptyList } from "../components/EmptyList";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState({});
  const [refreshView, setRefreshView] = useState(Math.random());
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const { role, id } = user;

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [refreshView, isFocused])
  );

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const getData = async () => {
    setIsLoading(true);
    let data;
    if (role == "business" || role == "person") {
      data = await getUserPost(id);
    } else {
      data = await getPosts();
    }
    if (data) {
      setPosts(data);
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return <PostItems item={item} navigation={navigation} fullWidth />;
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
        <ScrollView>
          <View style={{ flex: 1 }}>
            {role === "person" && (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  marginTop: 15,
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
                alignItems: "center",
                marginTop: role === "person" ? 10 : 30,
              }}
            >
              <Text style={styles.cardsTitle}>
                {role == "business" || role == "person"
                  ? "Mis publicaciones"
                  : "Últimas ofertas laborales"}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              {posts.length > 0 ? (
                <FlatList
                  data={posts}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index}
                  horizontal={true}
                />
              ) : (
                <EmptyList text={"No se han publicado ofertas."} />
              )}
            </View>
            {role === "worker" && (
              <View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.cardsTitle}>Postulaciones</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    marginBottom: 40,
                  }}
                >
                  {POSTULACIONES_DATA.length > 0 ? (
                    <FlatList
                      data={POSTULACIONES_DATA}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index}
                      horizontal={true}
                    />
                  ) : (
                    <EmptyList text={"No se han realizado postulaciones."} />
                  )}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}
      {(role === "person" || role === "business") && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={async () => {
            navigation.navigate("StackNavigator", {
              screen: "FormPost",
              params: {
                refreshView,
              },
            });
          }}
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

  title: {
    fontSize: 32,
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
