import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import back from "../assets/img/back.png";
import { Colors } from "react-native-ui-lib";
import { Dropdown } from "react-native-element-dropdown";
import { getAppliersList, updateApplierStatus } from "../services/appliers";
import chat from "../assets/img/chat-applier.png";
import { useIsFocused } from "@react-navigation/native";
import LoaderKit from "react-native-loader-kit";

const dropdownOptions = [
  { label: "CONTRATADO", value: "hired" },
  { label: "PENDIENTE", value: "applied" },
  { label: "RECHAZADO", value: "rejected" },
];

export const AppliersScreen = ({ navigation, route }) => {
  const { idPost } = route.params;

  const [appliers, setAppliers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  useEffect(() => {
    // Cambia el color del borde según el valor seleccionado
    getData();
  }, []);

  const getData = async () => {
    const data = await getAppliersList(idPost);
    if (data) {
      data.forEach((apply) => {
        let aux = apply.cv;
        apply.cv = "";
        console.log("applier chat", apply);
        apply.cv = aux;
      });
      //console.log('applier chat', data)
      setAppliers(data);
      setIsLoading(false);
    }
  };

  const onChangeDropdown = async (item, applier, index) => {
    try {
      const body = {
        idApply: applier._id,
        status: item.value,
      };

      await updateApplierStatus(body);
      const updatedAppliers = [...appliers];
      updatedAppliers[index].status = item.value;
      setAppliers(updatedAppliers);
    } catch (error) {
      console.log("error actualización estado postulante:", error);
    }
  };

  const validateDropdownColor = (value) => {
    switch (value) {
      case "hired":
        return "green";
        break;
      case "applied":
        return Colors.blue30;
        break;
      case "rejected":
        return "red";
        break;
      default:
        return "gray";
    }
  };

  const Item = ({ applier, index }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={{
          flex: 0.65,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate({
            name: "ApplierDetailsScreen",
            params: { idPost, applier },
          });
        }}
      >
        <View>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: "black",
              borderRadius: 20,
              marginHorizontal: 15,
            }}
          >
            {applier.userId.photo && (
              <Image
                source={{
                  uri: applier.isGoogle
                    ? applier.userId.photo
                    : `data:image/jpeg;base64,${applier.userId.photo}`,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 20,
                }}
              />
            )}
          </View>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ color: "black" }}
          >
            {applier.userId.fullName}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: applier.status === "hired" ? 0.51 : 0.35,
          minHeight: 54,
          paddingVertical: 10,
          paddingRight: 15,
          flexDirection: applier.status === "hired" ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {applier.status === "hired" && (
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
            activeOpacity={1}
            onPress={() =>
              navigation.navigate({
                name: "ChatScreen",
                params: {
                  fullName: applier.userId.fullName,
                  chatId: applier.chat,
                  contactId: applier.userId._id.toString(),
                },
              })
            }
          >
            <Image source={chat} style={{ width: "100%", height: "100%" }} />
          </TouchableOpacity>
        )}
        <Dropdown
          style={[
            styles.dropdown,
            { borderColor: validateDropdownColor(applier.status) },
          ]}
          placeholderStyle={[styles.placeholderStyle]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            { color: validateDropdownColor(applier.status) },
          ]}
          data={dropdownOptions}
          itemTextStyle={styles.itemTextStyle}
          labelField="label"
          valueField="value"
          value={applier.status}
          onChange={(item) => {
            onChangeDropdown(item, applier, index);
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <View style={styles.safeArea}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({
                name: "PostDescription",
                params: { idPost },
              })
            }
          >
            <View style={styles.backButton}>
              <Image style={styles.backImage} source={back} />
            </View>
          </TouchableOpacity>
          <View style={{ marginBottom: 40 }}>
            <Text style={{ color: "black", fontSize: 20, textAlign: "center" }}>
              Listado de postulantes
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: "gray",
            }}
          ></View>
          {appliers?.length > 0 ? (
            <FlatList
              data={appliers}
              renderItem={({ item, index }) => (
                <Item applier={item} index={index} />
              )}
              keyExtractor={(item) => item._id}
              style={styles.container}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{ color: "gray", textAlign: "center", fontSize: 15 }}
              >
                No hay postulaciones
              </Text>
            </View>
          )}
        </View>
      )}
      {/* <FlatList
        data={appliers}
        renderItem={({ item, index }) => <Item applier={item} index={index} />}
        keyExtractor={(item) => item._id}
        style={styles.container}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#e7e7e7",
    flex: 1,
  },
  backButton: {
    width: 25,
    height: 80,
    marginLeft: 10,
  },
  backImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flexDirection: "row",
    maxHeight: 55,
  },
  dropdown: {
    width: "100%",
    height: "100%",
    maxWidth: 140,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingRight: 5,
  },
  icon: {
    marginRight: 5,
    color: "white",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginLeft: 20,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    marginLeft: 20,
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "white",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "black",
  },
  itemTextStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 14,
  },
});

export default AppliersScreen;
