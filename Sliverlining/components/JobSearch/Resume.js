import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import {useState, useEffect} from 'react';
import { WidthAndHeight } from '../../shared/Dimension';
import { theme } from '../../shared/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Resume({route, navigation}) {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [jobidx, setJobidx] = useState(0);
  const [jwt, setjwt] = useState('');

  const [data, setData] = useState({});

  useEffect(() => { 
    setTitle(route.params.name)
    let pid = route.params.id;
    setId(pid);
    console.log(id)
    setJobidx(route.params.idx)
    setjwt(route.params.jwt)
    console.log('index : ' + route.params.idx)
    console.log('jwt : ' + route.params.jwt)
    axios.get('https://prod.asherchiv.shop/app/users?user-id=' + id)
    .then(function (response){
      console.log(response.data.contents[0]);
      setData(response.data.contents[0]);
      console.log(data);
     
    })
    .catch(function (err){
      console.log(err);
    })     
  }, [id])

  useEffect(() => {
    console.log(data);
  }, [data, id])

  const SubmitCompo = () => {
   
    console.log('jobidx : ' + jobidx)
    console.log('jwt : ' + jwt);


    axios.post('https://prod.asherchiv.shop/app/jobs/13/application', {}, {headers : {'X-ACCESS-TOKEN' : jwt}})
    .then(function (response){
      if(response.data.code == 2031)
      {
        Alert.alert('알림', '이미 제출되었습니다! 지원을 취소하시겠어요?', [
          {
            text : '지원 취소',
            onPress : () => {
              console.log('still in development')
              navigation.navigate('구인메인')
            } 
          },
          {
            text : '지원 유지',
            onPress : () => navigation.navigate('구인메인')
          }
        ])
      }
      else{
        Alert.alert('알림', '제출 완료!', [
          {
            text : '확인',
            onPress : () => navigation.navigate('구인메인')
          }
        ])
      }
    }).catch(function (error){
      Alert.alert('알림', '오류!', [
        {
          text : '오류가 발생했어요!'
        }
      ])
    })
 
  }

  const Submit = () => {
    Alert.alert('알림', '제출하시겠어요?', [
      {
        text: '제출할래요!',
        onPress : () => SubmitCompo()
   

      },
      {
        text: '제출하지 않을래요',
        onPress: () => console.log('제출안함'),
      },
    ]);
    //navigation.navigation('구인상세');
  }
  return (
    <View style={styles.container}>
     
    <Text style = {{fontFamily : 'Sans', fontSize : 28, marginLeft : '10%'}}>
      Silverlining
    </Text>
    <Text style  = {{fontSize : 15, fontFamily : 'IBMMe', marginLeft : '10%'}}>{title ? title : ''}에 지원하고 계십니다.</Text>
    <Text style = {{fontSize : 20, fontFamily : 'IBMMe', marginLeft : '10%'}}>
      {data.user_name ? data.user_name : ''}님의 이력서
    </Text>
    <View style = {{
      marginLeft : '10%',
      width : WidthAndHeight.windowWidth*0.8,
      height : WidthAndHeight.windowHeight*0.5, 
      borderRadius :5, 
      backgroundColor : '#EFF1F7',
    
      justifyContent : 'center'
      }}>
      <View style ={{marginLeft : '10%'}}>
        <View style = {{flexDirection : 'row', }}>
          <View style = {{flexDirection : 'column'}}>
          <Text style = {{fontSize : 16, color : 'black', fontFamily : 'IBMMe'}}>
          이름 : {data.user_name != null ? data.user_name : ''}
        </Text>
        <Text style = {{fontSize : 16, color : 'black',  fontFamily : 'IBMMe'}}>
          생년월일 : {data.user_birth ? data.user_birth : ''}
        </Text>
        <Text style = {{fontSize : 16, color : 'black',  fontFamily : 'IBMMe'}}>
        성별 : {data.user_gender == 0 ? '남자' : '여자'}
        </Text>
          </View>
     
          <Image
          style = {{...styles.stretch, borderWidth : 2, borderRadius : 5, marginLeft : '5%', top : -10}}
          ></Image>
        </View>
      <View style = {{
        width : WidthAndHeight.windowWidth*0.65,
        borderWidth : 3,
        borderColor : '#EFF1F7',
        borderBottomColor : 'white'}}></View>


        <Text style = {{fontSize : 15, color : 'black', marginTop : '5%',  fontFamily : 'IBMMe'}}>
        휴대폰 번호 : {data.user_phone != null ?  data.user_phone : ''}
        </Text>
        <Text style = {{fontSize : 15, color : 'black',  fontFamily : 'IBMMe'}}>
        운전 가능 여부 : {data.user_drive == 0 ? '불가' : '가능'}
        </Text>
        <Text style = {{fontSize : 15, color : 'black', fontFamily : 'IBMMe' }}>
        관심 분야/직무 경험 :  {data.user_experience ? data.user_experience : '없음'}
        </Text>
        <Text style = {{fontSize : 15, color : 'black', fontFamily : 'IBMMe' }}>
        추가 사항 : {data.user_detailNm ?  data.user_detailNm :  '없음'} 
        </Text>
      </View>
  
    </View>
    <TouchableOpacity style = {{
    justifyContent : 'center',
     alignSelf : 'center', 
     marginTop : '3%'}}
     onPress = {() => Submit()}
     >
       <View 
       style= 
       {{borderWidth : 1,
        borderRadius : 4,
        borderColor : theme.mColor,
        padding : 15,
        }}
        
        >
       <Text style = {{fontFamily : 'IBMMe', fontSize : 25}}>이력서 제출</Text>
       </View>
      
     </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent : 'center',

  },
  stretch: {
    width: 100,
    height: 100,
    
    resizeMode: 'stretch',
  },
});
