import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../shared/theme';
import Header from '../../shared/header';
import { useEffect, useState } from 'react';
import { WidthAndHeight } from '../../shared/Dimension';
import { MaterialIcons,  MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import MyPageIconHeader from '../../shared/MyPageIconHeader';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
const windowWidth = WidthAndHeight.windowWidth;
const windowHeight = WidthAndHeight.windowHeight;
export default function JobMain({navigation}) {
  const [jwt, setJWT] = useState(null);
  const [name, setName] = useState('');
  const [userStatus, setStatus] = useState(null);
  const [id, setId] = useState('');
  useEffect(() => {
    (async () => {
      AsyncStorage.getItem('user_jwt', (err, result) => { 
        setJWT(result);
        console.log('userjwt : ' + result);
      });
      AsyncStorage.getItem('user_id', (err, result) => { 
        setId(result);
        console.log('userid : ' + result);
      });
      AsyncStorage.getItem('user_name', (err, result) => { 
        setName(result);
        console.log('username : ' + result);
      });
    })();
   
  }, [])

  useEffect(() => {
    (async() => {
      if(id != "")
      {
        axios.get('https://prod.asherchiv.shop/app/users?user-id=' + id, {
        })
        .then(function (response){
          console.log(response.data.contents[0]);
          setStatus(response.data.contents[0].user_company_status)
          /*AsyncStorage.setItem('user_name', response.data.contents[0].user_name, () => {
            console.log('로그인 성공, name : ' + response.data.contents[0].user_name);
          });*/
        })
        console.log('로그인 성공. user status : ' + userStatus);
      }
    })();
   
  }, [name]);


  const moveForward = (val) => {
    console.log(val);
    if(userStatus == 0 && val == 0)
    {
      Alert.alert('지금 댁에 계신가요?', '댁에 계시다면, \n거주지 주소 기반으로 검색합니다.', [
        {
          text: '네',
          onPress: () => navigation.navigate('구인지도', {'mode' : 0}),
        },
        { text: '아니오.', 
        onPress: () => navigation.navigate('구인지도', {'mode' : 1}) },//실외 모드
      ])

    }
    else if(userStatus == 1 && val == 1)
    {
      navigation.navigate('공고등록')
    }
    else
    {
      Alert.alert('알림', '선생님은 해당 기능을 이용하실 수 없으세요.', [
      {
        text : '알겠어요.',
        onPress : () => console.log('유저 타입 미스매치')
      }
      ])
    }
   
  };

  return (
    <View style={styles.container}>
    <View style = {{position : 'absolute', top : '8%', right : '10%'}}>
      <TouchableOpacity onPress = {() => navigation.navigate('마이페이지')}>
        <View style = {{flexDirection : 'row'}}>
        <Text style = {{fontFamily : 'IBMMe', fontSize : 16, paddingTop : 8}}>어서오세요. {name}님</Text><MyPageIconHeader></MyPageIconHeader>
        </View>
      </TouchableOpacity>
    </View>
        
      <Header str = "구인구직 플랫폼" width = "240"></Header>
      <StatusBar style="auto" />
      <View style = {{flexDirection : 'row', alignSelf : 'center'}}>

        <TouchableOpacity onPress = {() => moveForward(0)}>
        <View style  = {{...styles.gridBox, }}>
            <View style = {{flexDirection : 'row'}}>
                <MaterialCommunityIcons name="shopping-search" size={45} color={theme.mColor} /><Text style  = {styles.textStyle}>구직자용</Text>
            </View>
            
            <Text style = {{fontSize : 20, marginVertical : 15, fontFamily : 'IBMMe'}}>
                구직정보 찾기
            </Text>
            <Text style  = {{fontSize : 17, marginTop : 5, fontFamily : 'IBMMe'}}>
            나에게 꼭 맞는{'\n'}맞춤형 구인정보
            </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => moveForward(1)}>
        <View style  = {{...styles.gridBox}} >
            <View style = {{flexDirection : 'row'}}>
                <MaterialIcons name="person-search" size={45} color={theme.mColor} /><Text style  = {styles.textStyle}>기업용</Text>
            </View>

            <Text style = {{fontSize : 20, marginVertical : 15, fontFamily : 'IBMMe'}}>
                구직정보 등록
            </Text>
            <Text style  = {{fontSize : 17, marginVertical : 5, fontFamily : 'IBMMe'}}>
            시니어 구인용{'\n'}구직정보 등록
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
  textStyle : {
      fontSize : 18,
      marginLeft : 3,
      marginVertical : '7%'
  }
});
