import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import {useState, useEffect} from 'react';
import { WidthAndHeight } from '../../shared/Dimension';
import { theme } from '../../shared/theme';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
const windowWidth = WidthAndHeight.windowWidth;
const windowHeight =WidthAndHeight.windowHeight;

export default function FindEmpDetail({navigation}) {
  const [job_title, setJobtitle] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [job_category_id, setJobCategory] = useState(0);
  const [job_min_age, setMinAge] = useState(0);
  const [job_max_age, setMaxAge] = useState(0);
  const [job_gender, setGender] = useState(0);
  const [job_wage, setWage] = useState("");
  const [job_working_time, setWorkTime] = useState(0);
  const [job_personnel, setPersnonnel] = useState(3);
  const [job_detail, setDetail] = useState('');
  const [job_offer_status, setStatus] = useState(1);
  const [job_addr, setAddress] = useState('');
  const [job_publisher_idx, setPidx] = useState(2)
  const [job_lat, setLat] = useState(0.1);
  const [job_lon, setLon] = useState(0.1);

  const [uid, setUid] = useState('')
  const [token, setToken] = useState('')
  useEffect(async() => {
    await AsyncStorage.getItem('user_id', (err, result) => { 
      setUid(result);
      console.log(uid);
    });
    await AsyncStorage.getItem('user_jwt', (err, result) => { 
      setToken(result);
      console.log(token);
    },[]);

    axios.get('https://prod.asherchiv.shop/app/users?user-id=' + uid)
    .then(function (response)
    {
      console.log('상세정보: '+ response.data.contents[0]);
      setAddress(response.data.contents[0].user_siNm);
      setLon(response.data.contents[0].user_lng);
      setLat(response.data.contents[0].user_lat);
      console.log(job_addr + " " + job_lat + " " + job_lon)
    })
    .catch(function (error)
    {
      console.log(error);
    })
  
  })

  const [clicked, setClicked] = useState([false, false, false, false, false, 
    false, false, false, false, false, 
    false, false, false, false, false,
   ])

   const setJob = (idx) => {
    let copyArray = [...clicked];
    for(let i = 0; i<copyArray.length; i++)
    {
      if(i == idx)
      {
        copyArray[i] = true;
        setJobCategory(i);
        console.log('jobcategorynum : ' + i);
      }
      else{
        copyArray[i] = false;
      }
    }
   
    setClicked(copyArray);
    console.log(copyArray);
  }
  
  const config = {
    headers: { 'X-ACCESS-TOKEN': token }
  };

  const Submit = () => {
    Alert.alert('알림', '이대로 등록할까요?', [
      {
        text: '공고 등록!',
        onPress: () => {
          axios.post("https://prod.asherchiv.shop/app/jobs",  {
            'job_title' : job_title,
            'company_name' : company_name,
            'job_category_id' : job_category_id,
            'job_min_age' : job_min_age,
            'job_max_age' : job_max_age,
            'job_gender' : job_gender,
            'job_wage' : job_wage,
            'job_working_time' : job_working_time,
            'job_personnel' : 3,
            'job_offer_status' : job_offer_status,
            'job_detail' : job_detail,
            'job_offer_status' : 1,
            'job_sinm' : job_addr,
            'job_lat' : job_lat,
            'job_lng' : job_lon
          }, config)
          .then(function (response){
            navigation.navigate('구인메인')
            console.log(response)
          })
          .catch(function (error){
            console.log(error)
          })
        }
        
      },
      {
        text: '취소',
        onPress: () => console.log('제출취소'),
      },
    ]);
    //navigation.navigation('구인상세');
  }

  return (
    <View style={styles.container}>
     
     <Text style = {{fontFamily : 'Sans', fontSize : 28, marginLeft : '10%'}}>
       Silverlining
     </Text>
     <Text style  = {{
         fontSize : 15, 
         fontFamily : 'IBMMe', 
         marginLeft : '10%', 
         borderWidth : 1, 
         borderColor : 'white', 
         borderBottomColor : theme.mColor,
         width : windowWidth*0.75
         }}>구인 글 등록</Text>
     <Text style = {{fontSize : 23, fontFamily : 'IBMMe', marginLeft : '10%'}}>
       공고 상세
     </Text>
     
 
     <SafeAreaView style = {{height : windowHeight*0.6, borderWidth : 3, borderColor : theme.mColor, paddingTop : 5, paddingBottom : 10}}>
         <ScrollView>
             <Text style = {styles.workCondition}>근무 조건</Text>

             <Text style = {{left : '10%', fontFamily : 'IBMMe', fontSize : 19}}>공고명</Text>
             <KeyboardAvoidingView style = {{...styles.textInput, marginVertical : 5}}>
                 <TextInput
                 onChangeText={text => setJobtitle(text)}
                 value = {job_title}
                 placeholder = '노출될 공고명을 적어주세요.'
                 >
                 </TextInput>
             </KeyboardAvoidingView>

             <Text style = {{left : '10%', fontFamily : 'IBMMe', fontSize : 19}}>회사명</Text>
             <KeyboardAvoidingView style = {{...styles.textInput, marginVertical : 5}}>
                 <TextInput
                 onChangeText={text => setCompanyName(text)}
                 value = {company_name}
                 placeholder = '회사명을 적어주세요.'
                 >
                 </TextInput>
             </KeyboardAvoidingView>

             <Text style = {{left : '10%', fontFamily : 'IBMMe', fontSize : 19}}>직업종류 선택</Text>
    
            
              <View style = {{alignSelf:'center', height : WidthAndHeight.windowHeight*0.33, padding : 15, borderWidth : 3, borderColor : theme.mColor, width : WidthAndHeight.windowWidth*0.85}}>
                    <View style = {styles.jobs}>
                      <Button title = "외식/음료" color = {clicked[1] ? 'gray' : theme.mColor} onPress = {() => setJob(1)}></Button><Text>{"\t"}</Text>
                      <Button title = "유통/판매" color = {clicked[2] ? 'gray' : theme.mColor} onPress = {() => setJob(2)}> </Button><Text>{"\t"}</Text>
                      <Button title = "문화/여가/생활" color = {clicked[3] ? 'gray' : theme.mColor} onPress = {() => setJob(3)}></Button><Text>{"\t"}</Text>
                    </View>
                    <View style = {styles.jobs}>
                    <Button title = "서비스" color = {clicked[4] ? 'gray' : theme.mColor} onPress = {() => setJob(4)}></Button><Text>{"\t"}</Text>
                      <Button title = "사무/회계" color = {clicked[5] ? 'gray' : theme.mColor} onPress = {() => setJob(5)}></Button><Text>{"\t"}</Text>
                      <Button title = "고객상담/영업/리서치" color = {clicked[6] ? 'gray' : theme.mColor} onPress = {() => setJob(6)}></Button>
                    </View>
                    <View style = {styles.jobs}>
                      <Button title = "생산/건설/노무" color = {clicked[7] ? 'gray' : theme.mColor} onPress = {() => setJob(7)}> </Button><Text>{"\t"}</Text>
                      <Button title = "IT/인터넷" color = {clicked[8] ? 'gray' : theme.mColor} onPress = {() => setJob(8)}></Button><Text>{"\t"}</Text>
                      <Button title = "교육/강사" color = {clicked[9] ? 'gray' : theme.mColor} onPress = {() => setJob(9)}></Button>
                    </View>
                    <View style = {styles.jobs}>
                      <Button title = "디자인" color = {clicked[10] ? 'gray' : theme.mColor} onPress = {() => setJob(10)}> </Button><Text>{"\t"}</Text>
                      <Button title = "미디어" color = {clicked[11] ? 'gray' : theme.mColor} onPress = {() => setJob(11)}></Button><Text>{"\t"}</Text>
                      <Button title = "운전/배달" color = {clicked[12] ? 'gray' : theme.mColor} onPress = {() => setJob(12)}></Button><Text>{"\t"}</Text>
                      <Button title = "병원/간호/연구" color = {clicked[13] ? 'gray' : theme.mColor} onPress = {() => setJob(13)}></Button>
                    </View>

                  </View>
                        
              <View style = {{flexDirection : 'row', marginHorizontal : '10%', marginVertical : 10}}>
              <Text style = {{left : '10%', fontFamily : 'IBMMe', fontSize : 19}}>최소연령</Text>
                  <KeyboardAvoidingView style = {{...styles.textInput, width : 50, marginVertical : 5, marginHorizontal : 15}}>                  
                      <TextInput style = {{fontSize : 20}}
                      onChangeText={text => setMinAge(parseInt(text))}
                      >
                      </TextInput>
                  </KeyboardAvoidingView>
              </View>
                  
              <View style = {{flexDirection : 'row', marginHorizontal : '10%', marginVertical : 10}}>
              <Text style = {{left : '10%', fontFamily : 'IBMMe', fontSize : 19}}>최대연령</Text>
                  <KeyboardAvoidingView style = {{...styles.textInput, width : 50, marginVertical : 5, marginHorizontal : 15}}>                     
                      <TextInput style = {{fontSize : 20}}
                      onChangeText={text => setMaxAge(parseInt(text))}
                     >
                      </TextInput>
                  </KeyboardAvoidingView>
              </View>
            
              <Text style = {{left : '10%', fontFamily : 'IBMMe', fontSize : 19}}>성별</Text>
             
            
              <View style = {{flexDirection :'row', marginTop : 15, left :'3%'}}>
              <TouchableOpacity onPress = {() => setGender(0)}>
                <View 
                style = {{
                backgroundColor : (job_gender == 0 ? theme.mColor :'white') ,
                marginHorizontal : 10, borderWidth : 1, borderColor : theme.mColor, borderRadius : 5}}><Text style = {{paddingVertical : 10, fontSize : 20, paddingHorizontal : 10}}>남성</Text>
                </View>
                </TouchableOpacity>
              <TouchableOpacity onPress = {() => setGender(1)}>
                <View
              style = {{
                backgroundColor : (job_gender == 1 ? theme.mColor :'white'),
                marginHorizontal : 10, borderWidth : 1, borderColor : theme.mColor, borderRadius : 5}}><Text style = {{paddingVertical : 10, fontSize : 20, paddingHorizontal : 10}}>여성</Text>
                </View></TouchableOpacity>
              </View>


              <Text style = {{left : '10%', fontFamily : 'IBMMe', fontSize : 19, marginTop : '3%'}}>급여</Text>
             <KeyboardAvoidingView style = {{...styles.textInput, marginVertical : 5}}>
                 <TextInput
                 onChangeText={text => setWage(text)}
                >
                 </TextInput>
             </KeyboardAvoidingView>

             <Text style = {{left : '10%', fontFamily : 'IBMMe', fontSize : 19, marginTop : '3%'}}>근무시간</Text>
             <KeyboardAvoidingView style = {{...styles.textInput, marginVertical : 5}}>
                 <TextInput
                 onChangeText={text => setWorkTime(text)}
                 >
                 </TextInput>
             </KeyboardAvoidingView>

             <Text style = {{left : '10%', fontFamily : 'IBMMe', fontSize : 19, marginTop : '3%'}}>추가정보</Text>
             <KeyboardAvoidingView style = {{...styles.textInput, marginVertical : 5, height : 100}}>
                 <TextInput
                 onChangeText={text => setDetail(text)}
                 
                 keyboardType ='default'
                 >
                 </TextInput>
             </KeyboardAvoidingView>

            

         </ScrollView>
     </SafeAreaView>
 
    <TouchableOpacity style = {{
    justifyContent : 'center',
    alignSelf : 'center', 
    marginTop : '3%'}}
    onPress = {() => Submit()}
      >
        <View 
        style= 
        {{borderWidth : 3,
         borderRadius : 4,
         borderColor : theme.mColor,
         padding : 15,
         }}
         
         >
        <Text style = {{fontFamily : 'IBMMe', fontSize : 20,}}>공고 등록</Text>
        </View>
       
      </TouchableOpacity>
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
  workCondition : {
    marginLeft : '10%',
    fontFamily : 'IBMMe',
    fontSize : 20,
    marginVertical : 5,
    borderWidth : 2,
    borderColor : 'white',
    borderBottomColor : theme.mColor,
    width :  90
  },
  textInput : {
    backgroundColor : theme.mColor, 
    left : '10%', 
    width : WidthAndHeight.windowWidth*0.75,
    borderWidth : 2, 
    borderColor : theme.mColor, 
    borderRadius : 5,
    paddingLeft : 10,
  },
  jobs : {
    flexDirection : 'row', 
    marginVertical : 5
  }
});
