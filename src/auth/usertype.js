import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { colors } from "../stylesheet/styles";
import Layout from "../template/layout";

export default function Usertype({ navigation }) {
  const [result, setResult] = useState(null);

  const onYoutube = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://www.youtube.com/channel/UCy--05IjGjmJh8N-VTYcbxA"
    );
    setResult(result);
  };

  const onFacebook = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://web.facebook.com/mangoconsultant/?hc_ref=ARQvOtJGF71GOw1Hkl0__bbBoUq8KjR7_OTtbf12pCR5boOFDJA_h_Je-d1XblY2epw&fref=nf&__xts__[0]=68.ARAxeMY7IrjhGAsDxGDGaFnvQikxH9oEcoRmPKKt9OYpGTl7ekhWCQ1HX7w136sTiqr09b_IluiowQkSEjr4qVxR1MJquatTJKnNfMsktUmZX_a196U5KMDFzgP26wNlrwUYfQ5dnDQImiSYcdRtYd3n-_z-pJZH_CbHWaA44Xfx8FH5jQoRzmBogAAaNnkyl-s47W3Xc8sN5pd7KANiNeVP39er-uL_FUaFiW3ou5MrS9v0Zfw_5urVLrkQIoFGO6fZ2nIapK222IX7VhCJvZIQA1tqZBKWu6cr2TgBH3HGwim4LduAGn0266Ihgv1QFe2e5Z-EbSlZRN2jY-RrFp8xpw&__tn__=kC-R"
    );
    setResult(result);
  };

  const onInstargram = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://www.instagram.com/mangoconsultant/"
    );
    setResult(result);
  };
  const onGotoLogin = async (usertype) => {
    try {
      await AsyncStorage.setItem("usertype", usertype);
      navigation.navigate("Home");
    } catch (e) {
      // saving error
    }
  };
  const selectUser = () => {
    return (
      <View>
        <View style={[styles.rows, { flex: 1 }]}>
          <Ripple
            rippleColor="#fff"
            rippleOpacity={0.87}
            rippleDuration={1000}
            onPress={() => onGotoLogin("Employee")}
            style={styles.buttonLogin}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={[styles.buttonLoginText]}>Employee Signin</Text>
              <View style={styles.arow}>
                <MaterialIcons name="navigate-next" size={24} color="#000" />
              </View>
            </View>
          </Ripple>
          <Ripple
            rippleColor="#fff"
            rippleOpacity={0.87}
            rippleDuration={1000}
            onPress={() => onGotoLogin("Outsource")}
            style={styles.buttonLogin}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={[styles.buttonLoginText]}>Outsource Signin</Text>
              <View style={styles.arow}>
                <MaterialIcons name="navigate-next" size={24} color="#000" />
              </View>
            </View>
          </Ripple>
        </View>
        <View style={styles.socialStyle}>
          <TouchableOpacity onPress={() => onYoutube()}>
            <MaterialIcons name="live-tv" size={24} color={colors.color_danger_500} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onFacebook()}>
            <EvilIcons name="sc-facebook" size={26} color={colors.color_info_500} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onInstargram()}>
            <AntDesign name="camera" size={24} color={colors.color_success_500} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Layout
      navigation={navigation}
      props={
        <>
          <View style={{ flex: 1 }}>
            {selectUser()}
          </View>
        </>
      }
    />
  );
}

export const fontFamily = {
  Prompt: "Prompt_300Light",
  Prompt_bold: "Prompt_500Medium",
  Inter_bold: "Inter_700Bold",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background_basic_color_1,
  },
  buttonLogin: {
    padding: 7.5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: colors.color_basic_300,
    justifyContent: "center",
    marginBottom: 20,

  },
  buttonLoginText: {
    fontSize: 14,
    color: "#000",
    fontFamily: fontFamily.Prompt_bold,
  },
  rows: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arow: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  socialStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'flex-end',
    marginTop: 40,
  },
  banner: {
    resizeMode: "contain",
    width: 180,
    height: null,
    marginTop: "50%",
    aspectRatio: 50 / 50, // Image ratio
    borderRadius: Platform.OS === "ios" ? 50 : 120,
  },
  styleBanner: {
    // justifyContent: "center",
    alignItems: "center",
  },
});
