import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../shared/theme';
import Header from '../../shared/header';
import React, {useState, useEffect} from 'react';
import Page1 from './Pages/page1';
import Page2 from './Pages/page2';
import Page3 from './Pages/page3';
import Page4 from './Pages/page4';
import Page5 from './Pages/page5';
import Page6 from './Pages/page6';
import  S_Page2 from './Seeker/S_Page2';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 

export default function SignUp({navigation}) {

  useEffect(() => {
    if(pageNum >= 7)//조건 추가 필요
    {
      console.log("page over!");
    }
  }, [pageNum]);
  
  const [pageNum, setPageNum] = useState(1);
  const [isSignedUp, setSignUp] = useState(false);
  const [userType, setUserType] = useState(0); //0 : 일반유저, 1 : 기업

  const numberSetter = (val)  => {
    setPageNum(val);
  };

  const increasePage = () => {
    var n = 1 + (pageNum);
    if(pageNum < 6)
    {
      setPageNum(n);
    }
    else{
      Alert.alert('알림', '선택지 중 하나를 골라주세요.', [{text : '알겠어요.'}])
    }
  };

  const decreasePage = () => {
    if(pageNum != 1)
    {
      setPageNum(pageNum-1)
    }
    else{
      navigation.pop();
    }
  }
  const switcher = () => {
    console.log(pageNum);
    switch (pageNum) {
      case 1 :
        return <Text><Page1/></Text>
      case 2 :
        return <Text><Page2 /></Text>
      case 3 :
        return <Text><Page3 /></Text>
      case 4 :
        return <Text><Page4 /></Text>
      case 5 :
        return <Text><Page5 /></Text>
      case 6 :
        return <Text><Page6 /></Text>
    }
  }
    
  
  return (
    <View style = {styles.container}>
      

      <Header str = "회원가입" width = "136"></Header>
      <View style = {{flexDirection : "row", marginLeft : '10%', marginTop : 10}}>
        <TouchableOpacity  >
          <MaterialCommunityIcons onPress = {() => numberSetter(1)} name="numeric-1-circle-outline" size={45} color="black" style = {{opacity : (pageNum === 1 ? 1 : 0.3)}}/>
        </TouchableOpacity>
        <TouchableOpacity  >
          <MaterialCommunityIcons onPress = {() => numberSetter(2)} name="numeric-2-circle-outline" size={45} color="black" style = {{opacity : (pageNum === 2 ? 1 : 0.3)}}/>
        </TouchableOpacity>
        <TouchableOpacity   >
          <MaterialCommunityIcons onPress = {() => numberSetter(3)} name="numeric-3-circle-outline" size={45} color="black" style = {{opacity : (pageNum === 3 ? 1 : 0.3)}}/>
        </TouchableOpacity>
        <TouchableOpacity  >
          <MaterialCommunityIcons onPress = {() => numberSetter(4)} name="numeric-4-circle-outline" size={45} color="black" style = {{opacity : (pageNum === 4 ? 1 : 0.3)}}/>
        </TouchableOpacity>
        <TouchableOpacity >
          <MaterialCommunityIcons  onPress = {() => numberSetter(5)} name="numeric-5-circle-outline" size={45} color="black" style = {{opacity : (pageNum === 5 ? 1 : 0.3)}}/>
        </TouchableOpacity>
        <TouchableOpacity >
          <MaterialCommunityIcons  onPress = {() => numberSetter(6)} name="numeric-6-circle-outline" size={45} color="black" style = {{opacity : (pageNum === 6 ? 1 : 0.3)}}/>
        </TouchableOpacity>
      </View>

      <View style = {{...styles.container, width : '60%', marginLeft : '10%', marginTop : '5%'}}>
        <Text style = {{alignSelf :'center', textAlign : 'left'}}>
          {switcher()}
        </Text>

      </View>
      <View style = {{flexDirection : "row", position :'absolute', bottom: '3%', right : '5%', alignSelf : 'center'}}>

      <TouchableOpacity >
        <Entypo name="arrow-with-circle-left" size={70} color={theme.mColor} onPress = {decreasePage}/>
      </TouchableOpacity>

      <TouchableOpacity>
      <Entypo name="arrow-with-circle-right" size={70} color={theme.mColor} onPress = {increasePage}/>
      </TouchableOpacity>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width : '100%',
  },
});
