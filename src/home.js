import React, { useEffect, useLayoutEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  FlatList
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import $xt from "./api/xtools";
import { colors, styles } from "./stylesheet/styles";


import MessageBox from "./api/msg";
import Layout from "./template/layout";
import HeaderRight from "./components/headerRight";
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import theme_selector from "./stylesheet/theme_selector";
// import ProjectDetail from "./transition/ic/components/project_detail";


const windowWidth = Dimensions.get("window").width;
const widthScreen = 767;
export default function Home({ route, navigation }) {
  const [isProject, setProject] = useState({});
  const fadeAnim = new Animated.Value(0);
  const [example, setExample] = useState({});
  useLayoutEffect(() => {
    console.log("EntryDoc : useLayoutEffect");
    navigation.setOptions({
      headerLeft: () => (HeaderLeft()),
      headerRight: () => (
        <HeaderRight navigation={navigation} showIcon={true} />
      ),
    });
  }, [route]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        console.log("Home");
        await LoadData();
      };
      fetchData();
    }, [])
  );
  const HeaderLeft = () => {
    return (
      <View style={{ margin: 10 }}>
        <TouchableOpacity>
          <AntDesign name="windows" size={24} color="black" />
        </TouchableOpacity>
      </View>
    )
  }
  const LoadData = () => {
    const data = [{
      name: "Name 1",
      uriImg: 'https://reactnative.dev/img/tiny_logo.png',
      startdate: "01/01/2000",
      enddate: "01/01/2000",
      staut: "found",
      profile: 'https://reactnative.dev/img/tiny_logo.png'
    }, {
      name: "Name 2",
      // uriImg: 'https://reactnative.dev/img/tiny_logo.png',
      startdate: "01/01/2000",
      enddate: "01/01/2000",
      staut: "found",
      // profile: 'https://reactnative.dev/img/tiny_logo.png'

    }]
    setExample(data)
  }
  const _renderItem = ({ item }) => {
    return (
      <View>
        <View style={[styles.blockcard, {}]}>
          <TouchableOpacity style={{ width: '100%' }}>
            <View style={{ width: "100%", height: 150, backgroundColor: colors.grey, }}>
              {!$xt.isEmpty(item.uriImg) ?
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: item.uriImg }}
                /> : <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}><Text style={{ fontSize: 20, color: colors.grey_t }}>no image avaliable</Text></View>
              }
            </View>
            <View style={{ marginHorizontal: '3%', margin: 10 }}>
              <View style={{ paddingBottom: 2 }}>
                <Text>{item.name}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100 / 2,
                    borderColor: "green",
                    borderWidth: 2,
                  }}>
                    {!$xt.isEmpty(item.profile) ?
                      <Image
                        style={{ width: "100%", height: "100%", borderRadius: 100 / 2 }}
                        source={{ uri: item.profile }}
                      />
                      : <View style={{ borderRadius: 100 / 2, alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: colors.grey_t }}><FontAwesome name="user-secret" size={35} color="black" /></View>
                    }
                  </View>
                  <View style={{ marginLeft: 5, justifyContent: "center" }}>
                    <Text>PM : no resullt found</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ alignItems: "center" }}>
                    <Text>Start Date</Text>
                    <Text>{item.startdate}</Text>
                  </View>
                  <View style={{ marginHorizontal: 10, alignItems: "center" }}>
                    <Text style={{}}>End Date</Text>
                    <Text style={{}}>{item.enddate}</Text>
                  </View>
                </View>

              </View>

            </View>
          </TouchableOpacity>

        </View>
      </View>
    )
  };
  return (
    <Layout
      navigation={navigation}
      props={
        <>
          <View style={{ flex: 1, backgroundColor: colors.grey_light }}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 15,
                // marginHorizontal: '3%',
                justifyContent: "center",//center
                flexDirection: "row",
                marginTop: 10,
                flex: 1,
                // backgroundColor: colors.red,
              }}
            >
              <FlatList
                data={example}
                renderItem={_renderItem}
              />
            </View>

          </View>
        </>
      }
    />
  );
}
