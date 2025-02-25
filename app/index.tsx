import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, TextInput, ScrollView } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.input}
        placeholder="E.g Coffee"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      <StatusBar style="dark" />
      {shoppingList.map((item) => (
        <ShoppingListItem
          key={item.id}
          name={item.name}
          isCompleted={item.isCompleted}
          onComplete={() => onComplete(item.id)}
        />
      ))}
    </ScrollView>
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
    paddingVertical: 4,
  },
});
