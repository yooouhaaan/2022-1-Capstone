import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { theme } from '../../shared/theme';
import Header from '../../shared/header';
import React, {useState} from 'react';

export default function SignedUp({navigation}) {
  const [pageNum, setPageNum] = useState(false);
  
  return (
    <View style = {styles.container}>
        <View  style = {styles.complete}>
            <Text style= {{fontSize : 50}}>회원가입 완료!</Text>
            <Text style = {{textAlign : 'center'}}>환영합니다.</Text>
        </View>
        <Button title = "메인 페이지" color = {theme.mColor} onPress={() => navigation.navigate('메인')}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems :'center'
  },
  complete : {
      alignSelf : 'center',
      fontSize : 50,
      top : '50%',
  },
});
