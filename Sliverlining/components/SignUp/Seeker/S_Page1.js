import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { theme } from '../../../shared/theme';
import Header from '../../../shared/header';
import React, {useState, useEffect} from 'react';
import { Entypo } from '@expo/vector-icons'; 
import Arrow from '../../../shared/Arrow';
import { useNavigation } from '@react-navigation/native';
import { WidthAndHeight } from '../../../shared/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function S_Page1({navigation}) {
  useEffect(() => {
    AsyncStorage.getItem('su_disease', (err, result) => { //user_id에 담긴 아이디 불러오기
      if(result == undefined || result == '' || result == null)
      {
        console.log('아직 정의되지 않음'); // result에 담김 //불러온거 출력
      }
      else
      {
        console.log(result + '으로 정의됨')
      }
    });
  }, [])

  const [clicked, setClicked] = useState([false, false, false, false, false, 
    false, false, false, false, false, 
    false, false, false, false, false,
    false, false, false, false, false])

  const leftButton = () => {
    navigation.pop();
  }
  const rightButton = () => {
    navigation.navigate('보호자번호');
  }

  const setDisease = (idx) => {
    let copyArray = [...clicked];
    if(!copyArray[idx])
    {
      copyArray[idx] = true;
    }
    else{
      copyArray[idx] = false;
    }
    
    setClicked(copyArray);
    console.log(copyArray);
  }

  const uploadDisease = () => {
    let data = "";
    console.log(data);
   
    for (var i = 1; i<clicked.length; i++)
    {
      if(clicked[i])
        data = data + i + " ";
    }
    
    console.log('합쳐진 데이터 : ' + data);

    AsyncStorage.setItem('su_disease', data, () => {
      console.log('질병 선택 상태 : ' + data + '\n\n');
    });   // 저장하는 법

  }
  return (
    <View style = {styles.container}>
      <Header str = "회원가입" width = "136"></Header>
      <View style = {{left : '10%'}}>
      <Text style  = {{fontSize : 20, marginBottom : 10, fontFamily : 'IBMMe'}}>7단계 - 일반이용자 정보입력</Text>

        <View style = {{ width : windowWidth*0.82, borderWidth : 1, borderColor : 'white', borderBottomColor : 'black'}}>
          <Text style = {{fontSize : 20, fontFamily : 'IBMMe'}}>혹시 평소 앓고 계신 질환이 있으세요?</Text>
        </View>
        <Text style = {{fontSize : 15, fontFamily : 'IBMMe'}}>그러시다면, 밑의 선택지를 체크해주세요!</Text>
      </View>

    <View style = {{alignSelf : 'center', height : WidthAndHeight.windowHeight*0.28, marginTop : 15}}>
    <SafeAreaView>
        <ScrollView style = {{height : WidthAndHeight.windowHeight*0.43, paddingBottom : 15, paddingLeft :5, borderWidth : 1, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.8}}>
          <View style = {styles.gridMargin}>
          <Button title = "고혈압" color = {clicked[1] ? 'gray' : theme.mColor} onPress = {() => setDisease(1)}></Button><Text>{"\t"}</Text>
          <Button title = "류마티스/관절염"  color = {clicked[2] ? 'gray' : theme.mColor} onPress = {() => setDisease(2) } > </Button><Text>{"\t"}</Text>
          <Button title = "폐질환"  color = {clicked[3] ? 'gray' : theme.mColor} onPress = {() =>setDisease(3)} ></Button><Text>{"\t"}</Text>
          
          </View>
          <View style = {styles.gridMargin}>
          <Button title = "신장질환" color = {clicked[4] ? 'gray' : theme.mColor} onPress = {() => setDisease(4)} ></Button><Text>{"\t"}</Text>
          <Button title = "간질환"  color = {clicked[5] ? 'gray' : theme.mColor} onPress = {() => setDisease(5)} ></Button><Text>{"\t"}</Text>
          <Button title = "당뇨병"  color = {clicked[6] ? 'gray' : theme.mColor} onPress = {() => setDisease(6)} > </Button><Text>{"\t"}</Text>
          </View>

         
          <View style = {styles.gridMargin}>
          <Button title = "노안/백내장"  color = {clicked[7] ? 'gray' : theme.mColor} onPress = {() => setDisease(7)} ></Button><Text>{"\t"}</Text>
          <Button title = "소화기 질환"  color = {clicked[8] ? 'gray' : theme.mColor} onPress = {() => setDisease(8)}></Button><Text>{"\t"}</Text>
          <Button title = "난청" color = {clicked[9] ? 'gray' : theme.mColor} onPress = {() => setDisease(9)} ></Button><Text>{"\t"}</Text>
          </View>
       

          <View style = {styles.gridMargin}>
        
          <Button title = "보행장애"  color = {clicked[10] ? 'gray' : theme.mColor} onPress = {() => setDisease(10)} > </Button><Text>{"\t"}</Text>
          <Button title = "암"  color = {clicked[11] ? 'gray' : theme.mColor}onPress = {() => setDisease(11)} ></Button><Text>{"\t"}</Text>
          <Button title = "치매/알츠하이머"  color = {clicked[12] ? 'gray' : theme.mColor} onPress = {() => setDisease(12)} ></Button>
         </View>
         <View style = {styles.gridMargin}>
          <Button title = "피부질환"  color = {clicked[13] ? 'gray' : theme.mColor}onPress = {() => setDisease(13)} ></Button><Text>{"\t"}</Text>
          <Button title = "치아질환"  color = {clicked[14] ? 'gray' : theme.mColor}onPress = {() => setDisease(14)} ></Button><Text>{"\t"}</Text>
          <Button title = "심혈관질환"  color = {clicked[15] ? 'gray' : theme.mColor}onPress = {() => setDisease(15)} ></Button><Text>{"\t"}</Text>
          <Button title = "뇌질환"  color = {clicked[16] ? 'gray' : theme.mColor}onPress = {() => setDisease(16)} ></Button>
         </View>

        </ScrollView>
        </SafeAreaView>
    </View>
      <TouchableOpacity title = '저장' onPress={() => uploadDisease()} style = {{
        backgroundColor : theme.mColor, width : WidthAndHeight.windowWidth*0.3,
        height : WidthAndHeight.windowHeight*0.06, alignSelf : 'center', marginTop : '3%'
      , borderWidth : 1, borderColor :theme.mColor, borderRadius : 4}}>
        <Text style = {{fontFamily : 'IBMMe', fontSize : 20, textAlign : 'center', color : 'white'}}>저장</Text>
      </TouchableOpacity>
        <Text style = {{alignSelf : 'center', fontFamily : 'IBMMe'}}>저장 버튼을 잊지 마세요!</Text>
      <View style = {{alignSelf : 'center', position : 'absolute', bottom : '1.5%'}}>
        <Arrow leftArrow = {leftButton} rightArrow = {rightButton}></Arrow>
      </View>
        
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gridMargin : {
    flexDirection : 'row', 
    marginVertical : 5
  }
});
