import React, { useLayoutEffect } from "react";

import { colors, styles } from "../stylesheet/styles";
import {
    StyleSheet,
    StatusBar,
    View
} from "react-native";
export default function OverLayout({ props, navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.red,
                shadowColor: "transparent",
                elevation: 0,
            },
        });
    }, []);
    return (

            <View style={styles.container_full}>
                 <StatusBar style="auto" />
                {props}
            </View>
    )
}