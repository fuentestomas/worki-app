import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card, Colors, Icon, View } from "react-native-ui-lib";
import calendar from "../assets/img/calendar-2.png";
import pin from "../assets/img/pin.png";
import clock from "../assets/img/clock.png";
import restaurant from "../assets/img/working.png";

export const PostItems = ({ item, navigation }) => {
  const formatSalaryValue = (num) => {
    if (num < 1000) {
      return num.toString();
    }
    if (num < 10000) {
      let result = Math.round(num / 100) / 10;
      return result % 1 === 0
        ? result.toFixed(0) + "k"
        : result.toFixed(1) + "k";
    }
    return Math.round(num / 1000) + "k";
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("StackNavigator", {
          screen: "PostDescription",
          params: {
            idPost: item._id,
          },
        });
      }}
      activeOpacity={1}
      style={[styles.item]}
    >
      <Card flex style={{ width: "100%", maxWidth: 300, minHeight: 300 }}>
        <Card.Image
          source={
            item.image
              ? {
                  uri: `data:image/jpeg;base64,${item.image}`,
                }
              : restaurant
          }
          style={styles.cardImage}
        />
        <View
          style={{
            width: 90,
            height: 35,
            backgroundColor: Colors.blue30,
            borderRadius: 5,
            alignContent: "center",
            justifyContent: "center",
            marginLeft: 15,
            marginTop: 15,
            position: "absolute",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
              fontFamily: "Avenir-Medium",
            }}
          >
            {(item.salaryMax &&
              item.salaryMin &&
              `$${formatSalaryValue(item.salaryMin)} - $${formatSalaryValue(
                item.salaryMax
              )}`) ||
              "Sin info"}
          </Text>
        </View>
        <View style={{ height: 100, padding: 12, width: "100%" }}>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                color: "black",
                fontFamily: "Avenir-Black",
                fontSize: 18,
                marginVertical: -5,
              }}
            >
              {item.title}
            </Text>
          </View>
          <View
            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          >
            <Icon source={pin} size={14} tintColor={Colors.grey40} />
            <Text
              style={{
                color: Colors.grey30,
                paddingHorizontal: 4,
                fontSize: 12.5,
                fontFamily: "Avenir-Medium",
              }}
            >
              {item.location ? item.location : "Sin info"}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                marginTop: 13,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon source={calendar} size={16} tintColor={Colors.blue30} />
              <Text
                style={{
                  color: "black",
                  paddingHorizontal: 6,
                  fontSize: 11,
                  fontFamily: "Avenir-Medium",
                }}
              >
                {item.dateStart && item.dateEnd
                  ? `${item.dateStart} - ${item.dateEnd}`
                  : "Sin info"}
              </Text>
            </View>
            <View
              style={{
                marginTop: 13,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon source={clock} size={16} tintColor={Colors.blue30} />
              <Text
                style={{
                  color: "black",
                  paddingHorizontal: 6,
                  fontSize: 11,
                  fontFamily: "Avenir-Medium",
                }}
              >
                {item.timeStart && item.timeEnd
                  ? `${item.timeStart} - ${item.timeEnd}`
                  : "Flexible"}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 15, marginLeft: 2 }}>
            <Text
              style={{
                color: Colors.grey20,
                fontSize: 13,
                fontFamily: "Avenir-Medium",
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.description}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <View
            style={{
              width: 145,
              marginRight: 15,
              marginBottom: 15,
            }}
          ></View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 13,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    minWidth: 300,
    height: 140,
  },
});
