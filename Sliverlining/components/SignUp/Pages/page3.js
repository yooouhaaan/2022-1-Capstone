import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { theme } from '../../../shared/theme';
import Header from '../../../shared/header';
import React, {useState, useEffect} from 'react';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 
import Arrow from '../../../shared/Arrow';
import { WidthAndHeight } from '../../../shared/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Page3({navigation}) {
  
  const [name, setName] = useState('');
  const su_name = (val) => {
    setName(val);
    AsyncStorage.setItem('su_name', val, () => {
      console.log('이름 실시간 변화 저장 : ' + val)
    });
  };
  const [birthday, setBirth] = useState('');
  const su_birth = (val) => {
    setBirth(val);
    AsyncStorage.setItem('su_birth', val, () => {
      console.log('생년월일 실시간 변화 저장 : ' + val)
    });
  };
  const [gender, setGender] = useState(0);
  const su_gender = (val) => {
    setGender(val);
    AsyncStorage.setItem('su_gender', val.toString(), () => {
      console.log('성별 저장 : ' + val)
    });
  };

  useEffect(() => {
    console.log('name : ' + name + " birthday : " + birthday)
  }, [name, birthday])

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
                <MaterialCommunityIcons onPress = {() => numberSetter(1)} name="numeric-1-circle-outline" size={45} color="black"  style = {{opacity : 0.3}}/>
          </TouchableOpacity>
          <TouchableOpacity  >
            <MaterialCommunityIcons onPress = {() => numberSetter(2)} name="numeric-2-circle-outline" size={45} color="black" style = {{opacity : 0.3}}/>
          </TouchableOpacity>
          <TouchableOpacity   >
            <MaterialCommunityIcons onPress = {() => numberSetter(3)} name="numeric-3-circle-outline" size={45} color="black"/>
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
      
        <Text style  = {{fontSize : 20,fontFamily : 'IBMMe'}}>3단계 - 성함, 생년월일, 성별 입력</Text>
        <View>
        <Text style = {{fontSize : 25,fontFamily : 'IBMMe'}}>선생님의 정보를 알려주세요.</Text>
        </View>
  
        <TextInput style = {{borderWidth : 1, borderColor : 'white', padding : 10, paddingLeft : 15, fontSize : 20, borderBottomColor : theme.mColor, width :  WidthAndHeight.windowWidth*0.73}} 
        placeholder = "성함 입력"
        keyboardType='default'
        onChangeText = {text => su_name(text)}
        >
        </TextInput>
        <TextInput style = {{borderWidth : 1, borderColor : 'white', padding : 10, paddingLeft : 15, fontSize : 20, borderBottomColor : theme.mColor, width :  WidthAndHeight.windowWidth*0.73}} 
        placeholder = "생년월일 입력(예 19550101)"
        keyboardType='number-pad'
        onChangeText = {text => su_birth(text)}
        >
        </TextInput>

        <View style = {{flexDirection :'row', marginTop : 15}}>
        <TouchableOpacity onPress = {() => su_gender(0)}>
          <View 
          style = {{
          backgroundColor : (gender == 0 ? theme.mColor :'white') ,
          marginHorizontal : 10, borderWidth : 1, borderColor : theme.mColor, borderRadius : 5}}><Text style = {{paddingVertical : 10, fontSize : 20, paddingHorizontal : 10}}>남성</Text>
          </View>
          </TouchableOpacity>
        <TouchableOpacity onPress = {() => su_gender(1)}>
          <View
        style = {{
          backgroundColor : (gender == 1 ? theme.mColor :'white'),
          marginHorizontal : 10, borderWidth : 1, borderColor : theme.mColor, borderRadius : 5}}><Text style = {{paddingVertical : 10, fontSize : 20, paddingHorizontal : 10}}>여성</Text></View></TouchableOpacity>
        </View>

        <Text style = {{fontSize : 15, fontFamily : 'IBMMe'}}>{'\n\t\t'}선생님의 정보를 소중히 보관합니다.</Text>
        <Text>
          {'\n'}
        </Text>   
        
    </View>
    <View style = {{bottom : -10}}>
    <Arrow leftArrow = {() => numberSetter(2)} rightArrow = {() =>numberSetter(4)}></Arrow>
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
