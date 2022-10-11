import { Decimal } from "decimal.js";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

let $xt = {
  async sleep(x) {
    return new Promise((rs, rj) => {
      setTimeout(() => {
        rs();
      }, x);
    });
  },
  isEmpty(x) {
    return x === null || x === undefined || x === "";
  },
  async axiosMangoCreate() {
    let axioscustom2 = axios.create();
    axioscustom2.defaults.baseURL =
      (await AsyncStorage.getItem("baseUrl")) || "";
    axioscustom2.defaults.headers.common["X-Mango-Auth"] =
      (await AsyncStorage.getItem("mango_auth")) || "";
    //X-API-Auth
    // axioscustom2.defaults.headers.common["X-API-Auth"] = "Y";
    return axioscustom2;
  },

  async getServer(url) {
    let axioscustom2 = await $xt.axiosMangoCreate();
    let error = null;
    let resp = await axioscustom2.get(url, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    return resp.data;
  },
  async postServerJson(url, data) {
    let axioscustom2 = await $xt.axiosMangoCreate();
    let error = null;
    let resp = null;
    resp = await axioscustom2.post(url, data);
    return resp.data;
  },
  async postServerForm(url, formdata) {
    let axioscustom2 = await $xt.axiosMangoCreate();
    let error = null;
    let resp = null;
    resp = await axioscustom2.post(url, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return resp.data;
  },
  int(x) {
    return isNaN(parseInt(x)) ? 0 : parseInt(x);
  },
  dec(x, n) {
    if (isNaN(parseFloat(x))) return 0;
    n = isNaN(parseInt(n)) ? 6 : parseInt(n);
    let dc = new Decimal(x).toDP(n).toNumber();
    return dc;
  },
  hideSymbol(x) {
    if (isNaN(parseFloat(x))) return 0;
    let hs = x.replace(/[- #*;,<>\{\}\[\]\\\/]/gi, '')
    return hs;
  },
  formatNumber(x, n) {
    try {
      if ($xt.isEmpty(x) || isNaN(parseFloat(x) || new Decimal(x).isNaN())) {
        return "";
      }
      n = $xt.isEmpty(n) || isNaN(parseInt(n)) ? 0 : parseInt(n);
      let nString = new Decimal(x).toFixed(n).toString();
      let sp = nString.split(".");
      let fm = parseInt(sp[0]).toLocaleString("en-US");
      if (sp.length > 1) {
        fm = fm + "." + sp[1].toString();
      }

      return fm;
    } catch (err) {
      return "";
    }
  },
  reformatNumber(x, n) {
    try {
      if ($xt.isEmpty(x) || isNaN(parseFloat(x) || new Decimal(x).isNaN())) {
        return "";
      }
      n = $xt.isEmpty(n) || isNaN(parseInt(n)) ? 0 : parseInt(n);
      let nString = new Decimal(x).toFixed(n).toString();
      let sp = nString.split(".");
      let fm = parseInt(sp[0]).toLocaleString("en-US");
      if (sp.length > 1) {
        fm = fm + "." + sp[1].toString();
      }

      return fm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (err) {
      return "";
    }
  },
  formatDate(d, f) {
    if ($xt.isEmpty(d) || !moment(d).isValid()) {
      return "";
    }
    f = $xt.isEmpty(f) ? "DD/MM/YYYY" : f;
    return moment(d).format(f);
  },
  async getBaseUrl() {
    return (await AsyncStorage.getItem("baseUrl")) || "";
  },
  async getLang() {
    console.log("getLang");
    let lang_ = await getDataStorage("language_ppn") || "EN";
    let lang_wh = (lang_ == "TH") ? "TH" : "EN"
    return lang[lang_wh];
  },
  Alert(message) {
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
};
export default $xt;
