import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Colors } from "react-native-ui-lib";
import logout from "../assets/img/logout.png";
import { signOutFromGoogle } from "../firebase/googleProvider";
import { getUserInfo } from "../services/user";
import LoaderKit from "react-native-loader-kit";
import { loadFromLocalStorage } from "../hooks/useLocalStorage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getData();
    }, [isFocused])
  );

  const getData = async () => {
    const { id } = await loadFromLocalStorage("auth");
    const data = await getUserInfo(id);
    if (data) {
      setUser(data);
      setIsLoading(false);
    }
  };

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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text
            style={{
              color: "black",
              fontSize: 21,
              marginLeft: 10,
              marginTop: 10,
              fontWeight: 500,
              fontFamily: "Avenir-Black",
            }}
          >
            Mi perfil
          </Text>
          <View style={styles.container}>
            <View style={styles.profileContainer}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${user.photo}`,
                }}
                style={styles.profileImage}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{`${user.fullName}`}</Text>
                {user.job && <Text style={styles.jobTitle}>{user.job}</Text>}
                <Text style={styles.location}>{user.address}</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Datos de contacto</Text>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionText}>{user.emailAddress}</Text>
                <Text style={styles.sectionText}>+{user.phoneNumber}</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Información adicional</Text>
              <View style={styles.sectionContent}>
                {user.roles[0] === "worker" ? (
                  <Text style={styles.sectionText}>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: 500,
                        fontFamily: "Avenir-Black",
                      }}
                    >
                      Salario pretendido:
                    </Text>
                    {` ${user.avgPayRate}`}
                  </Text>
                ) : (
                  <Text style={styles.sectionText}>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: 500,
                        fontFamily: "Avenir-Black",
                      }}
                    >
                      Rango de salarios:
                    </Text>
                    {` ${user.avgPayRate}`}
                  </Text>
                )}
                {user.roles[0] === "business" && (
                  <Text style={styles.sectionText}>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: 500,
                        fontFamily: "Avenir-Black",
                      }}
                    >
                      Rubro:
                    </Text>
                    {` ${user.category}`}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                signOutFromGoogle(navigation);
              }}
            >
              <Image source={logout} style={styles.logoutImage} />
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  backImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  editButtonText: {
    fontSize: 16,
    color: Colors.blue30,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: "white",
    marginLeft: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    color: "black",
    fontFamily: "Avenir-Medium",
  },
  name: {
    fontSize: 24,
    backgroundColor: "white",
    color: "black",
    fontFamily: "Avenir-Black",
  },
  jobTitle: {
    fontSize: 18,
    color: "gray",
    backgroundColor: "white",
    fontFamily: "Avenir-Medium",
  },
  location: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Avenir-Medium",
  },
  section: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 25,
    fontFamily: "Avenir-Medium",
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 6,
    color: "black",
    fontFamily: "Avenir-Black",
  },
  sectionContent: {
    marginLeft: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 5,
    color: "gray",
    fontFamily: "Avenir-Medium",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  logoutImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    color: "black",
    backgroundColor: "white",
    fontFamily: "Avenir-Medium",
  },
});

export default ProfileScreen;
