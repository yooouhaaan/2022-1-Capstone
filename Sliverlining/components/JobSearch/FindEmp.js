import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  TouchableOpacity } from 'react-native';
import Header from '../../shared/header';
import { theme } from '../../shared/theme';
import { WidthAndHeight } from '../../shared/Dimension';
import MyPageIconHeader from '../../shared/MyPageIconHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons,  MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { useEffect, useState } from 'react';
const windowWidth = WidthAndHeight.windowWidth;
const windowHeight = WidthAndHeight.windowHeight;
export default function FindEmp({navigation}) {
  const [name, setName] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('user_name', (err, result) => { 
      setName(result);
      console.log('username : ' + result);
    });
  }, [])
  useEffect(() => {
    console.log(name);
  }, [name])
  return (
    <View style={styles.container}>
      <View style = {{position : 'absolute', top : '8%', right : '10%'}}>
      <TouchableOpacity onPress = {() => navigation.navigate('마이페이지')}>
        <View style = {{flexDirection : 'row'}}>
        <Text style = {{fontFamily : 'IBMMe', fontSize : 16, paddingTop : 8}}>어서오세요. {name}님</Text><MyPageIconHeader></MyPageIconHeader>
        </View>
      </TouchableOpacity>
    </View>

      <Header str = '구인 정보 등록'  width = '240'>
        
      </Header>
      <View style = {{flexDirection : 'row', alignSelf : 'center'}}>

      <TouchableOpacity onPress = {() => navigation.navigate('구인글등록')}>
      <View style  = {{...styles.gridBox, }}>
          <View style = {{flexDirection : 'row'}}>
            <MaterialIcons name="person-search" size={45} color={theme.mColor} /><Text style  = {styles.textStyle}></Text> 
          </View>
          
          <Text style = {{fontSize : 20, marginVertical : 15, fontFamily : 'IBMMe'}}>
              구인글 등록
          </Text>
          <Text style  = {{fontSize : 17, marginTop : 5, fontFamily : 'IBMMe'}}>
          내 직장에 맞는{'\n'}직원 구인
          </Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => navigation.navigate('작성한구인글')}>
      <View style  = {{...styles.gridBox}} >
          <View style = {{flexDirection : 'row'}}>
            <MaterialCommunityIcons name="shopping-search" size={45} color={theme.mColor} /><Text style  = {styles.textStyle}></Text>
          </View>

          <Text style = {{fontSize : 20, marginVertical : 15, fontFamily : 'IBMMe'}}>
              내가 쓴 구인글
          </Text>
          <Text style  = {{fontSize : 17, marginVertical : 5, fontFamily : 'IBMMe'}}>
          내가 쓴{'\n'}구인글 조회
          </Text>
      </View>
      </TouchableOpacity>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  gridBox : {
    borderWidth : 3,
    borderColor : theme.mColor,
    borderRadius : 10,
    backgroundColor : 'white',
    width : windowWidth/2.7,
    height : windowHeight / 3,
    margin : 8,
    padding : 7
  },
});
