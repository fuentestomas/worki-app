import { Text, View } from "react-native";
import { Colors } from "react-native-ui-lib";

export const EmptyList = ({ text }) => {
  return (
    <View
      style={{
        width: "100%",
        maxWidth: 300,
        minHeight: 300,
        justifyContent: "center",
        borderRadius: 13,
        elevation: 2,
        backgroundColor: "white",
        marginVertical: 8,
      }}
    >
      <Text style={{ color: Colors.grey20, textAlign: "center" }}>
        {text}
      </Text>
    </View>
  );
};
