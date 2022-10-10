import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, ScrollView,} from "react-native"
import Layout from "../template/layout";
export default function PageExample({ route, navigation }) {
    return (
        <Layout navigation={navigation} props={
            <>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                       <Text> Page Example</Text>
                    </ScrollView>

                </View>
            </>
        }
        />
    )
}