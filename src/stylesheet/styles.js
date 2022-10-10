import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
export const colors = {
  green: "#38B34A",
  green2: "#2DA722",
  violet: "#e7e5f7",
  pink: "#faebe9",
  blue: "#cfecf4",
  cream: "#fff5e7",
  white: "#fff",
  black: "#231F20",
  black_t: "#616161",
  mangoGreen: "#44A97F",
  red: "#C8233F",
  grey: "#edf1f7",
  grey_light: "#fafcfd",
  red_t: "#D83450",
  grey_t: "#99a4ba",
  blue_t: "#539BFC",
  border: '#E2E8F0',
  border2: '#CBD5E0',
  border3: '#E7F0FD',
  disable: '#f3f3f3',
  font1: '#5c6276',
  color_primary_100: "#f2f6ff",
  color_primary_200: "#d9e4ff",
  color_primary_300: "#a6c1ff",
  color_primary_400: "#598bff",
  color_primary_500: "#3366ff",
  color_primary_600: "#284de0",
  color_primary_700: "#2541cc",
  color_primary_800: "#192f9e",
  color_primary_900: "#14236e",
  background_basic_color_1: "#f7f8fa",
    /* Basic colors - for backgrounds and borders and texts */

    color_basic_100: "white",
    color_basic_200: "#f7f8fa",
    color_basic_300: "#edf0f4",
    color_basic_400: "#dde1eb",
    // ...
    color_basic_1100: "#131729",
    color_success_500: "#00E096",
    color_info_500: "#0095FF",
    color_danger_500: "#FF3D71",
};
const windowWidth = Dimensions.get('window').width;
const widthScreen = 767
console.log("windowWidth", windowWidth);
export const smallText = 14;
export const fontSize = {
  small: 10,
  normal: 14,
  large: 18,
};
export const h3 = {
  fontSize: 18
}
export const fontFamily = {
  Prompt: 'Prompt_300Light',
  Prompt_bold: 'Prompt_500Medium',
  Inter_bold: 'Inter_700Bold'
}
export const smallTextStyle = {
  fontSize: smallText,
};
export const styles = StyleSheet.create({
  // container: {
  //   paddingTop: 50,
  // },
  h1: {
    fontFamily: fontFamily.Prompt_bold,
    fontSize: 28,
    paddingVertical: 7.5,
    fontWeight: '600'
  },
  h1_bold: {
    fontFamily: fontFamily.Prompt_bold,
    fontSize: 28,
    // paddingVertical: 5
  },
  h2: {
    fontFamily: fontFamily.Prompt_bold,
    fontSize: 24,
    paddingVertical: 5
  },
  h3: {
    fontFamily: fontFamily.Prompt,
    fontSize: windowWidth > widthScreen ? 28 : 20,
    paddingVertical: 5
  },
  h3_bold: {
    fontFamily: fontFamily.Prompt_bold,
    fontSize: 20,
    // paddingVertical: 5
  },
  h4: {
    fontFamily: fontFamily.Prompt,
    fontSize: 16,
    paddingVertical: 5
  },
  h4_bold: {
    fontFamily: fontFamily.Prompt_bold,
    fontSize: 14,
    paddingVertical: 5
  },
  h5: {
    fontFamily: fontFamily.Prompt,
    fontSize: 12,
    paddingVertical: 0
  },
  h5_bold: {
    fontFamily: fontFamily.Prompt_bold,
    fontSize: 14,
    paddingVertical: 0
  },
  title_left: {
    fontFamily: fontFamily.Prompt_bold,
    fontSize: 14,
    width: 100,
  },
  title_right: {
    fontFamily: fontFamily.Prompt_bold,
    fontSize: 14,
    flex: 1
  },
  bg_text: {
    fontFamily: fontFamily.Inter_bold,
    color: 'rgba(255, 255, 255, 0.25)',
    fontSize: 150,
    transform: [{ rotate: "-28.27deg" }],
    position: 'absolute',
    right: -10,
    top: -15,
    zIndex: 3,
    // backgroundColor:'green'
  },
  main_block: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.border3,
    padding: 8,
    // marginTop: 13,
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 40,
    marginBottom: 10
  },
  header_block: {
    paddingHorizontal: 14,
    paddingTop: 0,
    paddingBottom: 14,
    // position: 'relative',
    // zIndex: 3,
    backgroundColor: colors.red,
    borderRadius: 7,

  },
  shadow_block: {
    zIndex: 3,
    // position: 'absolute',
    // width: '100%',
    // height: 10,
    // bottom: -10,
    // //  top: 0,

    marginTop: 15,
    marginBottom: 10,
    borderRadius: 7,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
  },
  shadow_text: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4
  },
  text_white: {
    color: colors.white
  },
  content: {
    // paddingTop: 20
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginVertical: 5
  },
  line_red: {
    width: '100%',
    height: 2,
    backgroundColor: colors.red
  },
  line_gray: {
    width: '100%',
    height: 2,
    backgroundColor: colors.grey
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rows_top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  rows_start: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rows_end: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  stretch: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputPasscode: {
    paddingTop: 10,
    paddingBottom: 5,
    color: colors.black,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  testFont: {
    fontFamily: fontFamily.Prompt,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center'
  },
  backTextWhite: {
    color: "#4F4F4F",
    fontSize: 12,
  },
  standaloneRowBack: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    marginVertical: 8,
  },
  menuLeft: {
    // flex: 1,
    marginLeft: -8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  menuRight: {
    // flex: 1,
    marginRight: -8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  itemMenuContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "stretch",
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 5,
    position: "relative",
  },
  backIcon: {
    color: "#4F4F4F",
    fontSize: 35,
    marginBottom: -5,
  },
  space: {
    paddingVertical: 0
  },
  input: {
    borderBottomColor: colors.border2,
    borderBottomWidth: 2,
    // width: '100%',
    paddingVertical: 10,
    marginVertical: 7,
    paddingLeft: 45
  },
  button: {
    backgroundColor: '#41b17a',
    padding: 10,
    borderRadius: 3,
    shadowColor: "#000",
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button2: {
    // backgroundColor: ,
    width: '30%',
    marginHorizontal: 8,
    padding: 7.5,
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: "rgb(200, 35, 63)",
    marginTop: 5,
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,

    elevation: 5,
  },
  buttonLogin: {
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignContent: 'center',
    marginTop: 50,
    fontSize: 18
  },
  buttonLoginText: {
    color: colors.white,
    textAlign: "center",
  },
  banner: {
    resizeMode: "contain",
    width: "60%",
    height: null,
    right: 0,
    marginHorizontal: "20%",
    marginTop: '10%',
    // flex:1,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 16 / 9, // Image ratio
    // borderRadius: 120,
  },
  text: {
    color: '#fff'
  },
  text_input: {
    color: "white",
    fontSize: 16,
  },
  input_block: {
    position: 'relative',
    padding: 20,
    margin: 15,

  },
  blur: {
    backgroundColor: "#000",
    opacity: 0.5,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 30
  },
  dropbox: {
    // flex: 1,
    position: 'absolute',
    // backgroundColor:"red",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // opacity: 0.8
  },
  video: {
    position: 'absolute',
    backgroundColor: "red",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  container: {
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    color: "white",
    fontSize: 20,
    marginTop: 90,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  block_app: {
    width: '48%',
    height: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  block_menu: {
    width: '25%',
    paddingRight: 7,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
    // margin: 1,
    // height: 100,
    // borderRadius: 20,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  btn_menu: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2.5%',
    borderWidth: 1.5,
    borderColor: '#ddd',
    backgroundColor: colors.red,
    borderRadius: 8,
  },
  footer_login: {
    alignItems: "center",
    padding: 22,
    paddingBottom: 0,
    width: '100%',
    justifyContent: 'center',
    // flex: 1,
  },
  footer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    // width: windowWidth,
    // marginBottom: -33,
    paddingBottom: 25,
    zIndex: 999,
    paddingTop: 15,
    shadowColor: colors.border2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,

    elevation: 5,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    marginBottom: 10,
  },
  dividerLine: {
    // flex: 1,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  dividerText: {
    width: 50,
    textAlign: "center",
    color: colors.warning
  },
  buttonRegister: {
    width: "100%",
    // backgroundColor: "#e7f3ff",
  },
  buttonRegisterText: {
    color: colors.warning,
  },
  badge: {
    backgroundColor: colors.red,
    padding: 5,
    minWidth: 30,
    minHeight: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge2: {
    backgroundColor: colors.white,
    // padding: 3,
    minWidth: 12,
    minHeight: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -3,
    right: 18
  },
  pickerContainer: {
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  container_layout: {
    backgroundColor: colors.background_basic_color_1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 15,
    marginBottom: 30,
  },
  container_full: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  ////////////////// pincode //////////
  containerCenter: {
    // marginTop: '0%',
    // justifyContent: "center",
    alignItems: "center",
  },
  pinBox: {
    backgroundColor: "transparent",
    height: windowWidth > widthScreen ? 100 : 60,
    width: windowWidth > widthScreen ? 100 : 60,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.25)',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    margin: 13,
  },
  pinBoxZero: {
    backgroundColor: "transparent",
    height: windowWidth > widthScreen ? 100 : 60,
    width: windowWidth > widthScreen ? 100 : 60,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    margin: 12,
    marginLeft: 118,
  },
  pinDelete: {
    height: windowWidth > widthScreen ? 100 : 60,
    width: windowWidth > widthScreen ? 100 : 60,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
  },
  faceId: {
    height: windowWidth > widthScreen ? 100 : 60,
    width: windowWidth > widthScreen ? 100 : 60,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
  },
  pinBoxText: {
    fontFamily: fontFamily.Prompt,
    fontSize: 25,
    color: colors.black,
  },
  pinContainer: {
    // flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: '10%'
    // maxWidth: 392,
  },
  titleText: {
    fontSize: 30,
  },
  putListContainer: {
    margin: 16,
    display: "flex",
    flexDirection: "row",
  },
  putCode: {
    marginHorizontal: 8,
    borderRadius: 50,
    borderWidth: 1,
    height: windowWidth > widthScreen ? 32 : 16,
    width: windowWidth > widthScreen ? 32 : 16,
    borderColor: colors.green,
  },
  fill: {
    backgroundColor: "#29658A",
  },
  outFill: {
    backgroundColor: "#000",
  },
  checkinButton: {
    width: 340,
    height: 340,
    borderRadius: 170,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  blockSearch1: {
    minHeight: 40,
    borderRadius: 10,
    paddingVertical: 10,
  },
  blockSearch: {
    borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.border2,
    borderWidth: 1,
    paddingVertical: 10,
    flexDirection: "row",
    minHeight: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
  blockText: {
    borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.border2,
    borderWidth: 1,
    minHeight: 40,
    paddingHorizontal: 15,
  },
  text_left: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
    paddingLeft: 40,
    flex: 1,
    paddingRight: 10,
    width: '100%'
  },
  iconSize1: {
    width: windowWidth > widthScreen ? 120 : 63,
    height: windowWidth > widthScreen ? 120 : 63,
  },
  iconSize2: {
    width: windowWidth > widthScreen ? 100 : 55,
    height: windowWidth > widthScreen ? 100 : 55,
  },
  iconLeft: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 5,
    top: 0,
    bottom: 0,
    width: 30,
  },
  iconRight: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 5,
    top: 0,
    bottom: 0,
    width: 30,
  },
  block_disable: {
    backgroundColor: colors.disable,
  },
  blockcard: {
    width: "100%",
    borderColor: colors.grey,
    borderWidth: 2,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderRadius: 5
    // paddingHorizontal: 15
  },
  blockcard2: {
    paddingVertical: 7
  },
  blockcard3: {
    // flex: 1,
    marginVertical: 7.5,
    padding: 7.5,
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: "#D0D0D0",
    backgroundColor: 'rgb(247, 247, 250)',
    opacity: 0.96,
  },
  title_red: {
    backgroundColor: colors.red,
    marginTop: -8,
    marginHorizontal: -8,
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    padding: 7
  },
  input_qty: {
    backgroundColor: colors.white,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: colors.border,
    // padding: 10
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "rgb(203, 213, 224)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5,
  },
  closeMenuButton: {
    backgroundColor: colors.danger,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    justifyContent: "center",
    alignItems: "center",
    // width: '100%'
  },
  alert: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 26,
    alignItems: "center",
    width: "80%",
    justifyContent: "center",
  },
  alert2: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    alignItems: 'flex-start',
    width: "100%",
    justifyContent: "center",
  },
  alertText: {
    textAlign: "center",
    // marginTop: 15,
  },
  block_title: {
    padding: 5,
    paddingBottom: 15
  },
  block_dropdown: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: colors.border2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
  block_dropdown2: {
    paddingLeft: 45,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E7F0FD',
    shadowColor: "rgb(90, 91, 106)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 4,
  },
  not_ready: {
    opacity: 0.5,
  },
  valid: {
    color: colors.red
  }
});
