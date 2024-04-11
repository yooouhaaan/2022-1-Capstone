import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { theme } from '../../../shared/theme';
import Header from '../../../shared/header';
import React, {useState} from 'react';
import Arrow from '../../../shared/Arrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 
import { WidthAndHeight } from '../../../shared/Dimension';
import axios from 'axios';
export default function Page4({navigation}) {
  var pageNum = 4;
  const [phone, setPhone] = useState('');
  const [validInput, setVInput] = useState(null);
  const [validNum, setValid] = useState(null);
  const [confirm, setConfirm] = useState(true);//true시 이동 가능
  const su_phone = (val) => {
    setPhone(val);
    AsyncStorage.setItem('su_phone', val, () => {
      console.log('전화번호 실시간 변화 저장 : ' + val)
    })
  };

  const sendMessageToPhone = () => {
    Alert.alert('인증번호 전송', '다음 번호로 메시지를 보냅니다.\n' + phone, [
      {
        text : '인증번호 전송',
        onPress : () => {
          axios.get('https://prod.asherchiv.shop/app/users/phone-validation?recipient=' + phone)
          .then(function (response){
            console.log('전화번호 전송')
            console.log('문자메시지 : ' + response)
            setValid(response)
          }).catch(function (error){
            console.log(error);
          })
        }
      },
      {
        text : '취소'
      }
    ])
    
  }

  const numberSetter = (val) => {
    switch (val)
    {
      case 1 :
      navigation.navigate('회원가입1');
      break;
      case 2 :
      navigation.navigate('회원가입2');
      break;
      case 3 :
      navigation.navigate('회원가입3');
      break;
      case 4 :
      navigation.navigate('회원가입4');
      break;
      case 5 :
        console.log(validNum)
        if(confirm)
        {
          navigation.navigate('회원가입5');
        }
        else{
          Alert.alert('알림', '전화번호 인증을 선행해주세요.', [
            {
              text : '확인',
            }
          ])
        }
    
      break;
      case 6 :
      navigation.navigate('회원가입6');
      break;
      default : 
      break;
    }
  }
  return (
    <View style = {styles.container}>
      <Header str = '회원가입' width = '150'></Header>

        <View style  = {{left : '10%', marginBottom : '5%'}}>
            <View style = {{flexDirection : 'row'}}>
            <TouchableOpacity  >
                <MaterialCommunityIcons onPress = {() => numberSetter(1)} name="numeric-1-circle-outline" size={45} color="black" style = {{opacity : 0.3}} />
          </TouchableOpacity>
          <TouchableOpacity  >
            <MaterialCommunityIcons onPress = {() => numberSetter(2)} name="numeric-2-circle-outline" size={45} color="black" style = {{opacity : 0.3}}/>
          </TouchableOpacity>
          <TouchableOpacity   >
            <MaterialCommunityIcons onPress = {() => numberSetter(3)} name="numeric-3-circle-outline" size={45} color="black" style = {{opacity : 0.3}}/>
          </TouchableOpacity>
          <TouchableOpacity  >
            <MaterialCommunityIcons onPress = {() => numberSetter(4)} name="numeric-4-circle-outline" size={45} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity >
            <MaterialCommunityIcons  onPress = {() => numberSetter(5)} name="numeric-5-circle-outline" size={45} color="black" style = {{opacity : 0.3}}/>
          </TouchableOpacity>
          <TouchableOpacity >
            <MaterialCommunityIcons  onPress = {() => numberSetter(6)} name="numeric-6-circle-outline" size={45} color="black" style = {{opacity : 0.3}}/>
          </TouchableOpacity>
        </View>
        
        <Text style  = {{fontSize : 20,fontFamily : 'IBMMe'}}>4단계 - 전화번호 입력</Text>
 
        <View>
        <Text style = {{fontSize : 25, fontFamily : 'IBMMe'}}>선생님의 전화번호를 알려주세요</Text>
        </View>
  
    <View style = {{flexDirection : 'row', width : WidthAndHeight.windowWidth*0.8, justifyContent : 'space-between' }}>
        <TextInput style = {{borderWidth : 1, borderColor : 'white', padding : 10, width : WidthAndHeight.windowWidth*0.5,
        paddingLeft : 12, fontSize : 17, borderBottomColor : theme.mColor, marginBottom : '5%'}} 
        placeholder = " '-' 없이 전화번호 입력"
        keyboardType = 'numeric'
        onChangeText= {text  => su_phone(text)}
        >
        </TextInput> 

      <TouchableOpacity onPress={() => {sendMessageToPhone()}}>
      <View style = {{
        borderRadius : 4, alignItems : 'center', marginTop : 5,
        width : WidthAndHeight.windowWidth*0.33, height : WidthAndHeight.windowHeight*0.05, backgroundColor : theme.mColor}}>
      <Text style = {{ color :  'white', fontFamily : 'IBMMe', fontSize : 17,}}>인증번호 전송</Text>  
      </View>
    </TouchableOpacity>                 
    </View>
      
    <View style = {{flexDirection : 'row', width : WidthAndHeight.windowWidth*0.8, justifyContent : 'space-between' }}>
        <TextInput style = {{borderWidth : 1, borderColor : 'white', padding : 10, width : WidthAndHeight.windowWidth*0.5,
        paddingLeft : 12, fontSize : 17, borderBottomColor : theme.mColor, marginBottom : '5%'}} 
        placeholder = "인증번호 입력"
        keyboardType = 'numeric'
        onChangeText= {text  => setVInput(text)}
        >
        </TextInput> 
    <TouchableOpacity onPress={() => {

      console.log(validNum.data.contents.valid_str)
      if(validInput == validNum.data.contents.valid_str)
      {
        console.log('인증번호 일치')
        setConfirm(true);
        Alert.alert('알림', '인증이 확인되었습니다!', [
          {
            text : '확인',
          }
        ])
      }
      else{
        Alert.alert('알림', '인증번호가 불일치합니다. \n문자로 전송된 번호를 확인해주세요.', [
          {
            text : '확인',
          }
        ])
        console.log('인증번호 불일치')
        setConfirm(false);
      }
      }}>
      <View style = {{
        borderRadius : 4, alignItems : 'center', 
        width : WidthAndHeight.windowWidth*0.33, height : WidthAndHeight.windowHeight*0.05, backgroundColor : theme.mColor}}>
      <Text style = {{color :  'white', fontFamily : 'IBMMe', fontSize : 17,}}>인증번호 확인</Text>  
      </View>
    </TouchableOpacity>    
    </View>

        {confirm == true ? 
        (<Text style = {{fontSize : 15, fontFamily : 'IBMMe'}}>전화번호 인증되었습니다.</Text>) 
        :
        (<Text style = {{fontSize : 15, fontFamily : 'IBMMe'}}>전화번호가 인증되지 않았습니다!</Text>) 
        }

    </View>
      <View style = {{bottom : -10}}> 
        <Arrow leftArrow = {() => numberSetter(3)} rightArrow = {() =>numberSetter(5)}></Arrow>
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
