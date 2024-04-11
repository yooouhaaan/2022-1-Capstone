import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { theme } from '../../../shared/theme';
import Header from '../../../shared/header';
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 
import axios from 'axios';
import Arrow from '../../../shared/Arrow';
import { WidthAndHeight } from '../../../shared/Dimension';
export default function S_Page4({navigation}) {

  const navi = useNavigation();
  const [ins, setins] = useState(0)
  const [car, setCar] = useState(0)
  const insSetter = (val) => {
    setins(val);
    AsyncStorage.setItem('su_ins', ins.toString(), () => {
    
      console.log('보험가입여부 : ' + val);
    });   // 저장하는 법
  }
  const carSetter = (val) => {
    setCar(val);
    AsyncStorage.setItem('su_car', car.toString(), () => {
    
      console.log('운전면허 여부 : ' + val);
    });   // 저장하는 법
  }
  return (
        <View style = {styles.container}>
        <Header str = '회원가입' width = '150'></Header>

        <View style  = {{left : '10%', marginBottom : '5%'}}>
          <View style = {{flexDirection : 'row'}}>
    
        </View>
        <Text style  = {{fontSize : 20,fontFamily : 'IBMMe'}}>10단계 - 보험 가입/운전면호 보유 여부 </Text>
        <View>
        <Text style = {{fontSize : 20,fontFamily : 'IBMMe'}}>노인장기보험에 가입되어 계신가요?</Text>
        </View>
  
    <View style = {{  }}>   
        <TouchableOpacity style = {{marginVertical : 5}} onPress = {() => insSetter(1)}>
          <View style = {{...styles.button, backgroundColor : ins == 0 ? 'white' :theme.mColor}}>
          <Text style = {{fontSize : 18, padding : 5, fontFamily : 'IBMMe'}}>
            저는 보험에 가입되어 있어요.
          </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style = {{marginVertical : 5}} onPress = {() => insSetter(0)}>
        <View style = {{...styles.button,  backgroundColor : ins == 1 ? 'white' :theme.mColor}}>
        <Text style = {{fontSize : 18, padding : 5, fontFamily : 'IBMMe'}}>
            저는 보험에 가입되어 있지 않아요.
          </Text>
          </View>
        </TouchableOpacity>
    </View>

    <View>
        <Text style = {{fontSize : 20,fontFamily : 'IBMMe'}}>운전면허가 있으세요?</Text>
        </View>
  
    <View style = {{  }}>   
        <TouchableOpacity style = {{marginVertical : 5}} onPress = {() => carSetter(1)}>
          <View style = {{...styles.button, backgroundColor : car == 0 ? 'white' :theme.mColor}}>
          <Text style = {{fontSize : 18, padding : 5, fontFamily : 'IBMMe'}}>
            저는 운전면허가 있어요.
          </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style = {{marginVertical : 5}} onPress = {() => carSetter(0)}>
        <View style = {{...styles.button, backgroundColor : car == 1 ? 'white' :theme.mColor}}>
        <Text style = {{fontSize : 18, padding : 5, fontFamily : 'IBMMe'}}>
            저는 운전면허가 없어요.
          </Text>
          </View>
        </TouchableOpacity>
    </View>

    
        
        <Text style = {{fontSize : 15, fontFamily : 'IBMMe'}}>정부 지원 정책 추천을 위한 정보에요!</Text>
      
        
    </View>
    <View style = {{bottom : -10}}><Arrow leftArrow = {() => navigation.pop()} rightArrow = {() =>navigation.navigate('소득수준')}></Arrow></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button : {
    borderWidth : 4, borderColor : theme.mColor, borderRadius : 5,  width :  WidthAndHeight.windowWidth*0.8,
  }
});
