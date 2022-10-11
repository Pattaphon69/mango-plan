import React from 'react';
import { ImageStyle,Alert } from 'react-native';
import axios from 'axios';
//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { lang } from './service-language';

const axioscustom = axios.create();
axioscustom.defaults.baseURL = "";
axioscustom.defaults.headers.post['X-Post-Back-Token'] =  '';
axioscustom.defaults.headers.common['X-API-Auth'] = 'Y';

const axioscustom2 = axios.create();
axioscustom2.defaults.baseURL = "";
axioscustom2.defaults.headers.common['X-Mango-Auth'] = '';
axioscustom2.defaults.headers.common['X-API-Auth'] = 'Y';



const service = {
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  isEmpty: function (x) {
    return x === undefined || x === null || x === '';
  },
  int(x) {
    return isNaN(parseInt(x)) ? 0 : parseInt(x);
  },
  Alert(message){
    Alert.alert(
      '',
      JSON.stringify(message),
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false }
    );
  },
  async getLocation(lat,lng) {
    let error = null;
    let resp = await axios.create().get("http://203.154.41.4/mango_geo/data/fetch",{
      params: {
        lat,
        lng
      }})
    return resp.data;
  },
  async getPasscode(url) {
    let error = null;
    let resp = await axios.create().get(url);
    return resp.data;
  },
  async getLocal(url) {
    let error = null;
    let resp = await axioscustom.get(url);
    return resp.data;
  },
  async postLocalJson(url, data) {
    let error = null;
    let resp = null;
    resp = await axioscustom.post(url, data);
    return resp.data;
  },
  async postLocalForm(url, formdata) {
    let error = null;
    let resp = null;
    resp = await axioscustom.post(url, formdata, { headers: { 'Content-Type': 'multipart/form-data' } });
    return resp.data;
  },
  async getServer(url) {
    var site_ = await getDataStorage("sitevalue_key");
    var token_ = await getDataStorage("token_key");
    var usertype_ = await getDataStorage("usertype");
    axioscustom.defaults.baseURL = site_;
    axioscustom2.defaults.baseURL = site_;
    axioscustom2.defaults.headers.common['X-Mango-Auth'] = token_;
    axioscustom2.defaults.headers.common['X-Mango-Outsorce'] = (usertype_ == "Outsource")?"Y":"N";
    let error = null;
    let resp = await axioscustom2.get(url);
    return resp.data;

  },
  async postServerJson(url, data) {
    var site_ = await getDataStorage("sitevalue_key");
    var token_ = await getDataStorage("token_key");
    var usertype_ = await getDataStorage("usertype");
    axioscustom.defaults.baseURL = site_;
    axioscustom2.defaults.baseURL = site_;
    axioscustom2.defaults.headers.common['X-Mango-Auth'] = token_;
    axioscustom2.defaults.headers.common['X-Mango-Outsorce'] = (usertype_ == "Outsource")?"Y":"N";

    let error = null;
    let resp = null;
    resp = await axioscustom2.post(url, data);
    return resp.data;
  },
  async postServerForm(url, formdata) {
    var site_ = await getDataStorage("sitevalue_key");
    var token_ = await getDataStorage("token_key");
    var usertype_ = await getDataStorage("usertype");
    axioscustom.defaults.baseURL = site_;
    axioscustom2.defaults.baseURL = site_;
    axioscustom2.defaults.headers.common['X-Mango-Auth'] = token_;
    axioscustom2.defaults.headers.common['X-Mango-Outsorce'] = (usertype_ == "Outsource")?"Y":"N";
    let error = null;
    let resp = null;
    resp = await axioscustom2.post(url, formdata, { headers: { 'Content-Type': 'multipart/form-data' } });
    return resp.data;
  },
  async getStorage(key) {
    let resp = await AsyncStorage.getItem(key)
    return resp;
  },
  async setStorage(key,value) {
    let resp = await AsyncStorage.getItem(key,value)
  },
  getDate(date,lang){
    if(lang == "th-TH"){
      var monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม"];
      var dayNames = ["วันอาทิตย์ที่","วันจันทร์ที่","วันอังคารที่","วันพุทธที่","วันพฤหัสบดีที่","วันศุกร์ที่","วันเสาร์ที่"];
      return ` ${dayNames[moment(date).day()]} ${moment(date).date()} ${monthNamesThai[moment(date).month()]} ${moment(date).year()+543}`;
    }else{
      var monthNamesEng = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
      var dayNamesEng = ['Sunday','Monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      return ` ${dayNamesEng[moment(date).day()]},${monthNamesEng[moment(date).month()]},${moment(date).date()},${moment(date).year()}`;
    }
  },
  getWbs(wbsid){
    var wbssplit = wbsid.split('.'); // "1.3.12.1.3";
    var wbsarr = [];
    var stringText = "";
    for (const e of wbssplit) {
      stringText +=('.'+e);
      wbsarr.push(stringText.substring(1,stringText.length))
    }
    return {
      arr:wbsarr,
      string:wbsarr.join(',')
    }
  },
  getimg(dataServer,download,file){
    if(file){
        var ing = dataServer + "api/file/download/?download="+download+"&id="+file;
        return {uri:ing}
    }else{
        return require("../../assets/images/user.png");
    }
  },
  niceBytes(x){
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;
    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  },
  getFileExtension(filename)
  {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1].toUpperCase();
  },
  currencyFormat(num,fix){
    if(num){
      return '' + num.toFixed(fix || 2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }else{
      return '' + (num || 2).toFixed(fix || 2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  },
  getStatus(obj){
      var start_d = moment(obj.start_date).toDate();
      var end_d = moment(obj.end_date).add(-1, 'days').toDate();
      var today_d = moment(new Date()).toDate();

      if (end_d < today_d)
      {
          if(parseFloat(obj.pv_per) == 100 && parseFloat(obj.ev_per) == 100){
              return "complete";
          }else{
              return "overdue";
          }

      }
      if(end_d == today_d ){
          if(parseFloat(obj.pv_per) == 100 && parseFloat(obj.ev_per) == 100){
              return "complete";
          }else{
              return "delay";
          }
      }

      if(end_d > today_d){
          if(parseFloat(obj.pv_per) == 0 && parseFloat(obj.pv_per) == parseFloat(obj.ev_per)){
              return "notstart";
          } else if(parseFloat(obj.pv_per) == 100 && parseFloat(obj.ev_per) == 100 || parseFloat(obj.ev_per) == 100) {
              return "complete";
          }else if(parseFloat(obj.pv_per) == 100 && parseFloat(obj.ev_per) != 100){
              return "overdue";
          }else if(parseFloat(obj.pv_per) != 100 && parseFloat(obj.pv_per) > 0 && parseFloat(obj.pv_per) <= parseFloat(obj.ev_per)){
              return "inprogress";
          }else if(parseFloat(obj.pv_per) != 100 && parseFloat(obj.pv_per) > 0 && parseFloat(obj.pv_per) > parseFloat(obj.ev_per)){
              return "delay";
          }else if(parseFloat(obj.pv_per) == 0 && parseFloat(obj.ev_per) != 0){
              return "inprogress";
          }
      }
  },
  async getLang(){
    let lang_ = await getDataStorage("language_ppn") || "EN";
    let lang_wh = (lang_ == "TH")?"TH":"EN"
    return lang[lang_wh];
  },
  dec(x, n) {
    if (isNaN(parseFloat(x))) return 0;
    n = parseInt(n) || 2;
    var parts= x.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1].substring(0, n) : "");
    //return dc;
  },
};

export const getDataStorage = async (key) => {
  return  await AsyncStorage.getItem(key)
}

export const setDataStorage = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
    // saving error
  }
}

export const xt = service;