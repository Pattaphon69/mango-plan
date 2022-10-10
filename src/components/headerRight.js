import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Animated, Easing, Text } from "react-native";
// import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons, Ionicons, Entypo, Feather } from "@expo/vector-icons";
import { styles } from "../stylesheet/styles";
import $xt from "../api/xtools";
import linq from "js-linq";
import { TreeSVG, SearchSVG } from "../svg/IconSVG";

export default function HeaderRight({
  route,
  navigation,
  showScan,
  docList,
  showIcon,
  showCamera,
  fromPageList,
  fromType,
}) {
  const $linq = (arr) => new linq(arr);

  const checkMat = docList?.detail[0]?.itemcode || null;
  const newDoc = global?.globalDoc || {};

  console.log("docList header right", newDoc);
  let rotateValueHolder = new Animated.Value(0);
  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const _beforeNext = (type) => {
    if (type == "history") {
      navigation.navigate("History");
    } else if (type == "setting") {
      navigation.navigate("Setting");
    } else if (type == "stock") {
      navigation.navigate(fromPageList || "MaterialList", { docList: newDoc });
    } else if (type == "barcode") {
      navigation.navigate(fromType == "signature" ? "BarCodeSig" : "BarCode", {
        docList,
        fromPageList,
        fromType,
      });
    } else if (type == "tree") {
      navigation.navigate("ProductHistory", { docList });
    }
  };
  const renderItem = () => {
    if (showScan) {
      return (
        <View style={{ flexDirection: "row" }}>
          {!$xt.isEmpty(checkMat) ? (
            <TouchableOpacity
              style={{ paddingHorizontal: 7.5 }}
              onPress={() => _beforeNext("stock")}
            >
              <Animated.View style={{ transform: [{ scaleX: -1 }] }}>
                <MaterialCommunityIcons
                  name="truck-outline"
                  size={28}
                  color="white"
                />
                <View style={styles.badge2}>
                  <Animated.Text
                    style={[
                      styles.h5,
                      { fontSize: 7, transform: [{ scaleX: -1 }] },
                    ]}
                  >
                    {newDoc?.detail?.length || 0}
                  </Animated.Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={{ paddingHorizontal: 7.5, marginRight: 7.5 }}
            onPress={() => _beforeNext("barcode")}
          >
            <Animated.View style={{ transform: [{ rotate: RotateData }] }}>
              <MaterialCommunityIcons
                name="barcode-scan"
                size={28}
                color="white"
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      );
    } else if (showCamera) {
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ paddingHorizontal: 20 }}
            onPress={() => _beforeNext("tree")}
          >
            <Entypo name="camera" size={25} color={"white"} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row" }}>
          {/* <TouchableOpacity
            style={{ paddingHorizontal: 7.5 }}
            onPress={() => _beforeNext("tree")}
          >
            <TreeSVG color="#fff" />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{ paddingHorizontal: 7.5 }}
            onPress={() => _beforeNext("history")}
          >
            <Animated.View style={{ transform: [{ rotate: RotateData }] }}>
              <Feather name="search" size={26} color="black" />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingHorizontal: 7.5, marginRight: 7.5 }}
            onPress={() => _beforeNext("setting")}
          >
            <Animated.View style={{ transform: [{ rotate: RotateData }] }}>
              <Feather name="refresh-cw" size={26} color="black" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return showIcon && renderItem();
}
