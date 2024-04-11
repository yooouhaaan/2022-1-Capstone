import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../../../shared/theme';
import Arrow from '../../../shared/Arrow';
import Header from '../../../shared/header';
import React, {useState} from 'react';
import { WidthAndHeight } from '../../../shared/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage'
import SaveButton from '../../../shared/SaveButton';

export default function S_Page2({navigation}) {
  const [guardnum, setGuard] = useState("");
  const leftButton = () => {
    navigation.pop();
  }
  const phoneSet = (val) =>{
    setGuard(val)
    console.log(guardnum);
  }
  const rightButton = () => {
    navigation.navigate('직업이력');
  }
  const saveGuardian = () => {
    console.log(guardnum)
    AsyncStorage.setItem('su_guard', guardnum, () => {
      console.log('보호자 전화번호 저장 : ' + guardnum)
    })
  }
  return (
    <View style = {styles.container}>
        <Header str = "회원가입" width = "136"></Header>
      <View style = {{left : '10%'}}>

        <Text style  = {{fontSize : 20,fontFamily : 'IBMMe'}}>8단계 - (선택)보호자 정보 입력</Text>
        <View>
        <Text style = {{fontSize : 22, fontFamily : 'IBMMe'}}>보호자님의 전화번호를 알려주세요.</Text>
        </View>
  
        <TextInput style = {{borderWidth : 1, width : WidthAndHeight.windowWidth*0.7, borderColor : 'white', padding : 10, paddingLeft : 15, fontSize : 20, borderBottomColor : theme.mColor}} 
        placeholder = "(선택)보호자 전화번호 입력"
        keyboardType='numeric'
        onChangeText={text => phoneSet(text)}
        >
        </TextInput>
        <Text>{'\n'}</Text>
        
        <SaveButton title = '전화번호 저장' save = {saveGuardian}></SaveButton>
        
        <View style = {{width : WidthAndHeight.windowWidth*0.9, padding : 15}}> 
          <Text style = {{fontSize : 20, fontFamily : 'IBMMe'}}>해당 정보 입력은 필수가 아닙니다.</Text>
        </View>
  
      </View>

      <View style = {{alignSelf : 'center', bottom : '-5%' }}>
      <Arrow leftArrow = {leftButton} rightArrow = {rightButton}></Arrow>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
