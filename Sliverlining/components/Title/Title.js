import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../shared/theme';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AppLoading from 'expo-app-loading'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimpleLineIcons, AntDesign, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
export default function Title({route, navigation}) {
  const [isLoadingReady, setIsReady] = useState(false);
  const [token, setJwt] = useState(false);
  const isFocused = useIsFocused();
  const loadJWT = async () => {
    await AsyncStorage.getItem('user_jwt', (err, jwt) => { //구인
      if(jwt != null && jwt != undefined && jwt != '')
      {
        console.log(jwt)
        setJwt(jwt)
      }
  
    });

    console.log("로딩 완료");
    console.log('토큰 : ' + token)
  }

  useEffect(()=>{
    console.log(token);
  }, [isFocused])

  useEffect(() => {
    if(route.params != undefined)
    {
      console.log(route.params.state)
      route.params = undefined;
      Alert.alert('회원가입 완료', '로그인 후 메인 페이지에서 서비스를 이용할 수 있습니다.')
      
    }
    else{
      console.log('route없음')
    }
   
    loadJWT();
  }, [isFocused])

  const deleteLocalStorage = () => {
    AsyncStorage.setItem('user_jwt', '', () => {
      setJwt('');
      });
    AsyncStorage.setItem('user_name', '', () => {
      console.log('로컬 스토리지 user_name 삭제')
    });
    AsyncStorage.setItem('user_id', '', () => {
      console.log('로컬 스토리지 user_id 삭제')
    });
    AsyncStorage.setItem('u_idx', '', () => {
      console.log('로컬 스토리지 u_idx 삭제')
    });
    Alert.alert('로그아웃 완료', '성공적으로 로그아웃 되었습니다!')
  }
/*
  const onFinish = () => {
    setIsReady(true);
  }

  if(!isLoadingReady)
  {
    return (
      <AppLoading 
      startAsync = {loadFont}
      onError = {console.warn}
      onFinish = {onFinish}/>
    )
  }*/
 
  
  /*
  useEffect(() => {
    AsyncStorage.getItem('user_jwt', (err, jwt) => { //구인
      if(jwt != null && jwt != undefined && jwt == '')
      {
        setJwt(jwt)
      }
      console.log(jwt)
    });
  }, [jwt])
  */
  return (
    <View style = {{...styles.container, paddingBottom : '10%'}}>
        <View style = {{...styles.title, alignSelf : 'center',}} >
            <Text style = {{fontSize:50, color : "black", fontFamily : 'Sans'}}>SilverLining</Text>
            <Text style = {{fontFamily : 'IBMMe', fontSize : 14, color : 'black'}}>통합형 시니어 자립 케어 플랫폼</Text>
        </View>
       

        <View style = {{alignItems : 'flex-start', marginVertical : '10%', marginLeft :'20%'}}>
          <View style = {{flexDirection : 'row'}}>
          <AntDesign name="login" size={50} color="black" style = {{alignSelf : 'center'}}/>
            {
            token == '' ?  
            <TouchableOpacity style={{marginLeft : 5}} onPress={() => navigation.navigate('로그인')}>
              <Text style = {{...styles.button, fontFamily : 'IBMMe'}}>로그인</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{marginLeft : 5}} onPress={() => { 
              Alert.alert('알림', '로그아웃 하시겠어요?', [{
                text : '로그아웃',
                onPress : () => { deleteLocalStorage() }
              },
              {
                text : '아니오',
                style : 'cancel'
              }
              ])
            }}>
              <Text style = {{...styles.button, fontFamily : 'IBMMe'}}>로그아웃</Text>
            </TouchableOpacity>
            }

          </View>
          {token == '' ? 
          <View style = {{flexDirection : 'row'}}>
          <AntDesign name="solution1" size={50} color="black" style = {{alignSelf : 'center'}} />
            <TouchableOpacity style={{marginLeft : 5}} onPress={() => navigation.navigate('회원가입1')}>
                <Text style = {{...styles.button, fontFamily : 'IBMMe'}}>회원가입</Text>
            </TouchableOpacity>
          </View>
          :
          <View style = {{flexDirection : 'row'}}>
          <AntDesign name="solution1" size={50} color="black" style = {{alignSelf : 'center'}} />
            <TouchableOpacity style={{marginLeft : 5}} onPress={() => navigation.navigate('마이페이지')}>
                <Text style = {{...styles.button, fontFamily : 'IBMMe'}}>마이페이지</Text>
            </TouchableOpacity>
          </View>
          }
          
          <View style = {{flexDirection : 'row'}}>
          <MaterialCommunityIcons name="content-paste" size={50} color="black" style = {{alignSelf : 'center'}}/>
            <TouchableOpacity style={{marginLeft : 5}} onPress={() => 
              {
                if(token =='')
                {
                  Alert.alert('알림', '로그인 하지 않으시면\n많은 기능이 제한됩니다.', [
                    {
                      text : '메인 페이지 이동',
                      onPress : () => navigation.navigate('메인')
                    },
                    {
                      text : '취소',
                      
                    }
                  ])
                }
                else{
                  navigation.navigate('메인')
                }
              }}>
                <Text style = {{...styles.button, fontFamily : 'IBMMe'}}>메인 페이지</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style  = {styles.description}>
            <Text style = {{fontFamily : 'IBMMe', fontSize : 14, color : 'black'}}>이종혁, 이지율, 임유한</Text>
            <Text style = {{fontFamily : 'IBMMe', fontSize : 14, color : 'black'}}>컴퓨터공학종합설계 001 / 1팀</Text>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex : 1,
      backgroundColor : 'white',
  },
  title : {
    borderWidth : 2,
    borderColor : "white",
    borderBottomColor : theme.mColor,
    marginTop : "45%",
    marginBottom : 5,
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
  },
  description : {
      padding : 10,
      width : '80%',
      borderWidth : 1,
      borderColor : 'white',
      borderTopColor : theme.mColor,
      borderBottomColor : theme.mColor,
      alignItems : 'center',
      alignSelf : 'center',
  }
});
