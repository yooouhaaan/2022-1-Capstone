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
export default function S_Page5({navigation}) {

  const [income, setIncome] = useState(0)
  const navi = useNavigation();

  const incomeSetter = (val) => {
    setIncome(val)
    AsyncStorage.setItem('su_income', income.toString(), () => {
      console.log('월급 수준 : ' + val)
    });   // 저장하는 법
  }
  return (
        <View style = {styles.container}>
        <Header str = '회원가입' width = '150'></Header>

        <View style  = {{left : '10%', marginBottom : '5%'}}>
            <View style = {{flexDirection : 'row'}}>
      
          </View>
          <Text style  = {{fontSize : 20,fontFamily : 'IBMMe'}}>11단계 - 소득수준 입력 </Text>
          <View>
          <Text style = {{fontSize : 18,fontFamily : 'IBMMe'}}>(선택)월 소득액을 적어주세요.</Text>
          </View>
    
          <View style = {{ justifyContent : 'center', marginVertical: '10%' }}>   
            <View style = {{borderWidth : 4, borderColor : theme.mColor, borderRadius : 5,  width :  WidthAndHeight.windowWidth*0.8,}}>
              <TextInput placeholder='(예 : 100000)' style = {{fontSize : 30, padding : 10}} onChangeText={text => incomeSetter(text)}></TextInput>
            </View>
          </View>     
          <View>
          <Text style = {{fontSize : 18,fontFamily : 'IBMMe'}}>정부 지원 정책 추천을 위한 정보입니다.</Text>
          </View>                          
        </View>
      
    <View style = {{bottom : -10}}><Arrow leftArrow = {() => navigation.pop()} rightArrow = {() =>navigation.navigate('추가정보')}></Arrow></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
});
