import { Alert, Image, ScrollView, ToastAndroid } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Colors } from "react-native-ui-lib";
import back from "../assets/img/back.png";
import RNFetchBlob from "rn-fetch-blob";

export const ApplierDetailsScreen = ({ navigation, route }) => {
  const { idPost, applier } = route.params;

  const downloadPdf = () => {

    const showToast = (message) => {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    // Path de destino para guardar el PDF en el dispositivo
    const savePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${applier.fileName}.pdf`;

    // Decodificar el base64 y guardar el PDF en el dispositivo
    RNFetchBlob.fs
      .writeFile(savePath, applier.cv, "base64")
      .then(() => {
        showToast("Descarga completada");
      })
      .catch((error) => {
        showToast("Hubo un error en la descarga");
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", marginTop: 30, marginLeft: 20 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate({
              name: "AppliersScreen",
              params: { idPost },
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
              Información del postulante
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{ marginTop: 38 }}>
              <Text
                style={{ fontSize: 17, color: "black", textAlign: "center" }}
              >
                Currículum
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Colors.blue30,
                      justifyContent: "center",
                      width: 250,
                      height: 40,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        color: "white",
                        textAlign: "center",
                        paddingHorizontal: 10,
                      }}
                    >
                      {applier.fileName}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View style={{ width: "100%", alignItems: "center" }}>
                  <Button
                    label={"Descargar currículum"}
                    size={Button.sizes.xSmall}
                    style={{
                      borderRadius: 8,
                      paddingTop: 8,
                      paddingBottom: 8,
                    }}
                    backgroundColor={Colors.blue30}
                    onPress={downloadPdf}
                  />
                </View>
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
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: "white",
                borderColor: "gray",
                fontSize: 15,
                borderWidth: 1,
                minHeight: 150,
                padding: 10,
              }}
            >
              <Text style={{ color: "black", textAlign: "center" }}>
                {applier.description}
              </Text>
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
