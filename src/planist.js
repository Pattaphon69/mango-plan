import React, { useEffect, useLayoutEffect, useState, } from "react";
import { Text, View, ScrollView, FlatList, TouchableOpacity } from "react-native"
import HeaderRight from "./components/headerRight";
import Layout from "./template/layout";
import { useFocusEffect } from "@react-navigation/native";
import { colors, styles } from "./stylesheet/styles";
import { AntDesign } from '@expo/vector-icons';

export default function Planlist({ route, navigation }) {
    const [example, setExample] = useState();
    const [Status, setStatus] = useState();

    useLayoutEffect(() => {
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
                console.log("PlanList");
                await LoadData();
            };
            fetchData();
        }, [])
    )
    const HeaderLeft = () => {
        return (
            <View style={{ margin: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="windows" size={24} color="black" />
                </TouchableOpacity>
            </View>
        )
    }
    const LoadData = async () => {
        const data = [{
            name: "test 1",
            status: "Overdue",
            plan: "100%",
            progress: "1%",
            uriImg: 'https://reactnative.dev/img/tiny_logo.png',
            startdate: "01/01/2000",
            enddate: "01/01/2000",
            staut: "found",
            profile: 'https://reactnative.dev/img/tiny_logo.png'
        },
        {
            name: "test 1",
            status: "Delay",
            plan: "100%",
            uriImg: 'https://reactnative.dev/img/tiny_logo.png',
            startdate: "01/01/2000",
            enddate: "01/01/2000",
            staut: "found",
            profile: 'https://reactnative.dev/img/tiny_logo.png'
        }, {
            name: "test 1",
            status: "Overdue",
            plan: "100%",
            progress: "1%",
            uriImg: 'https://reactnative.dev/img/tiny_logo.png',
            startdate: "01/01/2000",
            enddate: "01/01/2000",
            staut: "found",
            profile: 'https://reactnative.dev/img/tiny_logo.png'
        }, {
            name: "test 1",
            status: "Overdue",
            plan: "100%",
            progress: "100%",
            uriImg: 'https://reactnative.dev/img/tiny_logo.png',
            startdate: "01/01/2000",
            enddate: "01/01/2000",
            staut: "found",
            profile: 'https://reactnative.dev/img/tiny_logo.png'
        }]
        const status = ["In Progress", "not start", "delay"]
        setExample(data)
        setStatus(status)
    };
    const rederColor_Status = (item) => {
        // let color_status = "";

        if (item.status == "Overdue") {
            return "red"
        } else if (item.status == "Delay") {
            return "orange"
        } else if (item.status == "not start") {
            return "gray"
        }
        else {
            return "green"
        }
    }
    const _renderItem = ({ item }) => {

        return (
            <View>
                <View style={[styles.blockcard, { marginBottom: 1 }]}>
                    <TouchableOpacity style={{ width: '100%' }}>
                        <View style={{ margin: 10, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text>Plan name : {item.name}</Text>
                                </View>
                                <View style={{ backgroundColor: rederColor_Status(item), paddingHorizontal: 10, borderRadius: 5, width: 100, alignItems: "center" }}>
                                    <Text style={{ color: 'white', fontSize: 13 }}>{item.status}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <View style={{ justifyContent: "flex-start" }}>
                                    <Text>plan :{item.plan}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <Text>Progress : </Text>
                                    </View>
                                    <View style={{ width: "25%" }}>
                                        <Text>{item.progress}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View>

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
        <Layout navigation={navigation} props={
            <>
                <View style={{ flex: 1 }}>
                    <View style={{ marginVertical: 10 }}>
                        <Text>Status :</Text>
                    </View>

                    <View
                        style={{
                            width: '95%',
                            backgroundColor: "blue",
                            flex: 1,
                            justifyContent: "center",
                            flexDirection: "row",
                            // paddingHorizontal: 15,
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
    )
}