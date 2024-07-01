import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import back from "../assets/img/back.png";
import { getPostDetail } from "../services/posts";
import React, { useContext, useState } from "react";
import restaurant from "../assets/img/working.png";
import { Button, Colors, Icon } from "react-native-ui-lib";
import pin from "../assets/img/pin.png";
import { AuthContext } from "../context/AuthContext";
import LoaderKit from "react-native-loader-kit";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { getUserAppliedPosts } from "../services/appliers";

export const PostDescription = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const { role, id } = user;
  const [postDetails, setPostDetail] = useState({});
  const [isUserApplied, setUserApplied] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const { idPost } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [isFocused, idPost])
  );

  const getData = async () => {
    setIsLoading(true);
    setUserApplied({});
    if (role == "worker") {
      const body = {
        userId: id,
        offerId: idPost,
      };
      const data = await getUserAppliedPosts(body);

      if (data) {
        setUserApplied(data);
      }
    }

    const data = await getPostDetail(idPost);
    if (data) {
      setPostDetail(data);
      setIsLoading(false);
    }
  };

  const validateNextView = () => {
    if (role == "business" || role == "person") {
      return navigation.navigate({
        name: "AppliersScreen",
        params: { idPost },
      });
    }

    return navigation.navigate({
      name: "ApplicationScreen",
      params: { idPost },
    });
  };

  const validateButtonLabel = () => {
    if (role == "business" || role == "person") {
      return "Visualizar postulantes";
    } else if (isUserApplied.status === "applied") {
      return "Postulado";
    }

    return "Aplicar ahora";
  };

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", backgroundColor: "white" }}>
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
        <ScrollView>
          <View style={{ width: "100%" }}>
            <View style={{ width: "100%", height: 320 }}>
              <TouchableOpacity
                style={{ position: "absolute", zIndex: 1 }}
                onPress={() =>
                  navigation.navigate("TabNavigator", {
                    screen: "Home",
                  })
                }
              >
                <View style={{ width: 25, height: 80, marginLeft: 10 }}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: "100%",
                      height: "100%",
                      tintColor: "white",
                    }}
                    source={back}
                  />
                </View>
              </TouchableOpacity>
              <Image
                source={
                  postDetails.image
                    ? {
                        uri: `data:image/jpeg;base64,${postDetails.image}`,
                      }
                    : restaurant
                }
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                marginTop: -35,
                paddingHorizontal: 30,
              }}
            >
              <View style={{ marginTop: 30, flexDirection: "row" }}>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    backgroundColor: postDetails?.userId?.photo
                      ? "none"
                      : "black",
                  }}
                >
                  {postDetails?.userId?.photo && (
                    <Image
                      source={
                        postDetails.userId.photo
                          ? {
                              uri: `data:image/jpeg;base64,${postDetails.userId.photo}`,
                            }
                          : restaurant
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                      }}
                    />
                  )}
                </View>
                <View style={{ marginLeft: 16, flex: 1 }}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 22,
                      fontFamily: "Avenir-Black",
                      marginVertical: -5,
                    }}
                  >
                    {postDetails.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    <Icon source={pin} size={14} tintColor={Colors.grey30} />
                    <Text
                      style={{
                        color: Colors.grey20,
                        paddingHorizontal: 4,
                        fontSize: 12.5,
                        fontFamily: "Avenir-Medium",
                      }}
                    >
                      {postDetails.location ? postDetails.location : "Sin info"}
                    </Text>
                  </View>
                  <View style={{ width: "100%", marginTop: 5 }}>
                    <View
                      style={{
                        maxWidth: 110,
                        backgroundColor: Colors.blue20,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 13,
                          textAlign: "center",
                          fontFamily: "Avenir-Medium",
                        }}
                      >
                        {`$${postDetails.salaryMin} - $${postDetails.salaryMax}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View
                  style={{
                    width: "70%",
                    marginVertical: 30,
                    backgroundColor: "#EBEBEB",
                    borderRadius: 7,
                    padding: 8,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      maxWidth: 170,
                      backgroundColor: "white",
                      borderRadius: 8,
                      shadowColor: "#000000",
                      shadowOpacity: 0.5,
                      elevation: Platform.OS == "android" ? 3 : 0,
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 14,
                        padding: 8,
                        textAlign: "center",
                        fontFamily: "Avenir-Medium",
                      }}
                    >
                      Descripción
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginVertical: 5 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    fontFamily: "Avenir-Medium",
                  }}
                >
                  {postDetails.description}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      <View
        style={{
          width: "100%",
          alignItems: "center",
          position: "absolute",
          bottom: 25,
        }}
      >
        <View style={{ width: "70%" }}>
          <Button
            style={{
              borderRadius: 15,
              paddingTop: 12,
              paddingBottom: 9,
              shadowColor: "gray",
              shadowRadius: 5,
              shadowOpacity: 0.28,
              flexDirection: "row",
              shadowColor: "#000000",
              shadowOpacity: 0.5,
              elevation: Platform.OS == "android" ? 5 : 0,
            }}
            labelStyle={{
              fontSize: 20,
              color: Colors.white,
              fontFamily: "Avenir-Medium",
            }}
            label={validateButtonLabel()}
            backgroundColor={Colors.blue20}
            size={Button.sizes.large}
            disabled={isUserApplied.status === "applied"}
            onPress={() => validateNextView()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
