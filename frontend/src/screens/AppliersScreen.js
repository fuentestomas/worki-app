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

const appliersObject = [
  { id: "1", fullName: "José Díaz", value: "2" },
  { id: "2", fullName: "Manuel Turizo", value: "1" },
  { id: "3", fullName: "Victoria Martinez", value: "2" },
  { id: "4", fullName: "Jaime Gonzalez", value: "3" },
  { id: "5", fullName: "Miguel Pistón", value: "2" },
  // Agrega más elementos según sea necesario
];

const dropdownOptions = [
  { label: "CONTRATADO", value: "1" },
  { label: "PENDIENTE", value: "2" },
  { label: "RECHAZADO", value: "3" },
];

export const AppliersScreen = ({ navigation, route }) => {
  const { idPost } = route.params;

  const [value, setValue] = useState(dropdownOptions[1].value);
  const [appliers, setAppliers] = useState(appliersObject);

  useEffect(() => {
    // Cambia el color del borde según el valor seleccionado
  }, [value]);

  const onChangeDropdown = (value, index) => {
    const updatedAppliers = [...appliers];
    updatedAppliers[index].value = value;

    setAppliers(updatedAppliers);
  }

  const validateDropdownColor = (value) => {
    switch (value) {
      case "1":
        return "green";
        break;
      case "2":
        return Colors.blue30;
        break;
      case "3":
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
          width: "65%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        activeOpacity={1}
        onPress={()=>{
          navigation.navigate({
            name: "ApplierDetailsScreen",
            params: { idPost },
          });
        }}
        >
        <View>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: "brown",
              borderRadius: 20,
              marginHorizontal: 15,
            }}
          ></View>
        </View>
        <View style={{width: '70%'}}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "black" }}>
            {applier.fullName}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: "35%",
          height: "100%",
          paddingVertical: 10,
          paddingRight: 15,
        }}
      >
        <Dropdown
          style={[
            styles.dropdown,
            { borderColor: validateDropdownColor(applier.value) },
          ]}
          placeholderStyle={[styles.placeholderStyle]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            { color: validateDropdownColor(applier.value) },
          ]}
          data={dropdownOptions}
          itemTextStyle={styles.itemTextStyle}
          labelField="label"
          valueField="value"
          value={applier.value}
          onChange={(item) => {
            onChangeDropdown(item.value, index);
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
      <FlatList
        data={appliers}
        renderItem={({ item, index }) => <Item applier={item} index={index} />}
        keyExtractor={(item) => item.id}
        style={styles.container}
      />
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
