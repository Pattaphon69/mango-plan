import { Alert } from 'react-native'
import * as Updates from "expo-updates";
export default  {
    Confirm: (title, text, no_text, yes_text) => {
        return new Promise((rs, rj) => {
            Alert.alert(
                title,
                text,
                [
                    {
                        text: no_text || "No",
                        onPress: () => {
                            console.log("Cancel Pressed")
                            rs(false);
                        },
                        style: "cancel"
                    },
                    {
                        text: yes_text || "Yes", onPress: () => {
                            rs(true);
                        }
                    }
                ],
                { cancelable: false }
            );
        });
    },
    Alert: (title, text, ok_text) => {
        return new Promise((rs, rj) => {
            const __Navigator = () => {
                // const navigation = useNavigation();
                navigation.goBack();
            }
            if (text.toString() == "AxiosError: Request failed with status code 403") {
                Alert.alert(
                    title,
                    text,
                    [
                        {
                            text: ok_text || "OK", onPress: () => {
                              Updates.reloadAsync();
                            }
                        }
                    ],
                    { cancelable: false }
                );

            }else{
                Alert.alert(
                    title,
                    text,
                    [
                        {
                            text: ok_text || "OK", onPress: () => {
                                rs(true);
                            }
                        }
                    ],
                    { cancelable: false }
                );
            }

                
            
        });
    }
}