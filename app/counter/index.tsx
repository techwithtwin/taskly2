import { Duration, intervalToDuration, isBefore } from "date-fns";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { TimeSegment } from "../../components/TimeSegment";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import { countdownStorageKey } from "../../constants";

// ToDO: make it dynamic
const frequency = 10 * 1000; // 10 seconds from now

type PersistedCountdownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });
  const [isLoading, setIsloading] = useState(true);

  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();

  const lastCompletedTimestamp = countdownState?.completedAtTimestamps[0];

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
      setIsloading(false);
    };
    init();
  }, []);
  useEffect(() => {
    let intevalId = setInterval(() => {
      const timestamp = lastCompletedTimestamp
        ? lastCompletedTimestamp + frequency
        : Date.now();
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
  }, [lastCompletedTimestamp]);
  const scheduleNotification = async () => {
    let pushNotificationId;
    const result = await registerForPushNotificationsAsync();
    console.log(result);

    if (result === "granted") {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "The thing is due!😃",
        },
        trigger: {
          seconds: frequency / 1000,
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
    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState?.currentNotificationId,
      );
    }
    const newCountdownState: PersistedCountdownState = {
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    };
    setCountdownState(newCountdownState);
    await saveToStorage(countdownStorageKey, newCountdownState);
  };
  if (isLoading)
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator />
      </View>
    );
  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      <Text
        style={[
          styles.heading,
          status.isOverdue ? styles.whiteText : undefined,
        ]}
      >
        Thing {status.isOverdue ? "overdue by" : "due in ..."}
      </Text>

      <View style={styles.row}>
        <TimeSegment
          unit="Days"
          number={status.distance.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={status.distance.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={status.distance.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={status.distance.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>I've done the thing</Text>
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
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
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
  row: {
    flexDirection: "row",
    marginBottom: 24,
  },
  whiteText: {
    color: theme.colorWhite,
  },
  activityIndicator: {
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
