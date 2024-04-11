import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Header from '../../shared/header'
import Arrow from '../../shared/Arrow'
import { theme } from '../../shared/theme';
import { Entypo, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import MyPageIconHeader from '../../shared/MyPageIconHeader';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'
import { WidthAndHeight } from '../../shared/Dimension';
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

export default function Home({navigation}) {
  const [jwt, setJWT] = useState('');
  const isFocused = useIsFocused();
  useEffect(() => {
    AsyncStorage.getItem('user_jwt', (err, result) => { 
      setJWT(result);
      console.log('userjwt : ' + result);
    });
  }, [jwt, isFocused])
  const naviLeft = () => {
    navigation.navigate('Title', {'user_jwt' : jwt});
  }
  const naviRight = () => {
    
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Header str = "기능 선택" width = "200" style = {{fontSize : 30}}></Header>
      
      <View style = {{position : 'absolute', top : '8%', right : '10%', flexDirection : 'row'}}>
      <TouchableOpacity onPress = {() => 
        {
          if(jwt != null)
          {
            navigation.navigate('마이페이지')
          }
          else
          {
            Alert.alert('알림', '로그인이 필요합니다.', [{text : '확인'}])
          }
        }
       }>
        <Ionicons name="person-circle-outline" size={80} color={theme.mColor}/>
        <Text style = {{fontFamily : "IBMMe", marginLeft :5}}>{jwt == null ? '로그인 필요' : '  나의 정보'}</Text>
      </TouchableOpacity>
      </View>
      
      <Text style = {{marginLeft : '10%', fontFamily : 'IBMMe'}}>당신의 자립을 돕습니다.</Text>

      <View style = {{marginTop : 10, alignItems : 'center', }}>
        <View style = {{flexDirection : 'row'}}>
        <TouchableOpacity onPress = {() => navigation.navigate('구인메인')}>
          <View style = {styles.gridBox}>
            <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}>구인구직</Text>
            <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}>플랫폼</Text>
            <Entypo name="briefcase" size={45} color="black" style = {styles.iconPos}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => navigation.navigate('복지메인')}>
          <View style = {styles.gridBox}>
            <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}>주변 병원 &</Text>
            <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}>복지시설 찾기</Text>
            <FontAwesome5 name="hospital-user" size={45} color="black" style = {styles.iconPos}/>
          </View>
        </TouchableOpacity>
        </View>
       
        <View style = {{flexDirection : 'row'}}>
        <TouchableOpacity onPress = {() => navigation.navigate('정책메인')}>
          <View style = {styles.gridBox}>
            <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}>맞춤형 정책 &</Text>
            <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}>지원사업</Text>
            <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}>알리미</Text>
            <MaterialIcons name="policy" size={45} color="black" style = {styles.iconPos}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('관계단절메인')}>
          <View style = {styles.gridBox}>
          <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}>주변 친구와</Text>
          <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}>알림 주고 받기</Text>
          <MaterialCommunityIcons name="phone-message" size={45} color="black" style = {styles.iconPos}/>
          </View>
        </TouchableOpacity>
        </View>
      </View>
       <View style = {{borderBottomWidth : 3, marginTop : 7,borderBottomColor : 'silver', width : WidthAndHeight.windowWidth*0.5, alignSelf : 'center'}}>
         
       </View>
      <View style = {{alignSelf : 'center', position : 'absolute', bottom : '5%'}}>
      <Arrow leftArrow = {naviLeft} rightArrow = {naviRight}></Arrow>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridBox : {
    borderWidth : 2,
    borderColor : theme.mColor,
    borderRadius : 10,
    backgroundColor : 'white',
    width : chartWidth/2.7,
    height : chartWidth/2.7,
    margin : 8,
    padding : 7
  },
  iconPos : {
    alignSelf : 'flex-end', 
    position : 'absolute', 
    bottom : '5%', 
    right : '5%'
  }
});
