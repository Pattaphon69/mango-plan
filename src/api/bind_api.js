import axios from "axios";
import $xt from "./xtools";
import { getCustomerURL, getHeader } from "./constants";
/////////////////// Center ///////////////////
export const ppnConfig = async () => {
  return await $xt.getServer(`Planning/Plan/ppn_config`);
};
export const projectList = async () => {
  return await $xt.getServer(`Planning/Plan/app_project_list`);
};
export const planningProject = async () => {
  return await $xt.getServer(`Planning/Planning/Planning_project`);
};