import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import { theme } from '../../../shared/theme';
import Header from '../../../shared/header';
import React, {useState, useEffect} from 'react';
import Arrow from '../../../shared/Arrow';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 
import { WidthAndHeight } from '../../../shared/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page2({navigation}) {
  const [password, setPassword] = useState('');
  var pageNum = 1;
  const su_password = (val) => {
    setPassword(val);
    AsyncStorage.setItem('su_pw', val, () => {
      console.log('비밀번호 실시간 변화 저장 : ' + val)
    })
  };
  useEffect(() => {
    console.log(password)
  }, [password])
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
      navigation.navigate('회원가입5');
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
            <MaterialCommunityIcons onPress = {() => numberSetter(2)} name="numeric-2-circle-outline" size={45} color="black" />
          </TouchableOpacity>
          <TouchableOpacity   >
            <MaterialCommunityIcons onPress = {() => numberSetter(3)} name="numeric-3-circle-outline" size={45} color="black" style = {{opacity : 0.3}}/>
          </TouchableOpacity>
          <TouchableOpacity  >
            <MaterialCommunityIcons onPress = {() => numberSetter(4)} name="numeric-4-circle-outline" size={45} color="black" style = {{opacity : 0.3}}/>
          </TouchableOpacity>
          <TouchableOpacity >
            <MaterialCommunityIcons  onPress = {() => numberSetter(5)} name="numeric-5-circle-outline" size={45} color="black" style = {{opacity : 0.3}}/>
          </TouchableOpacity>
          <TouchableOpacity >
            <MaterialCommunityIcons  onPress = {() => numberSetter(6)} name="numeric-6-circle-outline" size={45} color="black" style = {{opacity : 0.3}}/>
          </TouchableOpacity>
        </View>
        <Text style  = {{fontSize : 20, fontFamily : 'IBMMe'}}>2단계 - 비밀번호 입력</Text>
        <View>
        <Text style = {{fontSize : 24, fontFamily : 'IBMMe'}}>사용하실 비밀번호를 입력하세요.</Text>
    
        </View>
  
        <TextInput style = {{borderWidth : 1, borderColor : 'white', padding : 10, paddingLeft : 15, fontSize : 20, borderBottomColor : theme.mColor, width : WidthAndHeight.windowWidth*0.5}} 
        placeholder = "비밀번호 정보 입력"
        keyboardType='default'
        onChangeText={text => su_password(text)}
        >
        </TextInput>
        <Text style = {{fontSize : 15, fontFamily : 'IBMMe'}}>{'\n\t\t'}선생님의 정보를 소중히 보관합니다.</Text>
        <Text>
          {'\n'}
        </Text>   
        
      </View>
      <View style = {{bottom : -10}}>
      <Arrow leftArrow = {() => numberSetter(1)} rightArrow = {() =>
        {
          Alert.alert('알림', '현재 비밀번호 :' + password, [
            {
              text : '다음 단계로',
              onPress : () => {
                numberSetter(3)
              },
              style : 'default'
            },
            {
              text : '비밀번호 수정',
              style : 'cancel'
            }
          ])
        }
       }></Arrow>
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
