import React from "react";
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
import back from "../assets/img/back.png";
import logout from "../assets/img/logout.png";
import worker from "../assets/img/worker.png";
import { signOutFromGoogle } from "../firebase/googleProvider";

const ProfileScreen = ({ navigation }) => {
  const user = {
    photoURL: worker,
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Mozo",
    location: "Buenos Aires, Argentina",
    email: "john.doe@example.com",
    phone: "+1234567890",
    expectedSalary: "$2000 - $3000",
    fieldOfInterest: "Gastronomía",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
            <Image source={user.photoURL} style={styles.profileImage} />
            <View style={styles.infoContainer}>
              <Text
                style={styles.name}
              >{`${user.firstName} ${user.lastName}`}</Text>
              {user.jobTitle && (
                <Text style={styles.jobTitle}>{user.jobTitle}</Text>
              )}
              <Text style={styles.location}>{user.location}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos de contacto</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionText}>{user.email}</Text>
              <Text style={styles.sectionText}>{user.phone}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información adicional</Text>
            <View style={styles.sectionContent}>
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
                {` ${user.expectedSalary}`}
              </Text>
              <Text style={styles.sectionText}>
                <Text
                  style={{
                    color: "black",
                    fontWeight: 500,
                    fontFamily: "Avenir-Black",
                  }}
                >
                  Rubro de interés:
                </Text>
                {` ${user.fieldOfInterest}`}
              </Text>
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
