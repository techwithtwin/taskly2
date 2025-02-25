import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";

type ShoppingListItemType = {
  id: string;
  name: string;
  isCompleted: boolean;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Coffee", isCompleted: false },
  { id: "2", name: "Tea", isCompleted: false },
  { id: "3", name: "Milk", isCompleted: true },
];

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialList);

  const handleSubmit = () => {
    if (!value) {
      Alert.alert("Invalid Item name");
      return;
    }

    setShoppingList((p) => [
      { id: Date.now().toString(), name: value, isCompleted: false },
      ...p,
    ]);

    setValue("");
  };

  const onComplete = (id: string) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };
  return (
    <FlatList
      data={shoppingList}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shooping list is empty</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.input}
          placeholder="E.g Coffee"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          isCompleted={item.isCompleted}
          onComplete={() => onComplete(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  input: {
    backgroundColor: theme.colorWhite,
    borderColor: theme.colorLightGray,
    borderWidth: 2,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
});
