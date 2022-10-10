import React, { useState } from "react";
import { TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

import Alert from "../components/Alert"
import $xt from "../api/xtools";
export default function HeaderLeft({ navigation, checkBack, docList }) {
   const [alertShow, setAlertShow] = useState(false);
   const checkMat = docList?.detail[0]?.itemcode || null;
   // console.log("navigation", navigation);
   const _beforeNext = () => {
      console.log("checkBack && checkMat", checkBack, checkMat);
      if (checkBack && !$xt.isEmpty(checkMat)) {
         setAlertShow(true)
      } else {
         navigation.goBack()
      }
   }
   const _beforeSave = () => {
      setAlertShow(!alertShow)
      $xt.sleep(500)
      navigation.navigate("Home")
   }
   return (
      <>
         <Alert
            visible={alertShow}
            onConfirm={() => { _beforeSave() }}
            onClose={() => { setAlertShow(!alertShow) }}
            type={"back"}
         />
         <TouchableOpacity style={{ paddingHorizontal: 7.5, marginLeft: 7.5 }} onPress={() => _beforeNext()}>
            <Feather name="chevron-left" size={30} color="white" />
            {/* <Feather name="command" size={30} color="black" /> */}
         </TouchableOpacity>
      </>

   )
}