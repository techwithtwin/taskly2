import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { theme } from "../../theme";
import { Pressable } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => (
            <Link href="/counter/history" asChild>
              <Pressable hitSlop={20}>
                <MaterialIcons
                  name="history"
                  size={28}
                  color={theme.colorGray}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
