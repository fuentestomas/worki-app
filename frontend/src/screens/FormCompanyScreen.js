import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import back from "../assets/img/back.png";
import { useContext, useEffect, useState } from "react";
import { Chip, lightColors } from "@rneui/themed";
import { Button, Colors } from "react-native-ui-lib";
import { postUserRegister } from "../services/user";
import { AuthContext } from "../context/AuthContext";
import { saveToLocalStorage } from "../hooks/useLocalStorage";

export const FormCompanyScreen = ({ role, navigation, route }) => {
  const { login } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([
    { id: 1, label: "Tecnología y Sistemas" },
    { id: 2, label: "Marketing" },
    { id: 3, label: "Finanzas" },
    { id: 4, label: "Educación" },
    { id: 5, label: "Entretenimiento" },
    { id: 6, label: "Medio ambiente" },
  ]);
  const [category, setCategory] = useState(null);
  const { initialUserRegister } = route.params;
  const [userRegister, setUserRegister] = useState(initialUserRegister);
  const [fromAvgSalaryRate, setFromAvgSalaryRate] = useState("");
  const [toAvgSalaryRate, setToAvgSalaryRate] = useState("");

  useEffect(() => {}, [userRegister]);

  useEffect(() => {
    const resultText = `${fromAvgSalaryRate} - ${toAvgSalaryRate}`;
    onChange("avgPayRate", resultText, "string");
  }, [fromAvgSalaryRate, toAvgSalaryRate]);

  const onHandleRegister = async () => {
    const data = await postUserRegister(userRegister);
    if (data) {
      validateLogin(data);
    }
  };

  const validateLogin = (data) => {
    const userObj = {
      // Token
      // token: result.idToken,
      // User info
      uid: userRegister.uid,
      id: data._id,
      email: data.emailAddress,
      name: data.fullName,
      role: data.roles[0],
      photo: data.photo,
    }
    login(userObj);
    saveToLocalStorage("auth", userObj);
    navigation.navigate("TabNavigator", {
      screen: "Home",
    });
  };

  const getAvgSalaryRate = (text, type) => {
    if (type === "from") {
      setFromAvgSalaryRate(text);
    } else {
      setToAvgSalaryRate(text);
    }
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSelectOption = (option) => {
    setCategory(option);
    setSearchText("");
    onChange("category", option.label, "string");
  };

  const handleDeleteChip = () => {
    setCategory(null);
  };

  const onChange = (name, value, type) => {
    setUserRegister((prev) => ({
      ...prev,
      [name]: type === "string" ? value : Number(value),
    }));
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

  const getChipName = () => {
    return (
      <Text style={{ color: "white" }}>
        {" "}
        {category.label}{" "}
        {
          <Text
            style={{
              color: lightColors.black,
              fontSize: 16.5,
              fontWeight: 800,
              fontFamily: "arial",
            }}
          >
            {" "}
            x{" "}
          </Text>
        }
      </Text>
    );
  };
  return (
    <SafeAreaView
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: "#e7e7e7",
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RegisterScreen", {
            role: "company",
          })
        }
      >
        <View style={{ width: 25, height: 80, marginLeft: 10 }}>
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={back}
          />
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={{ marginLeft: 22, marginTop: 32 }}>
          <Text style={{ fontSize: 20, color: "black" }}>
            Completar información de la Organizacion
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 42 }}>
            <Text style={{ fontSize: 17, color: "black", textAlign: "center" }}>
              Indique el rubro de la organizacion
            </Text>
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Rubro de la organizacion"
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
        {category && (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 13,
              justifyContent: "center",
            }}
          >
            <Chip
              title={getChipName()}
              onPress={handleDeleteChip}
              iconRightq
              type="outline"
              containerStyle={{
                marginVertical: 15,
                backgroundColor: Colors.blue30,
                paddingBottom: 2,
              }}
            />
          </View>
        )}
        <View style={{ paddingHorizontal: 25, marginTop: 45 }}>
          <Text
            style={{
              paddingLeft: 3,
              color: "black",
              marginBottom: 5,
              fontWeight: 600,
            }}
          >
            Descripción breve
          </Text>
          <TextInput
            placeholder={"Descripción breve"}
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={8}
            style={{
              borderColor: "gray",
              borderRadius: 10,
              backgroundColor: "#f5f5f5",
              fontSize: 15,
              paddingLeft: 12,
              color: "black",
              display: "flex",
            }}
            onChangeText={(text) => onChange("description", text, "string")}
          />
        </View>
        <View style={{ marginTop: 42 }}>
          <Text style={{ fontSize: 17, color: "black", textAlign: "center" }}>
            Indique el rango de sueldos de la organizacion
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              width: "70%",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 25,
              marginBottom: 25,
            }}
          >
            <TextInput
              placeholder={"Desde"}
              placeholderTextColor={"gray"}
              keyboardType="numeric"
              style={{
                width: 80,
                borderColor: "gray",
                borderRadius: 10,
                backgroundColor: "#f5f5f5",
                color: "black",
                textAlign: "center",
              }}
              onChangeText={(text) => getAvgSalaryRate(text, "from")}
            />
            <TextInput
              placeholder={"Hasta"}
              placeholderTextColor={"gray"}
              keyboardType="numeric"
              style={{
                width: 80,
                borderColor: "gray",
                borderRadius: 10,
                backgroundColor: "#f5f5f5",
                color: "black",
                textAlign: "center",
              }}
              onChangeText={(text) => getAvgSalaryRate(text, "to")}
            />
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 25,
              marginBottom: 50,
            }}
          >
            <View style={{ width: "65%" }}>
              <Button
                style={{ borderRadius: 15 }}
                labelStyle={{ fontSize: 20 }}
                label={role === "company" ? "Siguiente" : "Registrarme"}
                backgroundColor={Colors.blue30}
                size={Button.sizes.large}
                onPress={() => onHandleRegister()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
});
