import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Image, Alert, Switch } from "react-native"
import { Feather, SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiAuth } from "../api/authentication";
import { reFormatPicture } from "../api/bind_api";
import MessageBox from "../api/msg";
import Ripple from 'react-native-material-ripple';
import { styles, colors } from "../stylesheet/styles";
import $xt from "../api/xtools";
import Layout from "../template/layout";
import HeaderLeft from "../components/headerLeft";
export default function Setting({ route, navigation }) {

    const isPage = route.name;
    console.log("isPage", isPage);
    const [isEmtyp, setEmtyp] = useState({});
    const [isAuth, setAuth] = useState("");
    const [isProfile, setProfile] = useState("#");
    const [isEnabled, setIsEnabled] = useState(false);
    const [isFaceID, setFaceID] = useState(false);
    const [isPinCode, setPinCode] = useState(false);
    const [isProject, setProject] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                let server_data = (await apiAuth.getAuth()).data;
                let auth = server_data.auth;
                let appinfo = server_data.appinfo;
                let profile = await reFormatPicture(appinfo.profile);
                let baseUrl = await AsyncStorage.getItem("baseUrl");
                console.log("front", appinfo.webview);
                console.log("back", baseUrl);
                if (server_data.error) {
                    throw server_data.error;
                } else {
                    let faceID = await AsyncStorage.getItem("faceID");
                    let pinCode = await AsyncStorage.getItem("pincode_menu");
                    // console.log("faceID", faceID);
                    setIsEnabled(faceID == 'Y' ? true : false)
                    setPinCode(pinCode == 'Y' ? true : false)
                    setEmtyp(appinfo);
                    setProfile(profile);
                    setAuth(auth);
                }
            } catch (ex) {
                MessageBox.Alert(`Error`, ex.toString());
            }
        };
        fetchData();
    }, []);
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                let project_list = JSON.parse(
                    (await AsyncStorage.getItem("project_list")) || []
                );
                console.log("project_list", project_list);
                setProject(project_list)
            };
            fetchData();
        }, [route])
    );
    const _logout = async () => {
        if (
            !(await MessageBox.Confirm(
                `โปรดยืนยัน`,
                `คุณต้องการออกจากระบบหรือไม่?`,
                `ไม่ใช่`,
                `ใช่`
            ))
        )
            return;
        try {
            await apiAuth.logout();
        } catch (ex) {
            console.log(ex);
        }
        await AsyncStorage.setItem("mango_auth", "");
        // navigation.navigate("Login");
        navigation.reset({
            index: 1,
            routes: [{ name: isPinCode ? "PinCode" : "Login" }],
        });
    };
    const _beforeNext = (type) => {
        // if (type == 'SelectProject') {
        //     console.log("isPage", isPage);
        //     navigation.navigate("SelectProject", { isPage })
        // }
    }
    const toggleSwitch = async () => {
        await AsyncStorage.setItem("faceID", isEnabled ? "Y" : "N");
        console.log("isEnabled", !isEnabled);
        setIsEnabled((previousState) => !previousState);
    };
    // const toggleSwitch2 = async () => {
    //     await AsyncStorage.setItem("pincode_menu", !isPinCode ? "Y" : "N");
    //     console.log("isPinCode", !isPinCode);
    //     setPinCode((previousState) => !previousState);
    // };
    const toggleSwitch2 = async (status) => {
        console.log("status", status);
        let _pinCode = await AsyncStorage.getItem("pinCode");
        // console.log("_pinCode", _pinCode);
        await AsyncStorage.setItem("pincode_menu", !isPinCode ? "Y" : "N");
        if (status && $xt.isEmpty(_pinCode)) {
            navigation.navigate("PinCode", { page: "Setting" })
        } else setPinCode((previousState) => !previousState);
    };
    const resetPinCode = async() => {
        await AsyncStorage.setItem("pinCode", "");
        navigation.navigate("PinCode", { page: "Setting" })
    }
    return (
        <Layout navigation={navigation} props={
            <>
                <View style={{ width: '100%', flex: 1 }}>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.h3_bold, { color: colors.red_t }]}>การตั้งค่าและข้อมูล</Text>
                        <Text style={[styles.h3_bold, { color: colors.grey_t, fontSize: 14 }]}>Setting and information</Text>
                    </View>
                    <ScrollView>
                        <View style={[styles.card, styles.rows_start]}>
                            <Image
                                style={styles.stretch}
                                ImageCacheEnum={'force-cache'}
                                source={
                                    isEmtyp != null ? (
                                        { uri: isProfile }
                                    ) : (
                                        <FontAwesome5 name="user-circle" size={24} color="black" />
                                    )
                                }
                                // style={{
                                //     width: 60,
                                //     height: 60,
                                //     backgroundColor: colors.red,
                                //     borderRadius: 75,
                                //     borderWidth: 3,
                                //     borderColor: colors.red
                                // }}
                            />
                            <View style={{ paddingLeft: 14, alignItems: 'flex-start' }}>
                                <Text style={styles.h4} >
                                    {(isAuth.empname || "").toUpperCase()}
                                </Text>
                                <Text style={styles.h5}>
                                    {(isAuth?.mainname || "").toUpperCase()}
                                </Text>
                            </View>

                        </View>
                        <View style={[styles.card, styles.rows_start]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.h4}>โครงการ</Text>
                                <View style={styles.line_red}></View>
                                <Text style={[styles.h5, { color: colors.grey_t }]}>{isProject?.pre_des} ({isProject?.refcode})</Text>
                                <Ripple
                                    rippleColor={colors.blue}
                                    rippleOpacity={1}
                                    rippleDuration={1000}
                                    style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1, width: '100%' }}
                                    // onPress={() => _beforeNext("SelectProject")}
                                >
                                    <Text style={[styles.h4, { paddingVertical: 0, color: colors.blue_t }]}>เปลี่ยนโปรเจค</Text>
                                </Ripple>
                            </View>
                        </View> 
                        {/* <View style={[styles.card, styles.rows_start]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.h4}>ภาษา</Text>
                                <View style={styles.line_red}></View>
                                <Text style={[styles.h5, { color: colors.grey_t }]}>ภาษาไทย</Text>
                                <Ripple
                                    rippleColor={colors.blue}
                                    rippleOpacity={1}
                                    rippleDuration={1000}
                                    style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1, width: '100%' }}
                                    onPress={() => console.Alert("เปลี่ยนภาษา")}
                                >
                                    <Text style={[styles.h4, { paddingVertical: 0, color: colors.blue_t }]}>เปลี่ยนภาษา</Text>
                                </Ripple>
                            </View>
                        </View> */}
                        <View style={[styles.card, styles.rows_start]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.h4}>เข้าใช้งานด้วย Pin Code</Text>
                                <View style={styles.line_red}></View>

                                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', flex: 1, width: '100%' , paddingTop: 10}}>
                                    <Ripple
                                        rippleColor={colors.blue}
                                        rippleOpacity={0.87}
                                        rippleDuration={1000}
                                        // style={styles.btn_menu}
                                        onPress={() => resetPinCode()}
                                    >
                                        <Text style={[styles.h4, {color: colors.red_t, textDecorationLine: 'underline'}]}>reset pincode</Text>
                                    </Ripple>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#49A596" }}
                                        thumbColor={isPinCode ? "#f4f3f4" : "#f4f3f4"}
                                        ios_backgroundColor="#fff"
                                        onValueChange={toggleSwitch2}
                                        value={isPinCode}
                                    />
                                </View>

                            </View>
                        </View>
                        <View style={[styles.card, styles.rows_start]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.h4}>เข้าใช้งานด้วย Touch ID / Face ID</Text>
                                <View style={styles.line_red}></View>
                                <Text style={[styles.h5, { color: colors.grey_t }]}></Text>
                                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1, width: '100%' }}>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#49A596" }}
                                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                        ios_backgroundColor="#fff"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View>

                            </View>
                        </View>
                        <View style={[styles.card, styles.rows_start]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.h4}>คู่มือการใช้งาน</Text>
                                <View style={styles.line_red}></View>
                                <Text style={[styles.h5, { color: colors.grey_t }]}>ยังไม่มีข้อมูลการใช้งาน</Text>
                                <Ripple
                                    rippleColor={colors.blue}
                                    rippleOpacity={0.87}
                                    rippleDuration={1000}
                                    style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1, width: '100%' }}
                                    onPress={() => Alert("ข้อมูลการใช้งาน")}
                                >
                                </Ripple>
                            </View>
                        </View>
                        <View style={[styles.card, styles.rows_start]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.h4}>เกี่ยวกับ Mango IC</Text>
                                <View style={styles.line_red}></View>
                                <Text style={[styles.h5, { color: colors.grey_t }]}>Version :1.4.3</Text>
                                <Text style={[styles.h5, {
                                    paddingVertical: 0, color: colors.grey_t
                                }]}>API Build No. : 20220201</Text>
                            </View>
                        </View>
                        <View style={[styles.card, styles.rows_start]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.h4}>Mango Consulting Service Co.,Ltd.</Text>
                                <View style={styles.line_red}></View>
                                <Text style={[styles.h5, { color: colors.grey_t }]}>บริษัท แมงโก้ คอนซัลแตนท์ จำกัด
                                    555 อาคารรสา ทาวเวอร์ 1 ยูนิต 2304-1 ชั้น 23 ถ.พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900
                                </Text>
                                <Text style={[styles.h5, {
                                    paddingVertical: 0, color: colors.grey_t
                                }]}>Call Center : 02-123-3900</Text>
                                <Text style={[styles.h5, {
                                    paddingVertical: 0, color: colors.grey_t
                                }]}>Email : info@Mangoconsultant.com</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 30 }}></View>
                    </ScrollView>

                    <Ripple
                        rippleColor={colors.blue}
                        rippleOpacity={0.87}
                        rippleDuration={1000}
                        style={styles.btn_menu}
                        onPress={() => _logout()}
                    >
                        <Text style={[styles.text_white, styles.h4]}>ออกจากระบบ</Text>
                    </Ripple>
                </View>
            </>
        }
        />
    )
}