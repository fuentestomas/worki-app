import { useState } from "react";
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Colors } from "react-native-ui-lib";
import back from "../assets/img/back.png";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";

const initialState = {
  cvFile: "",
  description: "",
};

const requestStoragePermission = async () => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permiso de almacenamiento",
          message: "Esta aplicación necesita acceso a tu almacenamiento",
          buttonNeutral: "Pregúntame luego",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

const ApplicationScreen = ({ navigation, route }) => {
  const [applicationObject, setApplicationObject] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState({ isThereFile: false });

  const { id } = route.params;

  const onChange = (name, value) => {
    setApplicationObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocumentSelection = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      if (res && res[0]) {
        const file = res[0];
        const base64File = await RNFS.readFile(file.uri, "base64");

        const updatedObject = {
          ...applicationObject,
          cvFile: base64File,
        };

        const fileObject = {
          ...file,
          isThereFile: true,
        };
        setApplicationObject(updatedObject);
        setSelectedFile(fileObject);
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

  const handleDeleteResume = () => {
    setSelectedFile((prevState) => {
      return {
        ...prevState,
        isThereFile: false,
      };
    });

    setApplicationObject((prevState) => {
      return {
        ...prevState,
        cvFile: "",
      };
    });
  };

  const onHandleApply = () => {
    console.log('applicationObject:', applicationObject);
    console.log('Apllied!');
  }

  //   const handleFileDownload = async () => {
  //     if (base64File && selectedFile) {
  //       const hasPermission = await requestStoragePermission();
  //       if (hasPermission) {
  //         const downloadPath = `${RNFS.DownloadDirectoryPath}/${selectedFile.name}`;
  //         try {
  //           await RNFS.writeFile(downloadPath, base64File, 'base64');
  //           Alert.alert('Éxito', `Archivo guardado en: ${downloadPath}`);
  //         } catch (error) {
  //           console.error('Error copying file: ', error);
  //           Alert.alert('Error', 'No se pudo guardar el archivo');
  //         }
  //       } else {
  //         Alert.alert('Error', 'Permiso de almacenamiento denegado');
  //       }
  //     } else {
  //       Alert.alert('Error', 'Primero selecciona un archivo');
  //     }
  //   };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", marginTop: 30, marginLeft: 20 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate({
              name: "PostDescription",
              params: { id },
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
            <View style={{ marginTop: 38 }}>
              <Text
                style={{ fontSize: 17, color: "black", textAlign: "center" }}
              >
                Cargue su currículum
              </Text>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedFile.isThereFile ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 5,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.blue30,
                        justifyContent: "center",
                        width: 250,
                        height: 40,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: "white", textAlign: "center", paddingHorizontal: 10 }}
                      >
                        {selectedFile.name}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={handleDeleteResume}>
                      <Text style={{ color: "black", fontSize: 15 }}>X</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Button
                    label={"Cargar currículum"}
                    size={Button.sizes.xSmall}
                    style={{
                      borderRadius: 8,
                      paddingTop: 5,
                      paddingBottom: 5,
                      width: 150,
                    }}
                    backgroundColor={Colors.blue30}
                    onPress={handleDocumentSelection}
                  />
                )}
              </View>
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
              Descripción breve
            </Text>
            <TextInput
              placeholder={"Escriba la descripción del puesto"}
              placeholderTextColor={"gray"}
              multiline={true}
              value={applicationObject.description}
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
          <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 80,
              marginBottom: 50,
            }}
          >
            <View style={{ width: "65%" }}>
              <Button
                style={{ borderRadius: 15 }}
                labelStyle={{ fontSize: 20 }}
                label={"Postularme"}
                backgroundColor={Colors.blue30}
                size={Button.sizes.large}
                onPress={onHandleApply}
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
    height: 70,
    marginTop: 20,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.blue30,
    backgroundColor: "white",
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

export default ApplicationScreen;
