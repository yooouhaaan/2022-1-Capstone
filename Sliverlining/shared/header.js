import { StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';
import React from 'react';
export default function Header(props){ //width, str 필요
    return (
        <View style = {styles.banner}>
        <Text style = {{...styles.bannerText, fontSize : 30, fontFamily : 'Sans'}}>SilverLining</Text>
        <Text style = {{
          ...styles.bannerText, marginTop : 5, fontSize : 33, fontWeight :"500", color: 'black',
           width : parseInt(props.width), fontFamily : 'IBMMe',
          }}>{props.str}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    title : {
      marginTop : '5%',
      marginLeft : '10%',
    },
    banner : {
      marginTop : "15%",
    },
    bannerText : {
      marginLeft : "10%",
    },
  });
  