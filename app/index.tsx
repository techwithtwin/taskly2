import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.input}
        placeholder="E.g Coffee"
      />
      <StatusBar style="dark" />
      <ShoppingListItem name="Coffee" isCompleted />
      <ShoppingListItem name="Tea" />
      <ShoppingListItem name="Sugar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 20,
  },
  input: {
    borderBottomColor: theme.colorCerulian,
    borderBottomWidth: 2,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 10,
    padding: 12,
  },
});
