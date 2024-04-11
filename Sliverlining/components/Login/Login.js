import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import { theme } from '../../shared/theme'
import Header from '../../shared/header';
import { SimpleLineIcons, AntDesign, MaterialIcons,} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
export default function Login({navigation}) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [u_jwt, setJWT] = useState("");
  useEffect(() => {
    console.log(id + " " + password)
  }, [id, password])
  const idSetter = (val) => {
    setId(val);
    console.log('아이디 : ' + id);
  } 
  const pwSetter = (val) => {
    setPassword(val);
    console.log('패스워드 : ' + password);
  } 
  const validChecker = () => {
    axios.post('https://prod.asherchiv.shop/app/users/sign-in', {
      'user_id' : id,
      'user_pw' : password
    })
    .then(function (response)
    {
      console.log('content : ' + response.data.contents);
      
      var tjwt;
      if(response.data.contents.jwt != undefined)
      {
        tjwt = response.data.contents.jwt;
        setJWT(tjwt);
        AsyncStorage.setItem('user_jwt',  response.data.contents.jwt, () => {
          console.log('로그인 성공, jwt : ' + u_jwt);
        });
      
        axios.get('https://prod.asherchiv.shop/app/users?user-id=' + id, {
        })
        .then(function (response){
          console.log(response.data.contents[0]);
          
          AsyncStorage.setItem('user_name', response.data.contents[0].user_name, () => {
            console.log('로그인 성공, 이름 : ' + response.data.contents[0].user_name);
          });
          AsyncStorage.setItem('user_id', id, () => {
            console.log('로그인 성공, id : ' + id);
          });
          AsyncStorage.setItem('u_idx', response.data.contents[0].user_idx.toString(), () => {
            console.log('유저 인덱스, idx : ' + response.data.contents[0].user_idx);
          });
        Alert.alert('로그인 성공!', '메인페이지로 이동합니다', [
          {
            text : '확인',
            onPress : () => navigation.navigate('메인')
          }
        ])
     
    
        })
        .catch(function (error)
        {
          console.log(error);
          setId('로그인 실패! 다시 확인해주세요')
        })
      }
      else{
        Alert.alert('로그인 실패', '아이디와 비밀번호를 다시 확인해주세요.', [{text : '확인'}])
      }
    })
    .catch(function (response){
      console.log(response);
      Alert.alert('로그인 실패', '아이디와 비밀번호를 다시 확인해주세요.', [{text : '확인'}])
    })
  }

  return (
    <View style={styles.container}>

      <Header str = "로그인" width = "110"></Header>

      <View style = {{alignItems : "center", marginTop : "5%"}}>
        <View style = {{alignSelf : 'flex-start', flexDirection : 'row', marginLeft :'15%'}}>
          <AntDesign name="idcard" size={24} color="black" style = {{alignSelf : 'center'}}/>
          <Text style = {styles.buttonName}>아이디</Text>
        </View>
      
        <TextInput  style = {styles.input}
        placeholder='ID 입력 (이메일 형태로 부탁드릴게요)'
        onChangeText ={text => idSetter(text)}
        keyboardType = 'email-address'
        maxLength={25}
        value = {id}
        ></TextInput>

        <View style = {{alignSelf : 'flex-start', flexDirection : 'row', marginLeft :'15%'}}>
          <AntDesign name="lock1" size={24} color="black" style = {{alignSelf : 'center'}} />
          <Text style = {styles.buttonName} >비밀번호</Text>
        </View>
        <TextInput  style = {styles.input}
        placeholder='비밀번호 입력'
        onChangeText = {text => pwSetter(text)}
        keyboardType = 'email-address'
        maxLength={25}
        value = {password}
        ></TextInput>
      </View>

      <View style = {{...styles.buttonPos, flexDirection :'row'}}>
            <View style = {{alignSelf : 'center', marginRight : 10}}> 
            <SimpleLineIcons name = "login" size = {40} color = 'black' />
            </View>
            <TouchableOpacity onPress={() => validChecker()}>
                <Text style = {{...styles.button, fontFamily : 'IBMMe'}}>로그인</Text>
            </TouchableOpacity>
            
        </View>
        <View style = {{...styles.buttonPos, flexDirection :'row'}}>
            <View style = {{alignSelf : 'center', marginRight : 10}}> 
            <MaterialIcons name="accessibility-new" size={40} color="black" />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('회원가입1')}>
                    <Text style = {{...styles.button, fontFamily : 'IBMMe'}}>회원 가입</Text>
            </TouchableOpacity>
        </View>
        <View>
          <Text style = {{...styles.welcome, fontFamily : 'IBMMe'}}>
            어서오세요. 선생님.
          </Text>
          <Text style = {{fontSize : 20, textAlign : 'center', fontFamily : 'IBMMe'}}>
            좋은 하루 되시길 바랍니다.
          </Text>
        </View>
      <StatusBar style="auto" />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner : {
    marginTop : "20%",
  },
  bannerText : {
    marginLeft : "10%",
  },
  input : {
    borderWidth : 1,
    borderColor :"white",
    borderBottomColor : theme.mColor,
    width : "75%",
    fontSize : 18,
    height : 30,
    marginVertical : 10,
    marginBottom : 20,
  },
  button : {
    textAlign : 'center',
    textAlignVertical : 'center',
    borderWidth : 3,
    borderRadius : 10,
    borderColor : theme.mColor,
    width : 150,
    height : 60,
    color: "black",
    fontSize : 20,
    marginVertical : 5,
    fontFamily : 'IBMMe'
  },
  buttonPos : {
    marginLeft : '20%',
  },
  buttonName : {
    alignSelf : 'flex-start', marginLeft : 5, fontSize : 20, fontFamily : 'IBMMe'
  },
  welcome : {
    marginTop : 35,
    fontSize : 20,
    textAlign : 'center'
  }, 
});
