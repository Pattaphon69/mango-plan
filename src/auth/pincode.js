import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert,
    ScrollView,
    Dimensions
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import linq from "js-linq";
import Ripple from 'react-native-material-ripple';
// Link api
import MessageBox from "../api/msg";
import $xt from "../api/xtools";
import { styles, colors } from "../stylesheet/styles";
import LoaddingLayout from "../template/loadding_layout";
import OverLayout from "../template/OverLayout";
import BannerImage from "../../assets/images/logo.png";
import { apiPasscode, apiAuth } from "../api/authentication";
const windowWidth = Dimensions.get('window').width;
const widthScreen = 767;
export default function PinCode({ route, navigation }) {
    let page = route?.params?.page || ""
    const $linq = (arr) => new linq(arr);
    const [putList, setPutList] = useState([null, null, null, null, null, null]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [isPinCode, setPinCode] = useState("");
    const [isPassError, setPassError] = useState(0);
    const [isFaceID, setFaceID] = useState(false);
    const [isPage, setPage] = useState("");

    async function authenticate() {
        const hasPassword = await LocalAuthentication.isEnrolledAsync();
        if (!hasPassword) return;

        const { success, error } = await LocalAuthentication.authenticateAsync();

        if (success) {
            _beforeNext()
        } else {
            // MessageBox.Alert("เข้าสู่ระบบไม่สำเร็จ!");
        }
        // Platform.OS === "android" && setIsModalVisible(false);
    }
    useFocusEffect(
        React.useCallback(() => {
            const __setPinCode = async () => {
                let pinLnwM = (await AsyncStorage.getItem("pinCode")) || "";
                let faceID = (await AsyncStorage.getItem("faceID")) || "";
                console.log("pinCode", pinLnwM);
                setPinCode(pinLnwM);
                setFaceID(faceID == "Y" ? true : false);
            };
            setPage(page)
            $xt.isEmpty(isPinCode) ? reset() : null
            __setPinCode();
            // authenticate()
        }, [route])
    );
    const _beforeNext = async () => {
        // console.log("before login");
        let maincode = (await AsyncStorage.getItem("maincode")) || "";
        let username = (await AsyncStorage.getItem("username")) || "";
        let password = (await AsyncStorage.getItem("password")) || "";
        console.log(maincode, username, password);
        // setLoading(true);
        try {
            setLoading(true);
            var rsp = await apiAuth.login(maincode, username, password);
        } catch (ex) {
            await $xt.sleep(200);
            MessageBox.Alert(`Error`, rsp.error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
        console.log("resp", rsp.data);
        if (rsp.error) throw rsp.error;
        await AsyncStorage.setItem("mango_auth", rsp.data);
        AsyncStorage.removeItem("putList");
        navigation.navigate("Home");

    }
    const reset = () => {
        console.log("reset");
        setPutList([null, null, null, null, null, null]);
        setCount(0);
    };
    const fill = async (number) => {
        // console.log("isPinCode", isPinCode);
        putList[count] = number;
        await setPutList([...putList]);
        setCount(count + 1);
        let data = $linq(putList)
            .where((x) => x == null)
            .toArray();
        if (putList.filter((put) => put != null).length === 6) {
            // console.log("pinCode_putList :", putList.join(""));
            if ($xt.isEmpty(isPinCode)) {
                MessageBox.Alert("กรุณายืนยันอีกครั้ง");
                await AsyncStorage.setItem("pinCode", putList.join(""));
                setPinCode(putList.join(""))
                // console.log(".....pincode");
                reset();
            } else if (putList.join("") === isPinCode) {
                _beforeNext()
            } else if (putList != isPinCode) {
                let lnwM = await MessageBox.Alert(
                    `แจ้งเตือน`,
                    "Pin Code ของคุณไม่ถูกต้อง"
                );
                if (lnwM) {
                    console.log("isPassError", isPassError + 1);
                    let __passerror = isPassError + 1;
                    setPassError(isPassError + 1);
                    if (__passerror == 5) {
                        await AsyncStorage.setItem("pinCode", "");
                        navigation.navigate("Login");
                    }
                    reset();
                }
            }
            // reset();
        }
    };
    const __onDelete = async () => {
        let xx = $linq(putList).where(x => x != null).count() - 1;
        console.log("putList", xx);
        let newPutList = [...putList]
        newPutList[xx] = null
        setPutList(newPutList);
        setCount(xx);
    };
    const _forgotPass = async () => {
        console.log("_forgotPass");
        setPinCode("")
        await AsyncStorage.setItem("pinCode", "");
    }
    return (
        // <OverLayout navigation={navigation} props={
        <ScrollView>
            {/* <Image
                style={[styles.stretch, { position: 'absolute' }]}
                ImageCacheEnum={'force-cache'}
                source={require('../../assets/images/passcode_bg.jpg')}
            /> */}
            {loading ? <LoaddingLayout /> : null}
            <View style={[styles.containerCenter]}>
                <Image source={BannerImage} style={styles.banner} />
                <View style={{}}>
                    {$xt.isEmpty(isPinCode) ? (
                        <Text
                            style={{ fontSize: 16, fontWeight: '600', paddingVertical: 5 }} >
                            กรุณาตั้งรหัสผ่าน
                        </Text>
                    ) : (
                        <Text
                            style={{ fontSize: 18, fontWeight: '600', paddingVertical: 5 }} >
                            กรุณาใส่รหัสผ่าน
                        </Text>
                    )}
                </View>
                <View style={styles.putListContainer}>
                    {putList.map((put, idx) => (
                        <View
                            key={idx}
                            style={[styles.putCode, put == null ? null : styles.fill]}
                        />
                    ))}
                </View>
                <View style={styles.pinContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.pinBox} onPress={() => fill(1)}>
                            <Text style={styles.pinBoxText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pinBox} onPress={() => fill(2)}>
                            <Text style={styles.pinBoxText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pinBox} onPress={() => fill(3)}>
                            <Text style={styles.pinBoxText}>3</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.pinBox} onPress={() => fill(4)}>
                            <Text style={styles.pinBoxText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pinBox} onPress={() => fill(5)}>
                            <Text style={styles.pinBoxText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pinBox} onPress={() => fill(6)}>
                            <Text style={styles.pinBoxText}>6</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.pinBox} onPress={() => fill(7)}>
                            <Text style={styles.pinBoxText}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pinBox} onPress={() => fill(8)}>
                            <Text style={styles.pinBoxText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pinBox} onPress={() => fill(9)}>
                            <Text style={styles.pinBoxText}>9</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {isFaceID ? (
                            <TouchableOpacity
                                style={styles.faceId}
                                onPress={() => authenticate()}
                            >
                                <MaterialCommunityIcons
                                    name="face-recognition"
                                    size={windowWidth > widthScreen ? 60 : 30}
                                    color={"#000"}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.faceId}></TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.pinBox} onPress={() => fill(0)}>
                            <Text style={styles.pinBoxText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.pinDelete}
                            onPress={() => __onDelete()}
                        >
                            <Feather name="delete" size={windowWidth > widthScreen ? 60 : 30} color={"#000"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* <TouchableOpacity
                onPress={() => _forgotPass()}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.h3, { color: "#38B34A", marginTop: 10, textDecorationLine: 'underline' }]}>ลืมรหัสผ่าน</Text>
            </TouchableOpacity> */}
            {$xt.isEmpty(isPage) ? <Ripple
                rippleColor="#76ff03"
                rippleOpacity={0.87}
                rippleDuration={1000}
                style={[styles.button, {
                    width: '70%', marginLeft: '15%', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: "#fff", borderWidth: 1, borderColor: '#38B34A', shadowOpacity: 0
                }]}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={[styles.h5_bold, { color: '#38B34A' }]}>กลับสู่หน้าล๊อกอิน</Text>
            </Ripple> : null}
        </ScrollView>
    );
}
