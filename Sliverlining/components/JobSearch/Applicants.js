import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView,TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons,  MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import MyPageIconHeader from '../../shared/MyPageIconHeader';
import { theme } from '../../shared/theme';
import { WidthAndHeight } from '../../shared/Dimension';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
export default function Applicants({route, navigation}) {
  const [title, setTitle] = useState();
  const [id, setId] = useState('');
  const [idx, setIdx] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [jwt, setJWT] = useState('');
  const [content, setContent] = useState(null);

  //eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWR4Ijo3LCJpYXQiOjE2NTEyMTY3MDAsImV4cCI6MTY1MjY4NzkyOX0.rnQE03ViJ_ar-nLJ1rHA2QkvO1ke8i3URh9O9yxf_lM
  useEffect(() => {
    setTitle(route.params.title);
    console.log('타이틀: '+ title);
    setIdx(route.params.idx);
    console.log('인덱스 : ' + idx); //job idx
 
    setJWT(route.params.jwt)
    getJobList()
  }, [title, idx])

  const leftArrow = () => {
    navigation.pop();
  }

  const getJobList =  () => {
    axios.get('https://prod.asherchiv.shop/app/jobs/' + idx + '/applicants', {
      headers : {
        'X-ACCESS-TOKEN': jwt
      }
    })
    .then(function (response){
      console.log(response.data.contents);
      setContent(response.data.contents)
    })
    .catch(function (error){
      console.log(error)
    })
  }

  //props의 id와 title을 이용, 데이터를 불러옴, id부분은 데이터 베이스 연동이 안되어 아직 실행 못함
  return (
    <View style={styles.container}>
        <View style = {{top : '5%', marginBottom : 30, borderWidth : 1, borderColor :'white', borderBottomColor : theme.mColor, height : WidthAndHeight.windowHeight*0.08}}>
            <View style = {{position : 'absolute', right : '5%',}}><MyPageIconHeader /></View>
            <Text style = {{fontFamily : 'IBMMe', fontSize : 20, marginTop : '3%', paddingLeft : '5%'}}>상세 페이지</Text>
        </View>
        
        <View style = {{marginTop:'5%',marginLeft : '7%'}}>
            <Text style = {{fontSize : 25, fontFamily : 'IBMMe'}}>지원자 확인 : {title}</Text>
            
        </View>
        <View style ={{borderWidth : 3,  borderColor : theme.mColor}}></View>
      
        <SafeAreaView>
          <ScrollView style = {{height : WidthAndHeight.windowHeight*0.60, width : WidthAndHeight.windowWidth*0.95}}>
          <View style  = {{marginVertical : '3%', marginLeft : '7%'}}>
            {content ? content.map((info) => 
                <View key = {info.user_phone}>
                    <Text style = {{fontSize : 24, fontFamily : 'IBMMe'}}>지원자 정보</Text>
                    <View style= {{flexDirection : 'row'}}>
                    <Entypo name="dot-single" size={30} color="black" />
                    <Text style = {{fontSize : 19, fontFamily : 'IBMMe'}}> 
                        지원자 이름 : {content != null ? info.user_name : ''}
                    </Text>
                    </View>
                    <View style= {{flexDirection : 'row'}}>
                    <Entypo name="dot-single" size={30} color="black" />
                    <Text style = {{fontSize : 19, fontFamily : 'IBMMe'}}> 
                        전화번호 : {content != null ? info.user_phone: ''}
                    </Text>
                    </View>
                    <View style= {{flexDirection : 'row'}}>
                    <Entypo name="dot-single" size={30} color="black" />
                    <Text style = {{fontSize : 19, fontFamily : 'IBMMe'}}> 
                        생년월일 : {content != null ? info.user_birth: ''}
                    </Text>
                    </View>
                    <View style= {{flexDirection : 'row'}}>
                    <Entypo name="dot-single" size={30} color="black" />
                    <Text style = {{fontSize : 19, fontFamily : 'IBMMe'}}> 
                        성별 : {content != null ? info.user_gender: ''}
                    </Text>
                    </View>
                    <View style= {{flexDirection : 'row'}}>
                    <Entypo name="dot-single" size={30} color="black" />
                    <Text style = {{fontSize : 19, fontFamily : 'IBMMe'}}> 
                    경력 계열 : {content != null ? info.user_job_cate_list.toString() : ''}
                    </Text>
             
                       
                    </View>
                    <View style= {{flexDirection : 'row'}}>
                    <Entypo name="dot-single" size={30} color="black" />
                    <Text style = {{fontSize : 19, fontFamily : 'IBMMe'}}> 
                        경력 정보 : {content != null ? info.user_exprience: ''}
                    </Text>
                    </View>
                </View>
            )
            :
            content
            }
            
           
        </View>

          </ScrollView>
        </SafeAreaView>
       <View style= {{ borderWidth : 3, borderColor : theme.mColor}}></View>
        
      <View style = {{}}>
        <TouchableOpacity  style = {{marginLeft : '40%', marginTop : 10, width : WidthAndHeight.windowWidth*0.9}}>
            <Entypo name="arrow-with-circle-left" size={80} color={theme.mColor} onPress = {() => leftArrow()}/>
        </TouchableOpacity>
      
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
});
