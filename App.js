import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { BackHandler, Text, AppState, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from 'expo-app-loading';
import * as Updates from 'expo-updates';
import {
  Inter_300Light,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  useFonts,
  Prompt_300Light,
  Prompt_500Medium,
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
import Project from "./src/project";
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
        let project_list = await AsyncStorage.getItem("project_list") || "";
        console.log("check authen...", project_list);

        setInitialScreen("Project");
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
    fetchData();
    return () => {
      backHandler.remove();
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
            const { latitude, longitude } = location.coords;
            console.log("latitude", latitude, "longitude", longitude);
            global.latitude = latitude
            global.longitude = longitude
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
              name="Project"
              component={Project}
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