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
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

export default function MyInfoEdit({route, navigation}) {
  let dList = ['', '고혈압',"류마티스/관절염" ,"폐질환" ,"신장질환" ,
   "간질환" ,"당뇨병" ,"노안/백내장" ,"소화기 질환" ,"난청" ,"보행장애" , "암" ,"치매/알츠하이머"
    ,"피부질환" ,"치아질환","심혈관질환" ,"뇌질환"];
  const [selectedValue, setSelected] = useState('');
  const navi = useNavigation();
  const [curData, setCurData] = useState('');
  const [DList, setDlist] = useState('');
  const [conFlag, setFlag] = useState(false);

  const isFocused = useIsFocused();

  const [jwt, setJWT] = useState('');
  const [uid, setID] = useState('');
  const [userobj, setStatus] = useState({});
  const [user_disease, setDisease] = useState([false, false, false, false, false, 
    false, false, false, false, false, 
    false, false, false, false, false,
    false, false,
   ])
   const [render_dis, set_r_dis] = useState([]);
   const [checked, setChecked] = useState(false);
  
   const [user_disease_text, setUserDiseaseText] = useState('');
  //eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWR4Ijo3LCJpYXQiOjE2NTEyMTY3MDAsImV4cCI6MTY1MjY4NzkyOX0.rnQE03ViJ_ar-nLJ1rHA2QkvO1ke8i3URh9O9yxf_lM
  useEffect(() => {
    console.log('리스트 상황 : ' + render_dis);
  }, [checked])
/*
  useEffect(() => {
    if(paramChange == false)
    {
      (async() => {
        paramFlag(route.params.isChanged != undefined ? true : false);
        console.log(paramChange)
        if(uid != '')
        {
           axios.get('https://prod.asherchiv.shop/app/users?user-id=' + uid, {
            })
            .then(function (response){
              console.log(response.data.contents[0]);
              setStatus(response.data.contents[0]); 
                   
            })
        }
    })();
    }
    paramFlag(false);
    
  }, [paramChange])
*/
  useEffect(() => {
    console.log(selectedValue)
    if(userobj.user_disease_list != undefined)
    {
      if(render_dis.length == 0 && selectedValue == 'user_disease_list')
      {
        console.log(render_dis.length)
        set_r_dis(user_disease);
      }
    }
    if(selectedValue == 'user_siNm')
    {
      console.log('주소 찾기')
      navigation.navigate('주소찾기', {type : 'edit'});
      setSelected('')
    }
    
  }, [selectedValue])

  useEffect(() => {
    if(userobj.user_disease_list != undefined)
    {
     (async() => {
         let tempDisease = userobj.user_disease_list;
         let boolDisease = [...user_disease]
         if(userobj.user_disease_list != null || userobj.user_disease_list != undefined)
         {
             console.log('데이터 업데이트')
             for(let i = 0; i<tempDisease.length; i++)
             {
                 console.log(tempDisease[i]);
                 boolDisease[tempDisease[i]] = true;
             }
         }
 
         setDisease(boolDisease);          
     })();      
    }
     
   }, [userobj, isFocused])

   useEffect(() => {
    (async() => {
      console.log('user_disease:' + user_disease);
      let dName = '';
      for(let i = 0; i < user_disease.length; i++)
      {
        if(i != user_disease.length - 1)
        {
          if(user_disease[i] == true)
          {
            dName = dName + dList[i] + ', ';
          }
        }
        else{
          if(user_disease[i] == true)
          {
            dName = dName + dList[i];
          }
        }        
      } 
      
      console.log(dName);
      setDlist(dName.replace(/,$/, '')); 
    })();
        
   }, [user_disease])

 useEffect(() => {
  (async() => {
    AsyncStorage.getItem('user_jwt', (err, result) => { 
      setJWT(result);
      console.log('userjwt : ' + result);
    });
    AsyncStorage.getItem('user_id', (err, result) => {
       setID(result);
       console.log('userid : ' + result)
    });
  })();
 }, [jwt, uid]);

 useEffect(() => {
    (async() => {
        if(uid != '')
        {
           axios.get('https://prod.asherchiv.shop/app/users?user-id=' + uid, {
            })
            .then(function (response){
              console.log(response.data.contents[0]);
              setStatus(response.data.contents[0]); 
                   
            })
        }
    })();
    
 },[uid, isFocused])


 const setDisElem = (idx) => {
  if(render_dis.length == 0)
  {
    console.log(render_dis.length)
    set_r_dis(user_disease);
  }
  let copyArray = render_dis;
  if(!copyArray[idx])
  {
    copyArray[idx] = true;
  }
  else{
    copyArray[idx] = false;
  }
    set_r_dis(copyArray);
    console.log(render_dis);
    setChecked(checked ? false : true);
  }

  const leftArrow = () => {
    navigation.pop();
  }

  //props의 id와 title을 이용, 데이터를 불러옴, id부분은 데이터 베이스 연동이 안되어 아직 실행 못함
  return (
    <View style={styles.container}>
        <View style = {{top : '5%', marginBottom : 30, borderWidth : 1, borderColor :'white', height : WidthAndHeight.windowHeight*0.08}}>
            <Text style = {{fontFamily : 'IBMMe', fontSize : 20, marginTop : '3%', paddingLeft : '5%'}}>나의 정보 수정</Text>
        </View>
        
        <View style ={{borderWidth : 3,  borderColor : theme.mColor, marginTop : "3%"}}>
        <Text style = {{fontSize : 23, fontFamily : 'IBMMe', marginLeft : '7%',
        borderLeftColor : 'white', borderRightColor : 'white'
        }}>등록된 정보를 확인하세요.</Text>
        </View>  

        <SafeAreaView>
          <ScrollView style = {{height : WidthAndHeight.windowHeight*0.42,}}>
          <View style  = {{marginVertical : '3%', marginLeft : '7%'}}>
         
    
            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                성함
              </Text>
            </View>
            <View style= {{flexDirection : 'row', marginBottom : 10}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'user_name' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.5, borderRadius : 5,
              }}
           
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
                {userobj.user_name != null ? userobj.user_name : ''}
                </Text>
                }
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                성별
              </Text>
            </View>
            <View style= {{flexDirection : 'row', marginBottom : 10}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>     
               <Text style = {styles.info}> 
                {userobj.user_gender != 0 ? '여성' : '남성'}
                </Text>                
            </View>


            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                생년월일
              </Text>
            </View>
            <View style= {{flexDirection : 'row', marginBottom : 10}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
             <Text style = {styles.info}> 
            {userobj.user_birth != null ? userobj.user_birth : ''}
                </Text>
            
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                주소
              </Text>
            </View>
            <View style= {{flexDirection : 'row', marginBottom : 10}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              <Text style = {styles.info}> 
              {userobj.user_siNm != null ? (route.params != undefined ? route.params.addr : userobj.user_siNm) : '정보 없음'}
            
                </Text>
              
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                전화번호
              </Text>
            </View>

            <View style= {{flexDirection : 'row', marginBottom : 10}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
                <Text style = {styles.info}> 
                    {userobj.user_phone != null ? userobj.user_phone : ''}
                </Text>
              
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                노인 보험 여부
              </Text>
            </View>

            <View style= {{flexDirection : 'row', marginBottom : 10}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'user_insurance_status' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.60, borderRadius : 5,
              }}
              placeholder = "'가입' 혹은 '미가입' 입력"
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
                {userobj.user_insurance_status != 1 ? "보험 미가입" : "보험 가입됨"}
              </Text>
                }
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                운전면허 여부
              </Text>
            </View>

            <View style= {{flexDirection : 'row', marginBottom : 10}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'user_drive_status' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.60, borderRadius : 5,
              }}
              placeholder = "'있음' 혹은 '없음' 입력"
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
                {userobj.user_drive_status != 1 ? "면허 미소유" : "면허 소유"}
              </Text>
                }
            </View> 

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                직무 경험
              </Text>
            </View>

            <View style= {{flexDirection : 'row', marginBottom : 10}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'user_experience' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.65, borderRadius : 5,
              }}
              placeholder = '자신의 직무경험을 간단히 소개하세요.'
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
                {userobj.user_experience != null ? userobj.user_experience : ""}
              </Text>
                }
            </View> 

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                기타 상세
              </Text>
            </View>

            <View style= {{flexDirection : 'row', marginBottom : 10}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'user_detailNm' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.60, borderRadius : 5,
              }}
              placeholder = "하고 싶은 말을 추가하세요."
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
                {userobj.user_detailNm != '' ? userobj.user_detailNm : "없음"}
              </Text>
                }
            </View> 
            
            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                겪고 계신 증상/병
              </Text>
            </View>

            <View style= {{flexDirection : 'row', marginBottom : 10}}>
           
            {
              selectedValue == 'user_disease_list' ? 
              <SafeAreaView>
              <ScrollView style = {{height : WidthAndHeight.windowHeight*0.4, padding : 10, borderWidth : 1, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.72}}>
                <View style = {styles.gridMargin}>
                <Button title = "고혈압" color = {render_dis[1] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(1)}></Button><Text>{"\t"}</Text>
                <Button title = "류마티스/관절염"  color = {render_dis[2]== true ? 'gray' : theme.mColor} onPress = {() => setDisElem(2) } > </Button><Text>{"\t"}</Text>
                <Button title = "폐질환"  color = {render_dis[3] == true ? 'gray' : theme.mColor} onPress = {() =>setDisElem(3)} ></Button>
                </View>
                <View style = {styles.gridMargin}>
                <Button title = "신장질환" color = {render_dis[4] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(4)} ></Button><Text>{"\t"}</Text>
                <Button title = "간질환"  color = {render_dis[5] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(5)} ></Button><Text>{"\t"}</Text>
                <Button title = "당뇨병"  color = {render_dis[6] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(6)} > </Button>
                </View>
                <View style = {styles.gridMargin}> 
                <Button title = "노안/백내장"  color = {render_dis[7] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(7)} ></Button><Text>{"\t"}</Text>
                <Button title = "소화기 질환"  color = {render_dis[8] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(8)}></Button><Text>{"\t"}</Text>
                <Button title = "난청" color = {render_dis[9] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(9)} ></Button>
                </View>
                <View style = {styles.gridMargin}>
                <Button title = "보행장애"  color = {render_dis[10] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(10)} > </Button><Text>{"\t"}</Text>
                <Button title = "암"  color = {render_dis[11] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(11)} ></Button><Text>{"\t"}</Text>
                <Button title = "치매/알츠하이머"  color = {render_dis[12] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(12)} ></Button>
               </View>
               <View style = {styles.gridMargin}>
                <Button title = "피부질환"  color = {render_dis[13] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(13)} ></Button><Text>{"\t"}</Text>
                <Button title = "치아질환"  color = {render_dis[14] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(14)} ></Button><Text>{"\t"}</Text>
                <Button title = "심혈관질환"  color = {render_dis[15] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(15)} ></Button><Text>{"\t"}</Text>
               
               </View>
               <View style = {styles.gridMargin}>
               <Button title = "뇌질환"  color = {render_dis[16] == true ? 'gray' : theme.mColor} onPress = {() => setDisElem(16)} ></Button>
               </View>
             
              </ScrollView>
              </SafeAreaView>
               : 
               <View style = {{flexDirection : 'row'}}>
                <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              <Text style = {{...styles.info, width : WidthAndHeight.windowWidth*0.8}}> 
                {DList != '' ? DList : '앓고 계신 증상/병이 없어요'}
              </Text>
              </View>
              }
            </View>

            <View style= {{flexDirection : 'column'}}>
              <Text style = {styles.info}> 
                소득 수준
              </Text>
            </View>

            <View style= {{flexDirection : 'row'}}>
            <Entypo name="dot-single" size={30} color="black" style = {{paddingTop : 5}}/>
              {selectedValue == 'user_median_income' ? <TextInput style = {{
                paddingLeft : 10, borderWidth : 2, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.60, borderRadius : 5,
              }}
              placeholder = "단위 없이 월 소득을 입력해주세요."
              autoFocus = {true}
              onChangeText={(text) => setCurData(text)}
              ></TextInput>
               :  <Text style = {styles.info}> 
                {userobj.user_median_income != null && isNaN(parseInt(userobj.user_median_income)) == false ? '평균 소득 대비 ' + userobj.user_median_income + '%' : "추후 분위 확인 가능"}
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
                    onValueChange={(value) => {
                      setSelected(value)
                    }}
                    items={[
                        { label: '주소', value: "user_siNm" },                      
                        { label: '보험 여부', value: 'user_insurance_status'},         
                        { label: "운전면허 여부", value: "user_drive_status" },
                        { label: "직무 경험", value: "user_experience" },
                        { label: "기타 상세", value:"user_detailNm" },
                        { label: "증상/병", value: "user_disease_list" },
                        { label: "소득수준", value: "user_median_income" },
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
                    case "user_disease_list" :
                      let sendArray = []
                      for(let i = 0; i<render_dis.length; i++)
                      {
                        if(render_dis[i] == true)
                        {
                          sendArray.push(i);
                          console.log(i);
                        }
                      }
                      console.log(sendArray);
                      axios.patch('https://prod.asherchiv.shop/app/users/' + userobj.user_idx + '/diseases',{
                        
                        "user_idx" : userobj.user_idx,
                        "user_disease_list" : sendArray
                        }, 
                        {
                         headers : {
                          'X-ACCESS-TOKEN' : jwt
                         }
                       }
                       
                       )
                       .then(function (response){
    
                        console.log(response.data);
                        let dName = '';
                        for(let i = 0; i < render_dis.length; i++)
                        {
                          if(i != render_dis.length - 1)
                          {
                            if(render_dis[i] == true)
                            {
                              dName = dName + dList[i] + ', ';
                            }
                          }
                          else{
                            if(render_dis[i] == true)
                            {
                              dName = dName + dList[i];
                            }
                          }        
                        } 
                        
                        console.log(dName);
                        setDlist(dName.replace(/,$/, '')); 

                        setSelected('');
                       })
                       .catch(function (error){
                         console.log(error);
                       })
                       break;

                    case 'user_drive_status' :
                      axios.patch('https://prod.asherchiv.shop/app/users/' + userobj.user_idx + '/drive-status',{
                
                      "user_idx" : userobj.user_idx,
                      "user_drive_status" : curData == '있음' ? 1 : 0
                      }, 
                      {
                      headers : {
                        'X-ACCESS-TOKEN' : jwt
                      }
                    }
                    
                    )
                    .then(function (response){

                      console.log(response.data);
                    
                      userobj.user_drive_status = curData == '있음' ? 1 : 0;
                     
                      setSelected('');
                    })
                    .catch(function (error){
                      console.log(error);
                    }) 
                    break;
                    
                    case 'user_insurance_status' :
                      axios.patch('https://prod.asherchiv.shop/app/users/' + userobj.user_idx + '/insurance',{
                     
                        "user_idx" : userobj.user_idx,
                        "user_insurance_status" : curData == '가입' ? 1 : 0
                        }, 
                        {
                        headers : {
                          'X-ACCESS-TOKEN' : jwt
                        }
                      }
                      
                      )
                      .then(function (response){
  
                        console.log(response.data);
                        userobj.user_insurance_status = curData == '가입' ? 1 : 0;
                        setSelected('');
                      })
                      .catch(function (error){
                        console.log(error);
                      }) 
                      break;

                      case 'user_experience' :
                        axios.patch('https://prod.asherchiv.shop/app/users/' + userobj.user_idx + '/experience',{
                     
                          "user_idx" : userobj.user_idx,
                          "user_experience" : curData
                          }, 
                          {
                          headers : {
                            'X-ACCESS-TOKEN' : jwt
                          }
                        }
                        
                        )
                        .then(function (response){
    
                          console.log(response.data);
                          userobj.user_experience = curData;
                          setSelected('');
                        })
                        .catch(function (error){
                          console.log(error);
                        }) 
                        break;

                        case 'user_median_income' :
                          axios.patch('https://prod.asherchiv.shop/app/users/' + userobj.user_idx + '/income',{
                            "user_idx" : userobj.user_idx,
                            "user_income" : curData
                    
                            }, 
                            {
                            headers : {
                              'X-ACCESS-TOKEN' : jwt
                            }
                          }
                          
                          )
                          .then(function (response){
      
                            console.log(response.data);
                            userobj.user_median_income = "(추후 확인가능)";
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
                  변경 내용 적용
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
    fontSize : 22,
    fontFamily : 'IBMMe',
  },
  gridMargin : {
    flexDirection : 'row', 
    marginVertical : 5
  }
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