import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView,TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons,  MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import MyPageIconHeader from '../../shared/MyPageIconHeader';
import { theme } from '../../shared/theme';
import { WidthAndHeight } from '../../shared/Dimension';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function AlterInfo({route, navigation}) {
  const isFocused = useIsFocused();
  const [selectedValue, setSelected] = useState('');

  const [curData, setCurData] = useState('');
  const [curData2, setCurData2] = useState('');

  const [conFlag, setFlag] = useState(false);
  const [content, setContent] = useState(null);

  const [jwt, setJWT] = useState('');

  const contentSetter = (val) => {
    setContent(val)
  }
  //eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWR4Ijo3LCJpYXQiOjE2NTEyMTY3MDAsImV4cCI6MTY1MjY4NzkyOX0.rnQE03ViJ_ar-nLJ1rHA2QkvO1ke8i3URh9O9yxf_lM
  useEffect(() => {
    if(!conFlag)
    {
      contentSetter(route.params.content);
    }
    setFlag(true);
    console.log(content);
  }, [content, isFocused])

  useEffect(()=> {
    console.log(content);
  }, [content])

 useEffect(() => {
  (async() => {
    await AsyncStorage.getItem('user_jwt', (err, result) => { 
      setJWT(result);
      console.log('userjwt : ' + result);
    });
  })();
 }, [jwt])

  const leftArrow = () => {
    navigation.pop();
  }

  //props의 id와 title을 이용, 데이터를 불러옴, id부분은 데이터 베이스 연동이 안되어 아직 실행 못함
  return (
    <View style={styles.container}>
        <View style = {{top : '5%', marginBottom : 30, borderWidth : 1, borderColor :'white', borderBottomColor : theme.mColor, height : WidthAndHeight.windowHeight*0.08}}>
            <View style = {{position : 'absolute', right : '5%',}}><MyPageIconHeader /></View>
            <Text style = {{fontFamily : 'IBMMe', fontSize : 20, marginTop : '3%', paddingLeft : '5%'}}>상세 페이지</Text>
        </View>
        
        <View style = {{marginTop:'5%',marginLeft : '7%'}}>
            <Text style = {{fontSize : 25, fontFamily : 'IBMMe'}}>
                {content? content.job_title : ''} 공고 수정
            </Text>
            
        </View>
        <View style ={{borderWidth : 3,  borderColor : theme.mColor}}>
        <Text style = {{fontSize : 23, fontFamily : 'IBMMe', marginLeft : '7%',
    borderLeftColor : 'white', borderRightColor : 'white'
    }}>공고 내용을 확인하세요.</Text>
        </View>
      
        <SafeAreaView>
          <ScrollView style = {{height : WidthAndHeight.windowHeight*0.37,}}>
          <View style  = {{marginVertical : '3%', marginLeft : '7%'}}>
         
    
            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                공고 이름
              </Text>
            </View>
            <View style= {{flexDirection : 'row'}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'job_title' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.5, borderRadius : 5,
              }}
              placeholder = {content.job_title}
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
                    {content ? content.job_title : ''}
                </Text>
                }
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                회사 이름
              </Text>
            </View>

            <View style= {{flexDirection : 'row'}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'company_name' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.5, borderRadius : 5,
              }}
              placeholder = {content.company_name}
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
                    {content ? content.company_name : ''}
                </Text>
                }
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                근무 시간
              </Text>
            </View>

            <View style= {{flexDirection : 'row'}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'job_working_time' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.5, borderRadius : 5,
              }}
              placeholder = {content.job_working_time}
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
                    {content ? content.job_working_time : ''}
                </Text>
                }
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                임금 정보
              </Text>
            </View>

            <View style= {{flexDirection : 'row'}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'job_wage' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.5, borderRadius : 5,
              }}
              placeholder = {content.job_wage}
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
                    {content ? content.job_wage : ''}
                </Text>
                }
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                구인 상태
              </Text>
            </View>

            <View style= {{flexDirection : 'row'}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'job_offer_status' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.60, borderRadius : 5,
              }}
              placeholder = {(content != null && content.job_offer_status == 1) ? "'완료' 작성으로 구인 완료" : "'미완료' 작성으로 구인 중으로 변환"}
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
               {(content != null && content.job_offer_status == 1) ? '구인 중' : '구인 완료'}
              </Text>
                }
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                구인 연령
              </Text>
            </View>

            <View style= {{flexDirection : 'row'}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'job_age' ? 
              <View style = {{flexDirection : "row"}}>
              <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.2, borderRadius : 5,
              }}
              placeholder = {"최소 나이"}
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
              <Text style = {styles.info}>대 ~ </Text> 

              <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.2, borderRadius : 5,
              }}
              placeholder = {"최대 나이"}
              onChangeText={(text) => setCurData2(text)}
              ></TextInput>
              <Text style = {styles.info}>대</Text>
              </View>

              :<Text style = {styles.info}> 
                    {content ? content.job_min_age + '대 ~'  + content.job_max_age + '대': ''}
              </Text>
              }
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                구인 성별
              </Text>
            </View>

            <View style= {{flexDirection : 'row'}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
            {selectedValue == 'job_gender' ? 
              <View style = {{flexDirection : "row"}}>
              <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.2, borderRadius : 5,
              }}
              placeholder = {content.job_gender == 0 ? '남성'  : '여성'}
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
              </View>
              :
              <Text style = {styles.info}> 
                    {content && content.job_gender == 0 ? '남성'  : '여성'}
              </Text>
              }
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                상세 글
              </Text>
            </View>
            <View style= {{flexDirection : 'row'}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {
                selectedValue == 'job_detail' ?
              <View style = {{flexDirection : "row"}}>
              <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.7, borderRadius : 5,
              }}
              placeholder = {content.job_detail}
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
              </View>
              :
              <Text style = {styles.info}> 
                    {content ? content.job_detail : ''}
              </Text>
              }
            </View>
        </View>

        
          </ScrollView>
        </SafeAreaView>
       <View style= {{ borderWidth : 3, borderColor : theme.mColor}}></View>
       
            <Text style = {{fontFamily : 'IBMMe', fontSize : 15, alignSelf : 'center'}}>
                아래에서 항목을 선택하고, 글 수정 버튼을 누르세요</Text>
            <View style = {{borderWidth : 2, borderColor : theme.mColor,}}>
                    <RNPickerSelect
                    onValueChange={(value) => setSelected(value)}
                    items={[
                        { label: '글 제목', value: "job_title" },                      
                        { label: '근무 시간', value: 'job_working_time' },
                        { label: "임금", value: "job_wage" },
                        { label: "구인 상태", value: "job_offer_status" },
                        { label: "연령", value: "job_age" },
                        { label: "구인 성별", value:"job_gender" },
                        { label: "구인 상세", value: "job_detail" },
                    ]}
                    placeholder = {{
                        label : "수정할 정보 선택"
                    }}
                    style={pickerSelectStyles}
                />
                </View>
                <TouchableOpacity style = {{
              backgroundColor : theme.mColor,
              borderRadius :4,
              alignItems : 'center',
              height : 40,
              justifyContent : 'center',
              marginTop : 10
              }}
             onPress = {() => Alert.alert('정보 수정', '이대로 수정하시겠어요?', [
               {
                 text : '취소',
                 onPress: () => console.log('취소'),
               },
               {
                 text : '정보 수정',
                 onPress : () => {
                   switch(selectedValue)
                   {
                    case "job_title" :
                      axios.patch('https://prod.asherchiv.shop/app/jobs/' + content.job_idx + '/title',{
                        'job_idx' : content.job_idx,
                        "job_title" : curData
                        }, 
                        {
                         headers : {
                          'X-ACCESS-TOKEN' : jwt
                         }
                       }
                       
                       )
                       .then(function (response){
    
                        console.log(response.data);
                        let ob = content;
                        ob.job_title = curData;
                        setContent(ob)
                        console.log(content)
                        setSelected('');
                       })
                       .catch(function (error){
                         console.log(error);
                       })
                       break;

                    case 'job_working_time' :
                      axios.patch('https://prod.asherchiv.shop/app/jobs/' + content.job_idx + '/time',{
                      'job_idx' : content.job_idx,
                      "job_working_time" : curData
                      }, 
                      {
                      headers : {
                        'X-ACCESS-TOKEN' : jwt
                      }
                    }
                    
                    )
                    .then(function (response){

                      console.log(response.data);
                      let ob = content;
                      ob.job_working_time = curData;
                      setContent(ob)
                      console.log(content)
                      setSelected('');
                    })
                    .catch(function (error){
                      console.log(error);
                    }) 
                    break;
                    
                    case 'job_wage' :
                      axios.patch('https://prod.asherchiv.shop/app/jobs/' + content.job_idx + '/wage',{
                        'job_idx' : content.job_idx,
                        "job_wage" : curData
                        }, 
                        {
                        headers : {
                          'X-ACCESS-TOKEN' : jwt
                        }
                      }
                      
                      )
                      .then(function (response){
  
                        console.log(response.data);
                        let ob = content;
                        ob.job_wage = curData;
                        setContent(ob)
                        console.log(content)
                        setSelected('');
                      })
                      .catch(function (error){
                        console.log(error);
                      }) 
                      break;

                      case 'job_offer_status' :
                        axios.patch('https://prod.asherchiv.shop/app/jobs/' + content.job_idx + '/offer',{
                          'job_idx' : content.job_idx,
                          "job_offer_status" : curData == '완료' ? 0 : 1
                          }, 
                          {
                          headers : {
                            'X-ACCESS-TOKEN' : jwt
                          }
                        }
                        
                        )
                        .then(function (response){
    
                          console.log(response.data);
                          let ob = content;
                          ob.job_offer_status = curData == '완료' ? 0 : 1;
                          setContent(ob)
                          console.log(content)
                          setSelected('');
                        })
                        .catch(function (error){
                          console.log(error);
                        }) 
                        break;

                        case 'job_age' :
                          axios.patch('https://prod.asherchiv.shop/app/jobs/' + content.job_idx + '/age',{
                            'job_idx' : content.job_idx,
                            'job_min_age' : parseInt(curData),
                            "job_max_age" : parseInt(curData2)
                            }, 
                            {
                            headers : {
                              'X-ACCESS-TOKEN' : jwt
                            }
                          }
                          
                          )
                          .then(function (response){
      
                            console.log(response.data);
                            let ob = content;
                            ob.job_min_age = parseInt(curData);
                            ob.job_max_age = parseInt(curData2);
                            setContent(ob)
                            console.log(content)
                            setSelected('');
                          })
                          .catch(function (error){
                            console.log(error);
                          }) 
                          break;

                        case 'job_gender' :
                          axios.patch('https://prod.asherchiv.shop/app/jobs/' + content.job_idx + '/gender',{
                            'job_idx' : content.job_idx,
                            'job_gender' : (curData == '남성') ? 0 : 1                      
                            }, 
                            {
                            headers : {
                              'X-ACCESS-TOKEN' : jwt
                            }
                          }
                          
                          )
                          .then(function (response){
      
                            console.log(response.data);
                            let ob = content;
                            if(curData == '남성')                
                              ob.job_gender = 0;
                            else
                              ob.job_gender = 1;               
                              setContent(ob)
                              console.log(content)
                            setSelected('');
                          })
                          .catch(function (error){
                            console.log(error);
                          }) 
                          break;

                          case 'job_detail' :
                            axios.patch('https://prod.asherchiv.shop/app/jobs/' + content.job_idx + '/detail',{
                              'job_idx' : content.job_idx,
                              'job_detail' : curData                   
                              }, 
                              {
                              headers : {
                                'X-ACCESS-TOKEN' : jwt
                              }
                            }
                            
                            )
                            .then(function (response){
        
                              console.log(response.data);
                              let ob = content;
                              ob.job_detail = curData;            
                              setContent(ob)
                              console.log(content)
                              setSelected('');
                            })
                            .catch(function (error){
                              console.log(error);
                            }) 
                            break;
                   }
                   
                  
                 }
               }
             ])}
              >
                
                <Text style = {{fontSize : 15, color : 'white', fontSize : 16}}>
                  글 수정
                </Text>
        </TouchableOpacity>
        <TouchableOpacity  style = {{marginTop : 20, alignSelf : 'center'}}>
        <Entypo name="arrow-with-circle-left" size={70} color={theme.mColor} onPress = {() => leftArrow()}/>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  info : {
    fontSize : 18,
    fontFamily : 'IBMMe',
  },

});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        alignSelf : 'center',
        height: 50, 
        width: 200, 
        color: theme.mColor,
        borderColor: theme.mColor, 
        borderWidth: 1, 
        borderRadius: 12,
     
    },
    inputAndroid: {
        alignSelf : 'center',
        height: 50, 
        width: 200, 
        color: theme.mColor,
        borderColor: theme.mColor, 
        borderWidth: 1, 
        borderRadius: 12,
      
    },
});