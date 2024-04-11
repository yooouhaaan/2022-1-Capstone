import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, Alert,
  SafeAreaView,TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons,  MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import MyPageIconHeader from '../../shared/MyPageIconHeader';
import { theme } from '../../shared/theme';
import { WidthAndHeight } from '../../shared/Dimension';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

export default function PolicyInfo({route, navigation}) {
  const [title, setTitle] = useState('');
  const [idx, setIdx] = useState(null);
  const [uidx, setUidx] = useState(null);
  const [content, setContents] = useState(null);
  const [jwt, setJWT] = useState(null);
  const [curLidx,setCurLidx] = useState(null);//cur liked idx
  const [policy_liked_idx, setPliked] = useState(null);
  const [likedList, setLikedList] = useState([]);
  useEffect(() => {
    (async () => {
      setTitle(route.params.title);
      setIdx(route.params.idx)
      setJWT(route.params.jwt)
      console.log(title);
      console.log(idx);
      console.log(jwt);
    })();
  }, [])

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem('u_idx', (err, result) => { 
        setUidx(result);
        console.log('uidx : ' + uidx);
      });
    })();
  }, [])

  useEffect(() => {
    console.log(content);
    console.log(jwt);
    console.log(uidx);
    (async() => {
      if(uidx != null && jwt != null && content != null)
      {
        axios.get('https://prod.asherchiv.shop/app/policies/liked-list?user-idx=' + uidx,
        {
          headers: { 'X-ACCESS-TOKEN': jwt }         
        },
        {
          'user-idx' : uidx
        }
        )
        .then(function (response){
          console.log(response.data.contents);
          let res = response.data.contents;
          for(let i = 0; i<res.length; i++)
          {
            if(res[i].policy_idx == content.policy_idx)
            {
              setPliked(res[i].policy_liked_idx);
              console.log('plikedidx: ' +policy_liked_idx);
              break;
            }
          }
        
        })
        .catch(function (error){
          console.log(error);
          
        })
      
      }
    })();
   
  }, [content, uidx, jwt])

  useEffect(() => {
    (async () => {
      if(jwt != null && idx != null)
      {
        const config = {
          headers: { 'X-ACCESS-TOKEN': jwt }
        };
        axios.get('https://prod.asherchiv.shop/app/policies/' + idx, config)
        .then(function (response){
          console.log("content : " + response.data.contents[0])
          setContents(response.data.contents);
        })
        .catch(function (error){
          console.log(error);
        })

      }
    })();
    
  }, [idx, jwt])

  const leftArrow = () => {
    navigation.pop();
  }
  //props의 id와 title을 이용, 데이터를 불러옴, id부분은 데이터 베이스 연동이 안되어 아직 실행 못함
  return (
    <View style={styles.container}>
   
        <View  style = {{top : '5%', marginBottom : 30, borderWidth : 1, borderColor :'white', borderBottomColor : theme.mColor, height : WidthAndHeight.windowHeight*0.08}}>
         
        <Text style = {{fontFamily : 'IBMMe', fontSize : 20, marginTop : '3%', paddingLeft : '5%'}}>상세 페이지</Text>
        
        <TouchableOpacity style = {{position : 'absolute', right : '5%', flexDirection : 'row'}} onPress={() => navigation.navigate('마이페이지')}>
            <Text style = {{paddingTop : 12, fontFamily : 'IBMMe'}}>마이페이지
            </Text>
            <MyPageIconHeader />
          </TouchableOpacity>
        </View>
     
        
        <View style = {{marginTop : '3%', marginLeft : '7%', flexDirection : 'row'}}>
            <Text style = {{fontSize : 23, fontFamily : 'IBMMe'}}>{title}</Text>            
        </View>
        <View style ={{borderWidth : 3,  borderColor : theme.mColor}}></View>
      
        <SafeAreaView>
          <ScrollView style = {{height : WidthAndHeight.windowHeight*0.4,}}>
          <View style  = {{marginVertical : '3%', marginLeft : '7%'}}>
          <Text style = {{fontSize : 27, fontFamily : 'IBMMe'}}>신청 대상</Text>
            <View style= {{flexDirection : 'row'}}>
              <View style= {{paddingTop : 10}}>
              <Entypo name="dot-single" size={30} color="black" />
              </View>
          
              <Text style = {{fontSize : 22, width : WidthAndHeight.windowWidth*0.8, fontFamily : 'IBMMe'}}> 
              {content != null ? content.applicant_subject : "불러오는 중..."}
              </Text>
            </View>       
        </View>

        <View style  = {{marginVertical : '3%', marginLeft : '7%'}}>
        <Text style = {{fontSize : 27, fontFamily : 'IBMMe'}}>주관 기관</Text>
            <View style= {{flexDirection : 'row'}}>
            <View style= {{paddingTop : 10}}>
              <Entypo name="dot-single" size={30} color="black" />
              </View>
              <Text style = {{fontSize : 22, width : WidthAndHeight.windowWidth*0.8, fontFamily : 'IBMMe'}}> 
              {content != null ? content.policy_operation : "불러오는 중..."}
              </Text>
            </View>       
        </View>

        <View style  = {{marginVertical : '3%', marginLeft : '7%'}}>
        <Text style = {{fontSize : 27, fontFamily : 'IBMMe'}}>지원 방법</Text>
          <View style= {{flexDirection : 'row'}}>
          <View style= {{paddingTop : 10}}>
              <Entypo name="dot-single" size={30} color="black" />
              </View>
              <Text style = {{fontSize : 22, width : WidthAndHeight.windowWidth*0.8, fontFamily : 'IBMMe'}}> 
              {content != null ? '현장 지원 : ' + content.policy_apply_method : "불러오는 중..."}
              </Text>
            </View>   
            <View style= {{flexDirection : 'row'}}>
            <View style= {{paddingTop : 10}}>
              <Entypo name="dot-single" size={30} color="black" />
              </View>
              <Text style = {{fontSize : 22, width : WidthAndHeight.windowWidth*0.8, fontFamily : 'IBMMe'}}> 
              {content != null ? '해당 번호로 전화 : ' + content.poilcy_phone : "불러오는 중..."}
              </Text>
            </View>         
        </View>
        
        <View style  = {{marginVertical : '3%', marginLeft : '7%'}}>
        <Text style = {{fontSize : 27, fontFamily : 'IBMMe'}}>지원 정책/사업 상세</Text>
          <View style= {{flexDirection : 'row'}}>
          <View style= {{paddingTop : 10}}>
              <Entypo name="dot-single" size={30} color="black" />
              </View>
              <Text style = {{fontSize : 22, width : WidthAndHeight.windowWidth*0.8, fontFamily : 'IBMMe'}}> 
              {content != null ? '현장 지원 : ' + content.policy_support_detail : "불러오는 중..."}
              </Text>
            </View>           
        </View>


          </ScrollView>
        </SafeAreaView>
        <View style = {{borderWidth : 2, borderColor : theme.mColor, marginVertical : 5}}></View>
        <SafeAreaView>
            <ScrollView style = {{borderWidth : 3, 
                alignSelf :'center',
                width : WidthAndHeight.windowWidth*0.9,
                height : WidthAndHeight.windowHeight*0.135, 
                marginBottom : 5,
                borderColor : theme.mColor
                }}>

                <View>
                    <Text style = {{fontSize : 16, fontFamily : 'IBMMe', marginLeft : 20}}>선생님의 해당 사항은 다음과 같아요!</Text>
                    <View style= {{flexDirection : 'row'}}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <Text style = {{width : WidthAndHeight.windowWidth*0.8, fontFamily : 'IBMMe'}}> 
                        {content != null ? content.applicant_subject : "불러오는 중..."}                     
                        </Text>
                    </View>  
                    <View style= {{flexDirection : 'row'}}>
    
                        <Entypo name="dot-single" size={24} color="black" />
                        <Text style = {{width : WidthAndHeight.windowWidth*0.8, fontFamily : 'IBMMe'}}> 
                        {content != null ? content.applicant_age + "대 이상" : "불러오는 중..."}                    
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
       <View style= {{ borderWidth : 3, borderColor : theme.mColor}}></View>
        
      <View style = {{flexDirection :'row',}}>
          <TouchableOpacity  style = {{marginTop : 10, marginLeft :'10%'}}>
        <Entypo name="arrow-with-circle-left" size={60} color={theme.mColor} onPress = {() => leftArrow()}/>
        </TouchableOpacity>

        <View style = {{
          width : WidthAndHeight.windowWidth*0.3,
          justifyContent :'center',
          marginLeft : '10%',
          }}>
            <TouchableOpacity style = {{
              backgroundColor : theme.mColor,
              borderRadius :4,
              alignItems : 'center',
              height : 40,
              justifyContent : 'center',
              marginTop : 15
              }}
             onPress = {() => { Linking.openURL('tel:' + content.poilcy_phone)}}
              >
                <Text style = {{fontFamily : 'IBMMe',fontSize : 15, color : 'white', fontSize : 16}}>
                  신청 전화하기
                </Text>
  
            </TouchableOpacity>
            <TouchableOpacity style = 
            {{width : WidthAndHeight.windowWidth*0.3, paddingTop : 5, 
              paddingBottom : 10}}
            onPress = {() => {
              Alert.alert('즐겨찾기', '관심공고에 추가하시겠어요?', [{
                text : '네!',
                onPress : () => {
                  axios.post('https://prod.asherchiv.shop/app/policies/' + idx + '?user-idx=' + uidx, {
                    'user-idx' : uidx
                  },
                  {
                    headers : { 'X-ACCESS-TOKEN': jwt },   
                  }
                  )
                  .then(function (response){
                    console.log(response.data)
                    if(response.data.code == 1000)
                    {
                      Alert.alert('즐겨찾기 완료!', '마이페이지에서 확인하실 수 있습니다.', [
                        {
                          text : '확인'
                        }
                      ]);
                    }
                    else if(response.data.code = 2032)
                    {
                      Alert.alert('알림', '이미 즐겨찾기 하신 정책입니다. 취소하시겠어요?', [
                        {
                          text : '즐겨찾기 취소',
                          onPress : () => {
                            console.log('policy_idx : ' + content.policy_idx);
                            axios.delete('https://prod.asherchiv.shop/app/policies/liked-list?liked-idx='+ policy_liked_idx,
                            {
                              headers : { 'X-ACCESS-TOKEN': jwt },   
                            },
                            {
                              'liked-idx' : policy_liked_idx
                            }
                            )
                            .then(function(response){
                              console.log(response.data)
                              if(response.data.code == 1000)
                              {
                                Alert.alert('취소 성공!' ,'즐겨찾기를 취소하셨어요.')
                              }
                              else{
                                Alert.alert('취소 실패...' ,'즐겨찾기 취소 실패.')
                              }
                           
                            })
                            .catch(function (error)
                            {
                              console.log(error);
                            })
                          }
                          
                        }
                        ,
                        {
                          text : '즐겨찾기 유지',                  
                        }
                      ])
                    }
                   
                  })
                  .catch(function (error)
                  {
                    console.log(error);
                  })
                }
              },
              {
                text : '아니오.'
              }])
            }}
            >
              <View style = {{ backgroundColor : theme.mColor, alignItems : 'center', 
            borderRadius : 4, 
            }}
            ><Text style = {{fontFamily : 'IBMMe', color : 'white', height :40, fontSize : 16}}>관심 등록</Text></View>
            </TouchableOpacity> 
        </View>
      
      </View>

       <Text style = {{marginTop : 15, textAlign :'center'}}>고객님의 정보를 소중히 생각합니다.</Text>
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
