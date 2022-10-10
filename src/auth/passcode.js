import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import linq from "js-linq";
//custom link
import MessageBox from "../api/msg";
import $xt from "../api/xtools";
import { apiPasscode } from "../api/authentication";
import BannerImage from "../../assets/images/logo.png";
import LoaddingLayout from "../template/loadding_layout";
import OverLayout from "../template/OverLayout";
import { colors, fontSize, styles } from "../stylesheet/styles";
export default function Passcode({ navigation }) {
  const $linq = (arr) => new linq(arr);
  const [isProcess, setProcess] = useState(false);
  const [isPasscode, setPasscode] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // let severVersion = Constants.nativeAppVersion;
        let isVersion = Constants.manifest.version;
        // if (severVersion > isVersion) {
        //   let messageBox = await MessageBox.Alert("Please update", "", `ตกลง`);
        //   if (messageBox) {
        //     Platform.OS == "ios"
        //       ? await Linking.openURL(
        //           `https://apps.apple.com/th/app/mango-pr-app/id1536377911?l=th`
        //         )
        //       : await Linking.openURL(
        //           `https://play.google.com/store/apps/details?id=1536377911`
        //         );
        //   }
        // }
        // console.log("severVersion", severVersion, "<", isVersion);
        let passcode = (await AsyncStorage.getItem("passcode")) || "";
        setPasscode(passcode);
      } catch (ex) {
        MessageBox.Alert(`Error`, ex.toString());
      }
    };
    fetchData();
  }, []);
  const _doNext = async () => {
    let passcode = (isPasscode || "").toUpperCase().trim();
    setPasscode(passcode);
    setProcess(true);
    try {
      setLoading(true);
      if ($xt.isEmpty(passcode)) {
        throw `Please Enter Company Code.`;
      }
      let rsp = await apiPasscode.getIP(passcode);
      if (rsp.error) {
        throw rsp.error;
      }
      let __baseUrl =
        $linq(rsp.data)
          .select((x) => x.path)
          .firstOrDefault() || "";
      console.log("rsp.data", __baseUrl);
      await AsyncStorage.setItem("baseUrl", __baseUrl);
      await AsyncStorage.setItem("workplaces", JSON.stringify(rsp.data));
      await AsyncStorage.setItem("passcode", passcode);
      navigation.navigate("Login");
      setLoading(false);
    } catch (ex) {
      MessageBox.Alert(`Error`, ex.toString());
    } finally {
      setLoading(false);
    }

    setProcess(false);
  };
  return (
    // <OverLayout props={
    <>
      {/* https://docs.expo.io/versions/latest/sdk/status-bar */}
      {/* <Image
        style={[styles.stretch, { position: 'absolute' }]}
        ImageCacheEnum={'force-cache'}
        source={require('../../assets/images/passcode_bg.jpg')}
      /> */}
      {loading ? <LoaddingLayout /> : null}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ paddingHorizontal: 30, marginTop: "10%" }}>
          <Image source={BannerImage} style={styles.banner} />
          <View style={{ paddingBottom: 30 }}>
            <Text
              style={[styles.h3, { color: colors.black, textAlign: "center" }]}
            >
              ป้อนรหัสบริษัท
            </Text>
            <Text
              style={{ marginTop: 15, textAlign: "center", color: colors.red }}
            >
              เพื่อดำเนินการต่อโปรดป้อนรหัสบริษัท(PassCode)
            </Text>
          </View>

          <View style={{ marginBottom: 30 }}>
            {/* https://docs.expo.io/guides/icons */}
            {/* <FontAwesome5 name="lock" style={styles.iconLock} /> */}

            {/* https://reactnative.dev/docs/textinput */}
            <Text style={{ fontSize: 17 }}>Passcode</Text>
            <TextInput
              style={[
                styles.inputPasscode,
                {
                  fontSize: isPasscode ? 18 : 14,
                  textAlign: isPasscode ? "center" : "right",
                },
              ]}
              value={isPasscode}
              placeholder="กรอก Passcodee"
              placeholderTextColor="#929292"
              onChangeText={(passcode) => setPasscode(passcode)}
            />
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => _doNext()}
            >
              <Text style={styles.buttonLoginText}>ตกลง</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 5,
                backgroundColor: "#fafafa",
                justifyContent: "center",
                alignContent: "center",
                marginTop: 10,
                fontSize: 18,
              }}
              onPress={() => navigation.navigate("Usertype")}
            >
              <Text style={{ color: "#000", textAlign: "center" }}>
                เปลี่ยนทางเข้าผู้ใช้
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>

    // }
    // />
  );
}
