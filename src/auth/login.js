import React, { useEffect, useState, useMemo } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import checkVersion from "react-native-store-version";
import { useFocusEffect } from "@react-navigation/native";
import linq from "js-linq";
import { colors } from "../stylesheet/styles";
import { xt, getDataStorage, setDataStorage } from "../api/service";
import { AppInfoService } from "../services/app-info.service";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Login({ navigation, route }) {
  const $linq = (arr) => new linq(arr);
  const [lang, setLang] = React.useState({});
  const [passcode, setPasscode] = React.useState("");
  const [site, setSite] = React.useState();
  const [sitevalue, setSitevalue] = React.useState();
  const [company, setCompany] = React.useState();
  const [companyvalue, setCompanyvalue] = React.useState();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emty, setEmty] = React.useState(false);
  const [loadding, setLoadding] = React.useState(false);
  const [usertype, setUsertype] = React.useState();

  const [pincodeppn, setPincodeppn] = React.useState(false);
  const [faceid, setFaceid] = React.useState(false);
  const onUsertypeButtonPress = () => {
    navigation && navigation.navigate("Usertype");
  };

  const onPincode = () => {
    setDataStorage("faceid_UP", "N");
    navigation.navigate("Pincode");
  };


  const onSiteitem = (wh) => {
    if (wh == "Site") {
      if (xt.isEmpty(passcode)) {
        xt.Alert("Please enter customer code and Submit the connect");
        return;
      }
      navigation &&
        navigation.navigate("Site", {
          passcode: passcode,
          site: site,
          sitevalue: sitevalue,
        });
    }
    if (wh == "Company") {
      navigation &&
        navigation.navigate("Company", {
          site: site,
          sitevalue: sitevalue,
        });
    }
  };

  const onLogin = async (faceid_wh, login_param) => {
    if (
      !faceid_wh &&
      (xt.isEmpty(companyvalue) || xt.isEmpty(username) || xt.isEmpty(password))
    ) {
      xt.Alert(lang.please_login);
      return;
    }
    setLoadding(true);
    const loginhistory = await getDataStorage("loginhistory");
    const site_text = await getDataStorage("site_key");

    const url =
      usertype != "Outsource"
        ? "api/public/Login?is_api=Y&app_name=APP"
        : "api/public/LoginOutsource?is_api=Y&app_name=APP";
    const param = faceid_wh
      ? login_param
      : {
        maincode: companyvalue,
        userid: username,
        userpass: password,
        checked: true,
      };

    let res = await xt
      .postServerJson(url, param)
      .then((res) => {
        var token = res.data;
        if (res.success) {
          setDataStorage("token_key", token);
          setDataStorage("usertype_key", usertype);
          setDataStorage("maincode_key", companyvalue);
          setDataStorage("username_key", username);
          setDataStorage("password_key", password);
          setDataStorage("login_UP", "N");
          setDataStorage("faceid_UP", "N");

          let obj = {
            usertype: usertype,
            site: sitevalue,
            site_text: site,
            maincode: companyvalue,
            mainname: company,
            username: username,
            password: password,
            pincode: faceid,
            faceid: faceid,
            pincodeppn: pincodeppn,
          };

          let lg_historyArr = JSON.parse(loginhistory) || [];
          let dataobj = lg_historyArr.filter(function (v) {
            return (
              v.usertype == usertype &&
              v.site == sitevalue &&
              v.maincode == companyvalue &&
              v.username == username &&
              v.password == password
            );
          }).length;
          console.log("lg_historyArr", lg_historyArr, dataobj);
          if (dataobj == 0) {
            lg_historyArr.push(obj);
            setDataStorage("pincode_ppn", "false");
            setDataStorage("faceid_ppn", "false");
            setDataStorage("pincodeval_ppn", "");
            setDataStorage("loginhistory", JSON.stringify(lg_historyArr));
          }
          setLoadding(false);
          navigation &&
            navigation.navigate("Home", {
              site: sitevalue,
            });
        } else {
          setLoadding(false);
          xt.Alert(res.error);
        }
      })
      .catch((err) => {
        setLoadding(false);
        xt.Alert(err.response);
      });
  };

  const onready = async () => {
    const passcode_ = await getDataStorage("passcode_key");
    const usertype_ = await getDataStorage("usertype");
    const site_ = await getDataStorage("site_key");
    const sitevalue_ = await getDataStorage("sitevalue_key");
    const company_ = await getDataStorage("company_key");
    const companyvalue_ = await getDataStorage("companyvalue_key");
    setLoadding(false);
    setPasscode(passcode_);
    setSite(site_);
    setSitevalue(sitevalue_);
    setCompany(company_);
    setCompanyvalue(companyvalue_);
    setUsertype(usertype_);
    setUsername(null);
    setPassword(null);
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const linkopen = (url) => {
    WebBrowserService.openBrowserAsync(url).then();
  };

  const LoadingIndicator = (props) => <Spinner status="control" size="small" />;

  const getLangDF = async () => {

    let lang_ = await xt.getLang();
    console.log("ggg");
    setLang(lang_);
    let usertype_key = (await getDataStorage("usertype")) || "";
    let pincode_key = await getDataStorage("pincode_ppn");
    let pincodeval_key = (await getDataStorage("pincodeval_ppn")) || "";
    let login_UP = (await getDataStorage("login_UP")) || "";
    let faceid_key = (await getDataStorage("faceid_ppn")) || "false";
    setFaceid(faceid_key == "false" ? false : true);
    setPincodeppn(pincode_key == "false" ? false : true);
    if (pincode_key == "true" && pincodeval_key != "" && login_UP == "N") {
      navigation && navigation.navigate("Pincode");
    } else {
      let faceid_up = (await getDataStorage("faceid_UP")) || "";
      if (faceid_up == "N") {
        onCheckVersion(lang_);
      }
    }
    if (usertype_key == "") {
      navigation && navigation.navigate("Usertype");
    }
  };

  const onCheckVersion = async (lang_) => {
    try {
      const check = await checkVersion({
        version: AppInfoService.getVersion(), // app local version
        iosStoreURL: "https://apps.apple.com/us/app/mango-plan/id1528038762",
        androidStoreURL:
          "https://play.google.com/store/apps/details?id=com.mangoconsultant.mango.plan",
        country: "jp", // default value is 'jp'
      });
      if (check.result === "new") {
        let day1 = (await getDataStorage("checkVersion")) || "";
        let day2 = moment(new Date()).format("YYMD");
        if (parseInt(day2) != parseInt(day1)) {
          navigation && navigation.navigate("Version");
        } else {
          onMgAuthentication(lang_);
        }
      } else {
        onMgAuthentication(lang_);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onMgAuthentication = async (lang_) => {
    let faceid_key = (await getDataStorage("faceid_ppn")) || "false";
    if (faceid_key == "false") return;

    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: lang_.login_with,
      cancelLabel: lang_.cancel,
      disableDeviceFallback: true,
    });
    if (success) {
      _beforeNext();
    }
  };
  const onFacebook = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://web.facebook.com/mangoconsultant/?hc_ref=ARQvOtJGF71GOw1Hkl0__bbBoUq8KjR7_OTtbf12pCR5boOFDJA_h_Je-d1XblY2epw&fref=nf&__xts__[0]=68.ARAxeMY7IrjhGAsDxGDGaFnvQikxH9oEcoRmPKKt9OYpGTl7ekhWCQ1HX7w136sTiqr09b_IluiowQkSEjr4qVxR1MJquatTJKnNfMsktUmZX_a196U5KMDFzgP26wNlrwUYfQ5dnDQImiSYcdRtYd3n-_z-pJZH_CbHWaA44Xfx8FH5jQoRzmBogAAaNnkyl-s47W3Xc8sN5pd7KANiNeVP39er-uL_FUaFiW3ou5MrS9v0Zfw_5urVLrkQIoFGO6fZ2nIapK222IX7VhCJvZIQA1tqZBKWu6cr2TgBH3HGwim4LduAGn0266Ihgv1QFe2e5Z-EbSlZRN2jY-RrFp8xpw&__tn__=kC-R"
    );
    setResult(result);
  };

  const onInstargram = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://www.instagram.com/mangoconsultant/"
    );
    setResult(result);
  };
  const _beforeNext = async () => {
    var username_ = await getDataStorage("username_key");
    var password_ = await getDataStorage("password_key");
    const param = {
      maincode: companyvalue,
      userid: username_,
      userpass: password_,
      checked: true,
    };
    onLogin(true, param);
  };

  useFocusEffect(
    React.useCallback(() => {
      //setDataStorage('checkVersion', "");
      getLangDF();
      onready();
    }, [])
  );
  return (
    // <KeyboardAvoidingView>
    <View style={styles.container}>
      <View style={styles.signInContainer}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={onUsertypeButtonPress}
        >
          <Text>{lang.back}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <View style={{}}>
          <View style={styles.divider}></View>
          <Text>{passcode ? lang.passcode : ""}</Text>
          <View style={styles.messageInputContainer}>
            <TextInput
              style={{
                color: "#000",
                borderColor: "rgba(52, 52, 52, 0)",
                width: "70%",

              }}
              placeholder={lang.passcode}
              value={passcode}
              onChangeText={setPasscode}
            />
            <TouchableOpacity
              style={{
                width: 100,
                height: 30,
                padding: 0,
                backgroundColor: colors.color_basic_500,
                borderColor: "#8F9BB3",
                alignItems: "center",
                justifyContent: 'center',
                borderRadius: 50,
              }}
              onPress={() => onSiteitem("Site")}
            >
              <Text style={{ color: colors.white }}>{lang.connect}</Text>
            </TouchableOpacity>
          </View>
        </View>


        {companyvalue ? (
          <>
            <View style={{}}>
              <View style={styles.divider}></View>
              <Text>{site ? lang.selectsite : ""}</Text>
              <View style={styles.messageInputContainer}>
                <TextInput
                  placeholder={lang.selectsite}
                  value={site}
                  onChangeText={setSite}
                />
                <TouchableOpacity
                  onPress={() => onSiteitem("Site")}
                >
                  <Feather name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{}}>
              <View style={styles.divider}></View>
              <Text>{company ? lang.selectcoppany : ""}</Text>
              <View style={styles.messageInputContainer}>
                <TextInput
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0)",
                    color: "#000",
                    borderColor: "rgba(52, 52, 52, 0)",
                    paddingBottom: 5,
                  }}
                  placeholder={lang.selectcoppany}
                  value={company}
                  onChangeText={setCompany}
                />
                <TouchableOpacity
                  style={{
                    // alignItems: "flex-start",
                    // justifyContent: "flex-start",
                    // marginTop: -55,
                    // backgroundColor: "rgba(52, 52, 52, 0)",
                    // borderColor: "rgba(52, 52, 52, 0)",
                  }}
                  onPress={() => onSiteitem("Site")}
                >
                  <Feather name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{}}>
              <View style={styles.divider}></View>
              <View style={styles.messageInputContainer}>
                <TextInput
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0)",
                    color: "#000",
                    borderColor: "rgba(52, 52, 52, 0)",
                    paddingBottom: 5,
                  }}
                  placeholder={lang.username}
                  value={username}
                  onChangeText={setUsername}
                />
                <View style={{ marginRight: 5 }}>
                  <FontAwesome5 name="user-alt" size={15} color="black" />
                </View>

              </View>
            </View>
            <View style={{}}>
              <View style={styles.divider}></View>
              <View style={styles.messageInputContainer}>
                <TextInput
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0)",
                    color: "#000",
                    borderColor: "rgba(52, 52, 52, 0)",
                    paddingBottom: 5,
                  }}
                  placeholder={lang.password}
                  value={password}
                  onChangeText={setPassword}
                />
                  <View style={{ marginRight: 5 }}>
                  <Ionicons name="eye-off" size={18} color="black" />
                </View>
              </View>
            </View>
            <View style={styles.divider}></View>
            <TouchableOpacity
              style={styles.signin}
              disabled={loadding ? true : false}
              onPress={() => onLogin(false, {})}
            >
              {/* <Text>{lang.signIn}</Text> */}
              <Text style={{ color: colors.white, textAlign: 'center' }}>{lang.signIn}</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{ display: faceid ? "flex" : "none" }}
                onPress={() => onMgAuthentication(lang)}
              >
                <View
                  style={{
                    marginTop: 20,
                    marginRight: 10,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    size="large"
                    shape="rounded"
                    source={require("../../assets/images/icons8-face-id-96.png")}
                  />
                </View>
                <View
                  level="1"
                  style={{
                    marginTop: 0,
                    marginLeft: 0,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <Text>Face ID</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ display: faceid ? "flex" : "none" }}
                onPress={() => onMgAuthentication(lang)}
              >
                <View
                  level="2"
                  style={{
                    marginTop: 20,
                    marginLeft: 10,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    size="large"
                    shape="rounded"
                    source={require("../../assets/images/icons8-touch-id-64.png")}
                  />
                </View>
                <View
                  style={{
                    marginTop: 0,
                    marginLeft: 10,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <Text>Touch ID </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: pincodeppn ? "flex" : "none",
                }}
                onPress={() => onPincode()}
              >
                <View
                  style={{
                    marginTop: 20,
                    marginLeft: 10,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    size="large"
                    shape="rounded"
                    source={require("../../assets/images/icons8-pin-code-100.png")}
                  />
                </View>
                <View
                  style={{
                    marginTop: 0,
                    marginLeft: 10,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <Text appearance="hint" category="c2">Pin Code </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>

      <View style={styles.socialStyle}>
        <TouchableOpacity onPress={() => onYoutube()}>
          <MaterialIcons name="live-tv" size={24} color={colors.color_danger_500} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onFacebook()}>
          <EvilIcons name="sc-facebook" size={26} color={colors.color_info_500} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onInstargram()}>
          <AntDesign name="camera" size={24} color={colors.color_success_500} />
        </TouchableOpacity>
      </View>
    </View>
    // </KeyboardAvoidingView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: colors.background_basic_color_1,
  },
  listcontainer: {
    maxHeight: 200,
    minWidth: 250,
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  socialAuthContainer: {
    marginTop: 48,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    marginTop: 48,
    padding: 30,
    justifyContent: "center",
  },
  connect: {
    height: 50,
    borderRadius: 50,
    // marginLeft:-80,
    // flexDirection: 'row',
  },
  inputpasscode: {
    borderRadius: 50,
    marginRight: 100,
    flexDirection: "row",
  },
  input: {
    borderRadius: 50,
    marginTop: 5,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInLabel: {
    flex: 1,
  },
  signUpButton: {
    paddingHorizontal: 0,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
  },
  layout: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  signin: {
    marginTop: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#8F9BB3",
    borderColor: "#8F9BB3",
  },
  login_history: {
    width: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  controlBG: {
    margin: 3,
    borderRadius: 10,
    height: 50,
    minWidth: 65,
    padding: 0,
    justifyContent: "center",
    color: "#8F9BB3",
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 5,
    marginLeft: 2,
    width: "100%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  selectinput: {
    textAlign: "left",
  },
  indicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 100,
  },
  socialStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'flex-end',
    marginTop: 40,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.color_basic_400,
    marginBottom: 5
  },
});
