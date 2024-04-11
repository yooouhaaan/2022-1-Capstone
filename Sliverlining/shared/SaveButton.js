import {StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { theme } from './theme';
import React from 'react';

export default function SaveButton(props){ //title, 
    return (
        <TouchableOpacity onPress={props.save}>
        <View style = {{ borderWidth : 1, borderColor : theme.mColor, width : 100,
        borderRadius : 7 }} >
          <Text style = {styles.button}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button : {
        marginVertical : 5,
         padding : 5,
    },
    
  });
  
