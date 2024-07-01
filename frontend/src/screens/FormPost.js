import React, { useEffect, useState } from "react";
import DatePicker from "react-native-date-picker";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import back from "../assets/img/back.png";
import { Button, Colors, Switch } from "react-native-ui-lib";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import { EmptyList } from "../components/EmptyList";
import { loadFromLocalStorage } from "../hooks/useLocalStorage";
import { postCreateNewPost } from "../services/posts";

const initialState = {
  image: "",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  salaryMin: "",
  salaryMax: "",
  userId: null,
  location: "Córdoba, Argentina",
  isFlexible: false,
};
const initialDateState = {
  startDate: null,
  endDate: null,
  startTime: null,
  endTime: null,
};

export const FormPost = ({ navigation, route }) => {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [openStartHour, setOpenStartHour] = useState(false);
  const [openEndHour, setOpenEndHour] = useState(false);
  const [postObject, setPostObject] = useState(initialState);
  const [dates, setDates] = useState(initialDateState);
  const { refreshView } = route.params;

  useEffect(() => {
    resetData();
  }, [refreshView]);

  const resetData = () => {
    setPostObject(initialState);
    setDates(initialDateState);
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

      const formattedHour = `${hours}:${minutes}`;

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

  const selectImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (res && res[0]) {
        const file = res[0];
        const base64Data = await RNFS.readFile(file.uri, "base64");

        onChange("image", base64Data);
      } else {
        Alert.alert("Error", "No se seleccionó ningún archivo");
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Document selection was cancelled");
      } else {
        console.error("Unknown error: ", err);
        Alert.alert("Error", "Ocurrió un error desconocido");
      }
    }
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const onHableCreateNewPost = async () => {
    const { id } = await loadFromLocalStorage("auth");
    postObject.userId = id;
    console.log('id:', id);
    try {
      const response = await postCreateNewPost(postObject);
      if (response) {
        showToast("Creación de publicación exitosa");
        navigation.navigate("TabNavigator", {
          screen: "Home",
        });
      }
    } catch (error) {
      showToast("Complete todos los campos");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", marginTop: 30, marginLeft: 15 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TabNavigator", {
              screen: "Home",
            })
          }
          style={{padding:5}}
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
              {postObject.image ? (
                <View style={{ elevation: 2, marginVertical: 8 }}>
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${postObject.image}`,
                    }}
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
              value={postObject.description}
              numberOfLines={8}
              style={{
                borderColor: "gray",
                borderRadius: 10,
                backgroundColor: "white",
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
                date={getCurrentDate(postObject.startDate)}
                onConfirm={(startDateTime) => {
                  setOpenStartDate(false);
                  formatDate("startDate", startDateTime);
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
                date={getCurrentDate(postObject.endDate)}
                onConfirm={(endDateTime) => {
                  setOpenEndDate(false);
                  formatDate("endDate", endDateTime);
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
                date={getCurrentHour(postObject.startTime)}
                onConfirm={(startHour) => {
                  setOpenStartHour(false);
                  formatHour("startTime", startHour);
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
                date={getCurrentHour(postObject.endTime)}
                onConfirm={(endHour) => {
                  setOpenEndHour(false);
                  formatHour("endTime", endHour);
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
                  backgroundColor: "white",
                  color: "black",
                  borderWidth: 1,
                  justifyContent: "center",
                  height: 53,
                }}
                activeOpacity={1}
                onPress={() => setOpenStartDate(true)}
              >
                <Text style={{ color: "gray", textAlign: "center" }}>
                  {dates.startDate ? dates.startDate : "Fecha inicio"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "white",
                  color: "black",
                  borderWidth: 1,
                  justifyContent: "center",
                  height: 53,
                }}
                activeOpacity={1}
                onPress={() => setOpenEndDate(true)}
              >
                <Text style={{ color: "gray", textAlign: "center" }}>
                  {dates.endDate ? dates.endDate : "Fecha fin"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                width: "45%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 30,
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 17, color: "black", textAlign: "center" }}
              >
                Flexible
              </Text>
              <Switch
                value={postObject.isFlexible}
                onValueChange={() =>
                  onChange("isFlexible", !postObject.isFlexible)
                }
                onColor={Colors.blue30}
              />
            </View>
            {!postObject.isFlexible && (
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
            )}
            {!postObject.isFlexible && (
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
                    backgroundColor: "white",
                    color: "black",
                    borderWidth: 1,
                    justifyContent: "center",
                    height: 53,
                  }}
                  activeOpacity={1}
                  onPress={() => setOpenStartHour(true)}
                >
                  <Text style={{ color: "gray", textAlign: "center" }}>
                    {dates.startTime ? dates.startTime : "Hora inicio"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 100,
                    borderColor: "gray",
                    borderRadius: 10,
                    backgroundColor: "white",
                    color: "black",
                    borderWidth: 1,
                    justifyContent: "center",
                    height: 53,
                  }}
                  activeOpacity={1}
                  onPress={() => setOpenEndHour(true)}
                >
                  <Text style={{ color: "gray", textAlign: "center" }}>
                    {dates.endTime ? dates.endTime : "Hora fin"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
                value={postObject.salaryMin}
                style={{
                  width: 100,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "white",
                  color: "black",
                  textAlign: "center",
                  borderWidth: 1,
                }}
                onChangeText={(text) => onChange("salaryMin", text)}
              />
              <TextInput
                placeholder={"Hasta"}
                placeholderTextColor={"gray"}
                keyboardType="numeric"
                value={postObject.salaryMax}
                style={{
                  width: 100,
                  borderColor: "gray",
                  borderRadius: 10,
                  backgroundColor: "white",
                  color: "black",
                  textAlign: "center",
                  borderWidth: 1,
                }}
                onChangeText={(text) => onChange("salaryMax", text)}
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
                  label={"Publicar"}
                  backgroundColor={Colors.blue30}
                  size={Button.sizes.large}
                  onPress={onHableCreateNewPost}
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
    backgroundColor: "white",
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
