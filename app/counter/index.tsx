import { Duration, intervalToDuration, isBefore } from "date-fns";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { TimeSegment } from "../../components/TimeSegment";

// ToDO: make it dynamic
const timestamp = Date.now() + 10 * 1000; // 10 seconds from now

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  useEffect(() => {
    let intevalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? { start: timestamp, end: Date.now() }
          : {
              start: Date.now(),
              end: timestamp,
            },
      );
      setStatus({ isOverdue, distance });
    }, 1000);

    return () => {
      clearInterval(intevalId);
    };
  }, []);
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
      <Text style={styles.heading}>
        Thing {status.isOverdue ? "overdue by" : "due in ..."}
      </Text>

      <View style={styles.row}>
        <TimeSegment unit="Days" number={status.distance.days ?? 0} />
        <TimeSegment unit="Hours" number={status.distance.hours ?? 0} />
        <TimeSegment unit="Minutes" number={status.distance.minutes ?? 0} />
        <TimeSegment unit="Seconds" number={status.distance.seconds ?? 0} />
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
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
  heading: {},
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
  row: {
    flexDirection: "row",
  },
});
