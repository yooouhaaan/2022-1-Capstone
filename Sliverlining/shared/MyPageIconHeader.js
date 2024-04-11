import { StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
export default function MyPageIconHeader(){
    return (
        <Ionicons name="person-circle-outline" size={50} color={theme.mColor}/>
    );
}

const styles = StyleSheet.create({
  
  });
  


