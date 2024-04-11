import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TextInput , Text, Modal, View, Button, 
    Pressable, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Alert} from 'react-native';
import Header from '../../shared/header';
import { theme } from '../../shared/theme';
import { WidthAndHeight } from '../../shared/Dimension';
import {useState, useEffect} from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
const windowHeight = WidthAndHeight.windowHeight;
const windowWidth = WidthAndHeight.windowWidth;

export default function Chatroom({route, navigation}) {
  
    const [url, setURL] = useState('');

    const url_setter = (str) => {
      setURL(str);
    }
    useEffect(() => {
      /*
        setUserIdx(route.params.user_idx);
        setUserName(route.params.user_name);
        setRoomNum(route.params.roomNum);
        setOtherName(route.params.otherName);
        */
       console.log(url);
    }, [url])

    useEffect(() => {
        url_setter(route.params.url);
    }, [])

  
  return (
    <WebView 
          style={{marginTop : 50, height: windowHeight*0.8}}
          source={{ uri: route.params.url }}
        />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    
  },

});
