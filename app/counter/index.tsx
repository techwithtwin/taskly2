import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function CounterScreen() {
  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    console.log(result);

    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I'm a Notification from your app 😃",
        },
        trigger: {
          seconds: 5,
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });
    } else {
      if (Device.isDevice) {
        Alert.alert(
          "Unable to schedule Notification",
          "Enable the notification permission for Expo Go in settings",
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>Schedule Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: theme.colorBlack,
    borderRadius: 6,
    padding: 12,
  },
  buttonText: {
    color: theme.colorWhite,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
