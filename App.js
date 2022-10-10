import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { BackHandler, Text, AppState, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from 'expo-app-loading';
import * as Updates from 'expo-updates';
import {
  // useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import {
  useFonts,
  Prompt_100Thin,
  Prompt_100Thin_Italic,
  Prompt_200ExtraLight,
  Prompt_200ExtraLight_Italic,
  Prompt_300Light,
  Prompt_300Light_Italic,
  Prompt_400Regular,
  Prompt_400Regular_Italic,
  Prompt_500Medium,
  Prompt_500Medium_Italic,
  Prompt_600SemiBold,
  Prompt_600SemiBold_Italic,
  Prompt_700Bold,
  Prompt_700Bold_Italic,
  Prompt_800ExtraBold,
  Prompt_800ExtraBold_Italic,
  Prompt_900Black,
  Prompt_900Black_Italic,
} from '@expo-google-fonts/prompt';
import * as Linking from "expo-linking";
import { styles, colors } from "./src/stylesheet/styles";
import { apiAuth, loginOtherApplication } from "./src/api/authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment-timezone";
import MessageBox from "./src/api/msg";

import * as Notifications from 'expo-notifications';
import * as Location from "expo-location";
import { getLocation } from "./src/api/constants";
import * as Device from 'expo-device';
import $xt from "./src/api/xtools";
import Alert from "./src/components/Alert";
import Usertype from "./src/auth/usertype"
import Passcode from "./src/auth/passcode";
import Login from "./src/auth/login";
import PinCode from "./src/auth/pincode";
import Home from "./src/home";
import Setting from "./src/setting/setting";
import HeaderRight from "./src/components/headerRight";
import HeaderLeft from "./src/components/headerLeft";

////// signature ////////////

const Stack = createStackNavigator();

export default function App({ navigation }) {
  let [fontsLoaded] = useFonts({
    Prompt_300Light, Inter_300Light, Inter_700Bold, Prompt_500Medium
  });
  const [isReady, setReady] = useState(false);
  const [isInitialScreen, setInitialScreen] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [alertShow, setAlertShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = await Linking.getInitialURL();
        console.log("url", url);
        let newURL = Linking.parse(url || "*");
        let newBaseUrl = newURL?.queryParams?.baseUrl;
        let newMangoAuth = newURL?.queryParams.mango_auth;
        let newPasscode = newURL?.queryParams?.passcode;
        let newBasePath = newURL?.queryParams?.webview;
        let newSession = newURL?.queryParams?.session;
        let newAuth = JSON.stringify(newURL?.queryParams?.auth);
        if (!$xt.isEmpty(newMangoAuth)) {
          await AsyncStorage.multiSet([
            ["baseUrl", newBaseUrl] || "",
            ["passcode", newPasscode || ""],
            ["basePath", newBasePath || ""],
            ["session", newSession || ""],
            ["auth", newAuth || ""],
          ]);
          let newLogin = await loginOtherApplication(newMangoAuth, "APPIC");
          console.log("new token:", newLogin.token);
          await AsyncStorage.setItem("mango_auth", newLogin.token || "");
          await AsyncStorage.setItem("Times", SleepTime);
        }

        let passcode = (await AsyncStorage.getItem("passcode")) || "";
        let baseUrl = (await AsyncStorage.getItem("baseUrl")) || "";
        let pincode_menu = await AsyncStorage.getItem("pincode_menu") || "N";
        let project_list = await AsyncStorage.getItem("project_list") || "";
        console.log("check authen...", project_list);
        if (passcode && baseUrl) {
          let auth = (await apiAuth.getAuth()).data.auth;
          console.log("auth", auth);
          if (auth.is_authen) {
            if ($xt.isEmpty(project_list)) {
              // setInitialScreen("SelectProject");
            } else setInitialScreen(pincode_menu == 'Y' ? "PinCode" : "Home");
          } else setInitialScreen(pincode_menu == 'Y' ? "PinCode" : "Login");
        } else {
          setInitialScreen("Usertype");
        }
        await getPermissionAsync();
        console.log("get location...");
        setReady(true);
      } catch (ex) {
        let msg = await MessageBox.Alert(`Error`, ex.toString());
        msg ? setInitialScreen("Passcode") : null
      }
    };
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    // AppState.addEventListener("change", _handleAppStateChange);
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    fetchData(apiAuth.getAuth());
    return () => {
      backHandler.remove();
      // subscription.remove();
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  }, []);

  const getPermissionAsync = async () => {
    var { status } = await Location.requestForegroundPermissionsAsync();
    // setStatus(status)
    // this.setState({ isStatus: status });
    console.log("status", status);
    if (status !== "granted") {
      let _ms = await MessageBox.Confirm(
        "โปรดยืนยัน",
        `สิทธิ์ในการเข้าถึงตำแหน่งถูกปฏิเสธ \n ต้องการไปที่ตั้งค่าหรือไม่?`,
        "ไม่ใช่",
        "ใช่"
      );
      console.log("_ms", _ms);
      if (_ms) {
        openSetting();
      }
      return;
    } else {
      let _getlocation = [];
      if (status === "granted") {
        //write code for the app to handle GPS changes
        _getlocation = Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 10000,
            distanceInterval: 1,
          },
          async (location) => {
            // console.log("OS sent Location ");
            const { latitude, longitude } = location.coords;
            console.log("latitude", latitude, "longitude", longitude);
            // const mangoLoc = await getLocation(latitude, longitude);
            // let gps_location_coordinate = `${latitude},${longitude}`;
            // console.log("gps_location_coordinate", gps_location_coordinate);
            // this.setState({ gps_location, gps_location_coordinate });
            // await AsyncStorage.setItem("gps_location", gps_location || "");
            // await AsyncStorage.setItem("gps_location_coordinate", gps_location_coordinate || "");
            global.latitude = latitude
            global.longitude = longitude
            // await AsyncStorage.setItem("latitude", latitude || "");
            // await AsyncStorage.setItem("longitude", longitude || "");
          }
        );
      }
    }
  };
  const openSetting = async () => {
    await Linking.openSettings();
    await $xt.sleep(200);
    await Updates.reloadAsync()
  };
  const _handleAppStateChange = async nextAppState => {
    // console.log("nextAppState", nextAppState);
    if (appState.current.match(/background/) && nextAppState === 'active') {
      var setTime = await AsyncStorage.getItem("Times") || "";
      var nowTime = Moment(new Date()).format("HH:mm")
      console.log('App has come to the foreground at time :', nowTime);
      var diff_ms = Moment(nowTime, 'HH:mm').diff(Moment(setTime, 'HH:mm'));
      var dur_obj = Moment.duration(diff_ms)
      // console.log("Moment", Moment(nowTime, 'HH:mm').format("HH:mm"), "====", Moment(setTime, 'HH:mm').format("HH:mm"));
      if (dur_obj.minutes() > 0.5 && !$xt.isEmpty(setTime)) {
        setAlertShow(!alertShow)
      }
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    // console.log('AppState', appState.current);
    if (appState.current === 'background') {
      var SleepTime = Moment(new Date()).format("HH:mm")
      console.log("SleepTime", SleepTime);
      await AsyncStorage.setItem("Times", SleepTime);
    }
  };
  // const _handleAppStateChange = async nextAppState => {
  //   console.log("AppState current ==", appState.current,"nextAppState ==", nextAppState);
  //   if (appState.current ==='background' && nextAppState === 'active') {
  //     console.log('App has come to the foreground!');
  //     var setTime = await AsyncStorage.getItem("Times") || "";
  //     var nowTime = Moment(new Date()).format("HH:mm")
  //     var diff_ms = Moment(nowTime, 'HH:mm').diff(Moment(setTime, 'HH:mm'));
  //     var dur_obj = Moment.duration(diff_ms)
  //     if (dur_obj.minutes() > 2 && !$xt.isEmpty(setTime)) {
  //       console.log("Moment", Moment(nowTime, 'HH:mm').format("HH:mm"), "====", Moment(setTime, 'HH:mm').format("HH:mm"));
  //       setAlertShow(!alertShow)
  //     }
  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   };
  // }
  const MyTheme = {
    dark: false,
    colors: {
      primary: "rgb(255, 00, 00)",
      background: "#e5e9ea",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
    },
  };
  const _onClose = async () => {
    setAlertShow(!alertShow)
    await AsyncStorage.setItem("Times", "");
    Updates.reloadAsync()
  }
  // if (!loaded) {
  //   return null;
  // }
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer theme={MyTheme}>
      {isReady ? (
        <>
          {alertShow && <Alert
            visible={alertShow}
            onClose={() => { _onClose({ navigation }) }}
            message={"Your Session is Expire!"}
            type={"warning"}
          />
          }
          <Stack.Navigator
            initialRouteName={isInitialScreen}
            screenOptions={({ route, navigation }) => ({
              headerRight: () => <HeaderRight navigation={navigation} showScan={false} showIcon={false} />,
              headerLeft: () => <HeaderLeft navigation={navigation} />,
              headerStyle: {
                // backgroundColor: colors.white,
                shadowColor: "transparent",
                elevation: 0,
              },
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              // headerTintColor: colors.white
            })}
          >
            <Stack.Screen
              name="Usertype"
              component={Usertype}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="PinCode"
              component={PinCode}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Project',
                headerLeft: "",
                // headerRight: "",
              }}
            />
            <Stack.Screen
              name="Setting"
              component={Setting}
              options={{
                title: '',
                headerRight: "",
                // headerShown: false
              }}
            />
          </Stack.Navigator>
        </>
      ) : null}
    </NavigationContainer>
  );
}
async function registerForPushNotificationsAsync() {
  let token;
  // console.log("Device.isDevice", Device.isDevice);
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}