import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib'; 
import back from '../assets/img/back.png';
import logout from '../assets/img/logout.png';
import worker from '../assets/img/worker.png';

const ProfileScreen = ({ navigation }) => {
  const user = {
    photoURL: worker,
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Mozo',
    location: 'Buenos Aires, Argentina',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    expectedSalary: '$2000 - $3000',
    fieldOfInterest: 'Gastronomía',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
            <Image source={back} style={styles.backImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => {}}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <Image source={user.photoURL} style={styles.profileImage} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
              {user.jobTitle && <Text style={styles.jobTitle}>{user.jobTitle}</Text>}
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
              <Text style={styles.sectionText}>{`Salario esperado: ${user.expectedSalary}`}</Text>
              <Text style={styles.sectionText}>{`Rubro de interés: ${user.fieldOfInterest}`}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
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
    backgroundColor: 'white', 
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  editButtonText: {
    fontSize: 16,
    color: Colors.blue30, 
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: 'white', 
  },
  infoContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'white', 
  },
  jobTitle: {
    fontSize: 18,
    color: 'gray',
    backgroundColor: 'white', 
  },
  location: {
    fontSize: 16,
    color: 'gray',
  },
  section: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    marginLeft: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
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
    color: 'black',
    backgroundColor: 'white', 
  },
});

export default ProfileScreen;
