import { View, TouchableOpacity } from 'react-native';
import { theme } from './theme';
import React from 'react';
import {Entypo } from '@expo/vector-icons'; 
export default function Arrow(props){
  
    return (
        <View style = {{flexDirection : "row", bottom : '5%', alignSelf : 'center'}}>

          <TouchableOpacity >
            <Entypo name="arrow-with-circle-left" size={70} color={theme.mColor} onPress = {props.leftArrow}/>
          </TouchableOpacity>

          <TouchableOpacity>
           <Entypo name="arrow-with-circle-right" size={70} color={theme.mColor} onPress = {props.rightArrow}/>
          </TouchableOpacity>
      </View>
    );
}
