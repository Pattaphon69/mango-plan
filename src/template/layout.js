import React, { useLayoutEffect, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { colors, styles } from "../stylesheet/styles";
import { SafeAreaView, StatusBar } from "react-native";
export default function Layout({ props, navigation }) {
    // console.log("layout");
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                // backgroundColor: colors.white,
                shadowColor: "transparent",
                elevation: 0,
            },
        });
    }, []);
    return (
        <LinearGradient
            // Button Linear Gradient
            colors={['#F9F9F9', '#F9F9F9']}
            location={[0.25, 0.4, 1]}
            style={{ flex: 1 }}>
            <SafeAreaView style={styles.container_layout}>
                <StatusBar barStyle={'light-content'} />
                {props}
            </SafeAreaView>
        </LinearGradient>
    )
}