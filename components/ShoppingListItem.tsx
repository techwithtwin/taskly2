import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  name: string;
  isCompleted: boolean;
  onComplete: () => void;
}

function ShoppingListItem({ name, isCompleted, onComplete }: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "it will be gone forever",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => onComplete(),
          style: "destructive",
        },
      ],
    );
  };
  return (
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>
      <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGray : theme.colorRed}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ShoppingListItem;

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulian,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedContainer: {
    backgroundColor: theme.colorLightGray,
    borderBottomColor: theme.colorLightGray,
  },
  itemText: { fontSize: 18, fontWeight: "300" },
  completedText: {
    color: theme.colorGray,
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGray,
  },
});
