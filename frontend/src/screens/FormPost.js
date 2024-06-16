import React, { useEffect, useState } from "react";
import DatePicker from "react-native-date-picker";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import back from "../assets/img/back.png";
import { Button, Colors, Switch } from "react-native-ui-lib";
import { launchImageLibrary } from "react-native-image-picker";
import RNFS from "react-native-fs";
import { EmptyList } from "../components/EmptyList";

export const FormPost = ({ navigation, route }) => {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [openStartHour, setOpenStartHour] = useState(false);
  const [openEndHour, setOpenEndHour] = useState(false);
  const [flexibleValue, setFlexibleValue] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [dates, setDates] = useState({
    startDateTime: null,
    endDateTime: null,
    startHour: null,
    endHour: null,
  });

  const [postObject, setPostObject] = useState({
    title: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    startHour: "",
    endHour: "",
    startSalary: "",
    endSalary: "",
    flexible: false,
  });
  const { refreshView } = route.params;

  useEffect(() => {
    resetData();
  }, [refreshView]);

  const resetData = () => {
    setPostObject({
      title: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
      startHour: "",
      endHour: "",
    });
    setDates({
      startDateTime: null,
      endDateTime: null,
      startHour: null,
      endHour: null,
    });
  };

  const onChange = (name, value) => {
    setPostObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeDates = (name, value) => {
    setDates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (name, date) => {
    if (date) {
      const day =
        date.getDate().toString().length === 1
          ? `0${date.getDate()}`
          : date.getDate();
      const month =
        (date.getMonth() + 1).toString().length === 1
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDate = `${day}-${month}-${year}`;

      onChange(name, formattedDate); // Guardar el objeto Date en el estado
      onChangeDates(name, formattedDate);
    }
  };

  const formatHour = (name, hour) => {
    if (hour) {
      const hours =
        hour.getHours().toString().length === 1
          ? `0${hour.getHours()}`
          : hour.getHours();
      const minutes =
        hour.getMinutes().toString().length === 1
          ? `0${hour.getMinutes()}`
          : hour.getMinutes();

      const formattedHour = `${hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`;

      onChange(name, formattedHour); // Guardar el objeto Date en el estado
      onChangeDates(name, formattedHour);
    }
  };

  const getCurrentDate = (date) => {
    if (date) {
      const dateParts = date.split("-");
      return new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2])
      );
    }

    return new Date();
  };

  const getCurrentHour = (hour) => {
    if (hour) {
      const hourParts = hour.split(":");
      return new Date(parseInt(hourParts[0]), parseInt(hourParts[1]));
    }

    return new Date();
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        // Convertir la imagen a base64
        RNFS.readFile(source.uri, "base64")
          .then((base64Data) => {
            setImageUri(base64Data);
            console.log("image base64:", base64Data);
          })
          .catch((error) => {
            console.log("Error converting image to base64: ", error);
          });
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", marginTop: 30, marginLeft: 20 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TabNavigator", {
              screen: "Home",
            })
          }
        >
          <View style={{ width: 25, height: 25 }}>
            <Image
              style={{ resizeMode: "contain", width: "100%", height: "100%" }}
              source={back}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ScrollView>
          <View style={{ marginTop: 70 }}>
            <Text style={{ fontSize: 20, color: "black", textAlign: "center" }}>
              Publicación oferta de trabajo
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{ marginTop: 42 }}>
              <Text
                style={{ fontSize: 17, color: "black", textAlign: "center" }}
              >
                Cargar imagen de la publicación
              </Text>
            </View>

            <View
              style={{
                width: 250,
                height: 250,
                marginTop: 15,
              }}
            >
              {imageUri ? (
                <View style={{ elevation: 2, marginVertical: 8 }}>
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${imageUri}` }}
                    style={{ width: 250, height: 250, borderRadius: 13 }}
                  />
                </View>
              ) : (
                <EmptyList
                  text={"Seleccione una imagen."}
                  maxWidth={250}
                  minHeight={250}
                />
              )}
            </View>
            <View style={{ marginTop: 30 }}>
              <Button
                style={{ borderRadius: 15 }}
                labelStyle={{ fontSize: 15, padding: 2 }}
                label={"Cargar imagen"}
                backgroundColor={Colors.blue30}
                size={Button.sizes.medium}
                onPress={selectImage}
              />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{ marginTop: 38 }}>
              <Text
                style={{ fontSize: 17, color: "black", textAlign: "center" }}
              >
                Titulo
              </Text>
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Escriba el título del puesto"
                placeholderTextColor={"gray"}
                value={postObject?.title}
                onChangeText={(text) => onChange("title", text)}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 45,
              width: 300,
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Text
              style={{
                paddingLeft: 3,
                color: "black",
                marginBottom: 5,
                textAlign: "center",
              }}
            >
              Descripción del puesto
            </Text>
            <TextInput
              placeholder={"Escriba la descripción del puesto"}
              placeholderTextColor={"gray"}
              multiline={true}
              value={postObject?.description}
              numberOfLines={8}
              style={{
                borderColor: "gray",
                borderRadius: 10,
                backgroundColor: "#f5f5f5",
                fontSize: 15,
                paddingLeft: 12,
                marginTop: 10,
                color: "black",
                display: "flex",
                width: "100%",
                borderWidth: 1,
              }}
              onChangeText={(text) => onChange("description", text)}
            />
          </View>
          {/* {isProfessional && ( */}
          <View style={{ alignItems: "center", marginTop: 25 }}>
            <View style={{ marginTop: 42 }}>
              <Text
                style={{ fontSize: 17, color: "black", textAlign: "center" }}
              >
                Indique la fecha de inicio y fin del puesto
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 15,
                marginBottom: 25,
              }}
            >
              <DatePicker
                modal
                open={openStartDate}
                date={getCurrentDate(postObject.startDateTime)}
                onConfirm={(startDateTime) => {
                  setOpenStartDate(false);
                  formatDate("startDateTime", startDateTime);
                }}
                locale="es"
                mode="date"
                onCancel={() => {
                  setOpenStartDate(false);
                }}
              />
              <DatePicker
                modal
                open={openEndDate}
                date={getCurrentDate(postObject.endDateTime)}
                onConfirm={(endDateTime) => {
                  setOpenEndDate(false);
                  formatDate("endDateTime", endDateTime);
                }}
                locale="es"
                mode="date"
                onCancel={() => {
                  setOpenEndDate(false);
                }}
              />
              <DatePicker
                modal
                open={openStartHour}
                date={getCurrentHour(postObject.startHour)}
                onConfirm={(startHour) => {
                  setOpenStartHour(false);
                  formatHour("startHour", startHour);
                }}
                locale="es"
                mode="time"
                is24hourSource="locale"
                onCancel={() => {
                  setOpenStartHour(false);
                }}
              />
              <DatePicker
                modal
                open={openEndHour}
                date={getCurrentHour(postObject.endHour)}
                onConfirm={(endHour) => {
                  setOpenEndHour(false);
                  formatHour("endHour", endHour);
                }}
                locale="es"
                mode="time"
                is24hourSource="locale"
                onCancel={() => {
                  setOpenEndHour(false);
                }}
              />
              <TouchableOpacity
                style={{
                  width: 100,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5",
                  color: "black",
                  borderWidth: 1,
                  justifyContent: "center",
                  height: 53,
                }}
                activeOpacity={1}
                onPress={() => setOpenStartDate(true)}
              >
                <Text style={{ color: "gray", textAlign: "center" }}>
                  {dates.startDateTime ? dates.startDateTime : "Fecha inicio"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5",
                  color: "black",
                  borderWidth: 1,
                  justifyContent: "center",
                  height: 53,
                }}
                activeOpacity={1}
                onPress={() => setOpenEndDate(true)}
              >
                <Text style={{ color: "gray", textAlign: "center" }}>
                  {dates.endDateTime ? dates.endDateTime : "Fecha fin"}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 17,
                color: "black",
                textAlign: "center",
                marginTop: 15,
              }}
            >
              Indique el horario laboral
            </Text>
            <View
              style={{
                flex: 1,
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 15,
                marginBottom: 25,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 100,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5",
                  color: "black",
                  borderWidth: 1,
                  justifyContent: "center",
                  height: 53,
                }}
                activeOpacity={1}
                onPress={() => setOpenStartHour(true)}
              >
                <Text style={{ color: "gray", textAlign: "center" }}>
                  {dates.startHour ? dates.startHour : "Hora inicio"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5",
                  color: "black",
                  borderWidth: 1,
                  justifyContent: "center",
                  height: 53,
                }}
                activeOpacity={1}
                onPress={() => setOpenEndHour(true)}
              >
                <Text style={{ color: "gray", textAlign: "center" }}>
                  {dates.endHour ? dates.endHour : "Hora fin"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                width: "45%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 30,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 17, color: "black", textAlign: "center" }}
              >
                Flexible
              </Text>
              <Switch
                value={flexibleValue}
                onValueChange={() => setFlexibleValue(!flexibleValue)}
                onColor={Colors.blue30}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 17, color: "black", textAlign: "center" }}
              >
                Indique el sueldo del puesto
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 15,
                marginBottom: 55,
              }}
            >
              <TextInput
                placeholder={"Desde"}
                placeholderTextColor={"gray"}
                keyboardType="numeric"
                value={postObject.startSalary}
                style={{
                  width: 100,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5",
                  color: "black",
                  textAlign: "center",
                  borderWidth: 1,
                }}
                onChangeText={(text) => onChange("startSalary", text)}
              />
              <TextInput
                placeholder={"Hasta"}
                placeholderTextColor={"gray"}
                keyboardType="numeric"
                value={postObject.endSalary}
                style={{
                  width: 100,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5",
                  color: "black",
                  textAlign: "center",
                  borderWidth: 1,
                }}
                onChangeText={(text) => onChange("endSalary", text)}
              />
            </View>
          </View>
          {/* )} */}
          <View style={{ width: "100%", alignItems: "center" }}>
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
                  label={"Registrarme"}
                  backgroundColor={Colors.blue30}
                  size={Button.sizes.large}
                  // onPress={() => onHandleRegister()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    width: 300,
    marginTop: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    color: "black",
    borderRadius: 7,
    alignItems: "center",
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
