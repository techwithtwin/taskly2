import {
  Alert,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  name: string;
  completedAtTimestamp: number | undefined;
  onDelete: () => void;
  onToggleComplete: () => void;
}

function ShoppingListItem({
  name,
  onDelete,
  completedAtTimestamp,
  onToggleComplete,
}: Props) {
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
          onPress: () => onDelete(),
          style: "destructive",
        },
      ],
    );
  };
  return (
    <View
      style={[
        styles.itemContainer,
        completedAtTimestamp ? styles.completedContainer : undefined,
      ]}
    >
      <View style={styles.leftContainer}>
        <Pressable hitSlop={20} onPress={onToggleComplete}>
          {completedAtTimestamp ? (
            <Entypo name="circle" size={20} color="green" />
          ) : (
            <Feather name="check" size={24} color="black" />
          )}
        </Pressable>

        <Text
          style={[
            styles.itemText,
            completedAtTimestamp ? styles.completedText : undefined,
          ]}
        >
          {name}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
        <AntDesign
          name="closecircle"
          size={24}
          color={completedAtTimestamp ? theme.colorGray : theme.colorRed}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ShoppingListItem;

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
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
