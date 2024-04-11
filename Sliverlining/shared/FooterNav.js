import { StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';
import React from 'react';
import { WidthAndHeight } from './Dimension';
export default function FooterNav(props){ //width, str 필요
    return (
        <View style = {styles.banner}>
            <View style = {{ flexDirection : 'row', borderWidth : 2, borderColor : theme.mColor,  backgroundColor : theme.mColor}}>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title : {
      marginTop : '5%',
      marginLeft : '10%',
    },
    banner : {
   
     height: WidthAndHeight.windowHeight*0.08,
    },
   
  });
  