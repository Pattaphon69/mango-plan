import axios from 'axios'
import $xt from './xtools'
import linq from 'js-linq'
import * as Application from 'expo-application';
import { Platform } from 'react-native'

const $linq = arr => new linq(arr);

let apiPasscode = {
    async getIP(passcode) {
        let url = `https://gateway.mangoanywhere.com/mobile_ip/Home/GetAuthorized2?cus_code=${encodeURIComponent(passcode)}`;
        let rsp = await axios.get(url);
        return rsp.data;
    },
    async getCompany(base) {
        let url = `${base || ''}Api/Public/LoginCompanies/`
        let rsp = await axios.get(url);
        return rsp.data;
    }
};

let apiAuth = {
    async login(maincode, userid, userpass) {
        console.log("login",maincode, userid, userpass);
        if ($linq(Array.from(arguments)).any(x => $xt.isEmpty(x))) {
            throw `โปรดป้อนข้อมูลให้ครบทุกช่อง. Please fill in all required fields.`
        }

        // const token_push = await apiAuth.notificationConfigure();     
        // const device_id = await Constants.deviceId;
        var device_id = ""
        if(Platform.OS === "android"){
         device_id = Application.androidId;
        }else{
            device_id = await Application.getIosIdForVendorAsync();
        }
        // console.log("device_id", device_id,);
        //string is_api = "N", string app_name = "POOL"
        let url = `Api/Public/Login?is_api=N&app_name=APPIC`
        let form = {
            maincode,
            userid,
            userpass,
            device_id,
            platform: 'APP'
            // token_push
        }
        console.log("form", form);
        let rsp = await $xt.postServerJson(url, form);
        console.log("fdfdf", rsp);
        return rsp;
    },
    async getAuth() {
        //PLANWEB
        let url = `Api/Public/ViewInitData2?menu_name=PLANWEB`
        let rsp = await $xt.getServer(url);
        // console.log(rsp)
        return rsp;
    },
    async logout() {
        //PLANWEB
        let url = `Api/Public/logout?is_api=N&all=false`
        let rsp = await $xt.getServer(url);
        //console.log(rsp)
        return rsp;
    },
}

export { apiPasscode, apiAuth }

export const loginOtherApplication = async (token, app_name) => {
    // console.log(`Planning/Planning/Planning_projectsummary?pre_event2=${pre_event2}&pre_event=${pre_event}`);
    return await $xt.getServer(
      `api/public/LoginOtherApplication?token=${token}&app_name=${app_name}`
    );
  };