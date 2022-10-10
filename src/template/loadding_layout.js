import React, { useState } from "react";
import { Platform, Image, View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { colors, styles } from "../stylesheet/styles";
//custom link
// import * as loadingData1 from "../../loadding1.json";
// import * as loadingData2 from "../../loadding2.json";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function LoaddingLayout() {
  return (
    // <LottieView
    //   source={Platform.OS === "ios" ? loadingData1 : loadingData2}
    //   // source={{ uri: 'https://assets4.lottiefiles.com/packages/lf20_Cpzev8.json' }}
    //   colorFilters={[
    //     {
    //       keypath: "button",
    //       color: "#F00000",
    //     },
    //     {
    //       keypath: "Sending Loader",
    //       color: "#F00000",
    //     },
    //   ]}
    //   style={{ zIndex: 999999, backgroundColor: "rgba(0,0,0,0.2)" }}
    //   autoPlay
    //   loop
    // />
    <View
      style={{
        // backgroundColor: 'rgba(255, 255, 255, 0.1)',
        // width: windowWidth,
        // height: windowHeight,
        position: 'absolute',
        zIndex: 9999,
        left: 0,
        right: 0,
        top:0,
        bottom: 0,
        backgroundColor: '(rgba(0,0,0,0.6))'
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("./../../assets/loadding1.gif")}
          style={{ width: 70, height: 70, }}
          // source={{ uri: 'https://assets4.lottiefiles.com/packages/lf20_Cpzev8.json' }}
        />
        <Text style={[styles.h3, {color: colors.violet, marginTop: 10}]}>Loading..</Text>
      </View>
    </View>
  );
}
