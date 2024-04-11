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
export default function JobInfo({route, navigation}) {
  const [title, setTitle] = useState();
  const [userStatus, setStatus] = useState(0);
  const [id, setId] = useState('');
  const [idx, setIdx] = useState(0);
  const [jwt, setJWT] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [pname, setPname] = useState('');
  const [pphone, setPphone] = useState('');
  const [content, setContent] = useState(null);

  const contentSetter = (val) => {
    setContent(val)
  }
  //eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWR4Ijo3LCJpYXQiOjE2NTEyMTY3MDAsImV4cCI6MTY1MjY4NzkyOX0.rnQE03ViJ_ar-nLJ1rHA2QkvO1ke8i3URh9O9yxf_lM
  useEffect(() => {
    setTitle(route.params.name);
    console.log('타이틀: '+ title);
    setIdx(route.params.idx);
    console.log('인덱스 : ' + idx);
    setStatus(route.params.status);
    console.log('스테이터스 : ' + userStatus);
   
  }, [title, idx, userStatus])

  useEffect(() => {
    (async() => {
      if(content!=null)
      {
        axios.get('https://prod.asherchiv.shop/app/users/' + content.job_publisher_idx)
        .then(function(response){
          console.log(response.data.contents.user_name);
          setPname(response.data.contents.user_name)
          setPphone(response.data.contents.user_phone)
        })

      }
    })();
  }, [content])

  useEffect(async() => {
    await AsyncStorage.getItem('user_id', (err, result) => { 
      setId(result);
      console.log('userid : ' + result);
    });
    await AsyncStorage.getItem('user_jwt', (err, result) => { 
      setJWT(result);
      console.log('userjwt : ' + result);
    });
    await AsyncStorage.getItem('user_name', (err, result) => { 
      setName(result);
      console.log('username : ' + result);
    });
    await AsyncStorage.getItem('user_phone', (err, result) => { 
      setPhone(result);
      console.log('userphone : ' + result);
    });
    /*await axios.get('https://prod.asherchiv.shop/app/users?user-id=' + id, {
    })
    .then(function (response){
      console.log('유저 정보 : ' + response.data.contents[0].user_company_status);
      setStatus(response.data.contents[0].user_company_status)
      
    })*/
    const config = {
      headers: { 'X-ACCESS-TOKEN': jwt }
  };
  axios.get('https://prod.asherchiv.shop/app/jobs/' + idx, config)
    .then(function (response){
      contentSetter(response.data.contents);
      console.log(content);
    })
    .catch(function (err){
      console.log(err);
    })
    
  }, [phone])

 useEffect(() => {
  console.log(content)
 }, [content])

  const leftArrow = () => {
    navigation.pop();
  }

  const makeDone = () => {
    axios.patch('https://prod.asherchiv.shop/app/jobs/' + idx)
    .then(function (response){
      console.log(response);
    })
    .catch(function (error){
      console.log(error)
    })
  }

  const moveToApplicants =  () => {
    axios.get('https://prod.asherchiv.shop/app/jobs/' + idx + '/applicants', {
      headers : {
        'X-ACCESS-TOKEN': jwt
      }
    })
    .then(function (response){
      console.log(response.data);
      console.log(title + " " + idx + ' ' + jwt)
      navigation.navigate('지원자목록', {'title' :  title, 'idx' : idx, 'jwt' : jwt})
    
    })
    .catch(function (error){
      console.log(error)
    })
  }


  return (
    <View style={styles.container}>
        <View style = {{
          flexDirection : 'row',
          top : '10%', marginBottom : 30, borderWidth : 1, borderColor :'white', borderBottomColor : theme.mColor, height : WidthAndHeight.windowHeight*0.08}}>
    
            <Text style = {{fontFamily : 'IBMMe', fontSize : 20, marginTop : '3%', paddingLeft : '5%'}}>상세 페이지</Text>
        </View>
        
        <View style = {{marginTop:'5%',marginLeft : '7%'}}>
            <Text style = {{fontSize : 25, fontFamily : 'IBMMe'}}>{title}</Text>
            
        </View>
        <View style ={{borderWidth : 3,  borderColor : theme.mColor}}></View>
      
        <SafeAreaView>
          <ScrollView style = {{height : WidthAndHeight.windowHeight*0.6, }}>
          <View style  = {{marginVertical : '3%', marginLeft : '7%'}}>
          <Text style = {{fontSize : 23, fontFamily : 'IBMMe'}}>근무 조건</Text>
            <View style= {{flexDirection : 'row', width : WidthAndHeight.windowWidth*0.9}}>
              <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 6}}/>
              <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}> 
                근무 시간 : {content != null ? content.job_working_time : ''}
              </Text>
            </View>        
            <View style= {{flexDirection : 'row', width : WidthAndHeight.windowWidth*0.9}}>
              <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 6}}/>
              <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}> 
                급여 : {content != null ? content.job_wage: ''}
              </Text>
            </View>
            <View style= {{flexDirection : 'row', width : WidthAndHeight.windowWidth*0.9}}>
              <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 6}}/>
              <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}> 
                근무지 : {content != null ? content.job_sinm: ''}
              </Text>
            </View>
            <View style= {{flexDirection : 'row', width : WidthAndHeight.windowWidth*0.9}}>
              <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 6}} />
              <Text style = {{fontSize : 18, fontFamily : 'IBMMe', width : WidthAndHeight.windowWidth*0.8}}> 
                근무 상세 : {content != null ? content.job_detail: ''}
              </Text>
            </View>
  
       
        </View>

        <View style  = {{marginVertical : '3%', marginLeft : '7%'}}>
          <Text style = {{fontSize : 23, fontFamily : 'IBMMe'}}>지원 조건</Text>
          <View style= {{flexDirection : 'row', width : WidthAndHeight.windowWidth*0.9}}>
              <Entypo name="dot-single" size={30} color="black"  style = {{paddingTop : 6}}/>
              <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}> 
                연령 : {content != null ? content.job_min_age + '세부터 ' + content.job_max_age + '세까지': ''}
              </Text>
            </View>
            <View style= {{flexDirection : 'row', width : WidthAndHeight.windowWidth*0.9}}>
              <Entypo name="dot-single" size={30} color="black"  style = {{paddingTop : 6}}/>
              <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}> 
                성별 : {content != null ? (content.job_gender == 0 ? '남자' : '여자' ): ''}
              </Text>
            </View>
            
        </View>

        <View style  = {{marginVertical : '3%', marginLeft : '7%'}}>
          <Text style = {{fontSize : 23, fontFamily : 'IBMMe'}}>부가 정보</Text>
          <View style= {{flexDirection : 'row', width : WidthAndHeight.windowWidth*0.9}}>
              <Entypo name="dot-single" size={30} color="black"  style = {{paddingTop : 6}}/>
              <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}> 
                담당자 : {pname != '' ? pname : ''} ( {phone != '' ? pphone : ''} )
              </Text>
            </View>
            <View style= {{flexDirection : 'row', width : WidthAndHeight.windowWidth*0.9}}>
              <Entypo name="dot-single" size={30} color="black"  style = {{paddingTop : 6}}/>
              <Text style = {{fontSize : 18, fontFamily : 'IBMMe'}}> 
                문의 방법 : 문자/전화
              </Text>
            </View>
      
        </View>
        
          </ScrollView>
        </SafeAreaView>
       <View style= {{ borderWidth : 3, borderColor : theme.mColor}}></View>
        
      <View style = {{flexDirection :'row',}}>
          <TouchableOpacity  style = {{marginTop : 20, marginLeft :'10%'}}>
        <Entypo name="arrow-with-circle-left" size={60} color={theme.mColor} onPress = {() => leftArrow()}/>
        </TouchableOpacity>

        <View style = {{
          width : WidthAndHeight.windowWidth*0.3,
          justifyContent :'center',
          marginLeft : '10%'
          }}>
            {userStatus == 0  ?  
            <TouchableOpacity style = {{
              backgroundColor : theme.mColor,
              borderRadius :4,
              alignItems : 'center',
              height : 40,
              justifyContent : 'center',
              marginTop : 15
              }}
             onPress = {() => navigation.navigate('이력서', {'name' : title, 'id' : id,'jwt' : jwt, 'idx' : idx})}
              >
                
                <Text style = {{fontSize : 15, color : 'white', fontSize : 16}}>
                  지원하기
                </Text>
            </TouchableOpacity>
            :
            <View>
               <TouchableOpacity style = {{
              backgroundColor : theme.mColor,
              borderRadius :4,
              alignItems : 'center',
              height : 40,
              justifyContent : 'center',
              marginTop : 15
              }}
             onPress = {() => moveToApplicants()}
              >
                
                <Text style = {{fontSize : 15, color : 'white', fontSize : 16}}>
                  지원자 확인
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{
              backgroundColor : theme.mColor,
              borderRadius :4,
              alignItems : 'center',
              height : 40,
              justifyContent : 'center',
              marginTop : 5
              }}
             onPress = {() => navigation.navigate('구인글수정', {'content' : content})}
              >
                
                <Text style = {{fontSize : 15, color : 'white', fontSize : 16}}>
                  글 수정/마감
                </Text>
            </TouchableOpacity>
            </View>
           
          }
           
        </View>
      
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
