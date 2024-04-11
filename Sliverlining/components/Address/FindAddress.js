import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import Postcode from 'react-native-daum-postcode';
import { WidthAndHeight } from '../../shared/Dimension';
import { theme } from '../../shared/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData, getData } from '../../shared/AsyncStorage';
import axios from 'axios';

const api_key = "141867002e51d852da990f34ec2d53ac"
const windowHeight = WidthAndHeight.windowHeight;
const windowWidth = WidthAndHeight.windowWidth;


export default function FindAddress({route, navigation})  {
  const [postcode, setPostcode] = useState(null);
  const [addr, setAddr] = useState('');
  const [extraAddr, setExtraAddr] = useState('');

  const [uid, setUID] = useState('');
  const [jwt, setJWT] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  useEffect(() => {
    console.log(route.params.type);
  })
  useEffect(() => {
    (async() => {
      await AsyncStorage.getItem('user_jwt', (err, result) => { 
        setJWT(result);
        console.log('userjwt : ' + result);
      });

      await AsyncStorage.getItem('u_idx', (err, result) => { 
        setUID(result);
        console.log('useridx : ' + result);
      });
    })();
   }, [jwt])

  return (
    <View style={{ flex: 1, top : '5%', alignItems: 'center', justifyContent: 'center', height : windowHeight*0.6, backgroundColor : 'white' }}>
      <Text style = {{fontSize : 25, marginVertical : 10, marginHorizontal :10, fontFamily : 'IBMMe'}}>주소 입력</Text>
      <View style = {{borderWidth : 1, width : windowWidth, borderColor : theme.mColor,}}>
      </View>
      
      <Postcode
        style={{ width: 400, height: 200 }}
        jsOptions={{ animated: true }}
        onSelected={(data) => {
          setAddr('');
          setExtraAddr('');
          setPostcode(data.zonecode);
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
        
            AsyncStorage.setItem('su_address', data.roadAddress, () => {
              console.log(data.roadAddress + "가 저장되었습니다!");
            });   // 저장하는 법
            let lat;
            let lon;
            if(route.params.type == 'edit')
            {
              console.log('마이페이지로부터 들어옴');
              var url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + data.roadAddress;
              axios.get(url,{headers: {'Authorization': 'KakaoAK 141867002e51d852da990f34ec2d53ac'}},)
              .then(function(response) { 
              console.log(JSON.stringify(response.data));
              //setLat(response.data.documents[0].y);
              //setLon( response.data.documents[0].x);
              console.log("lat : " + response.data.documents[0].y + " lon : " + response.data.documents[0].x);
              lat = response.data.documents[0].y;
              lon = response.data.documents[0].x;
            })

                    
              Alert.alert('마이페이지에서 넘어옴', '주소를 변경하시겠어요?.', [
                {
                  text : '확인',
                  onPress : () => {
                    axios.patch('https://prod.asherchiv.shop/app/users/' + uid + '/address', {
                      "siNm": data.roadAddress,
                      "user_lat": lat,
                      "user_lng": lon
                    },
                    {
                      headers : {
                        'X-ACCESS-TOKEN' : jwt
                      }
                    }
                    )
                    .then(function (response){
                      console.log(response.data);
                      navigation.navigate('내정보수정', {addr : data.roadAddress})
                    })
                    .catch(function (error)
                    {
                      console.log(error);
                    })
                    
                  }
                }
              ])
            }
            else{
              navigation.pop();
            }
          
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            /*if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              setExtraAddr(data.bname);
             
              if (data.buildingName !== '' && data.apartment === 'Y') {
                setExtraAddr((prev) => {
                  return prev !== '' ? `${prev}, ${data.buildingName}` : `${data.buildingName}`;
                });
              }
            } else {
              setExtraAddr('');
            }*/
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            setExtraAddr(data.jibunAddress);
            AsyncStorage.setItem('su_address', data.roadAddress, () => {
              console.log(data.roadAddress + "가 저장되었습니다!");
            });  
            if(route.params.type == 'edit')
            {
              Alert.alert('마이페이지에서 넘어옴', '주소를 변경하시겠어요?.', [
                {
                  text : '확인',
                  onPress : () => {
                    var url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + data.roadAddress;
                    axios.get(url,{headers: {'Authorization': 'KakaoAK 141867002e51d852da990f34ec2d53ac'}},)
                    .then(function(response) { 
                    console.log(JSON.stringify(response.data));
                    setLat(response.data.documents[0].y);
                    setLon( response.data.documents[0].x)
                    console.log(data.roadAddress);
                    console.log(lat);
                    console.log(lon)
                    })

                    axios.patch('https://prod.asherchiv.shop/app/users/' + uid + '/address', {
                      "siNm": data.roadAddress,
                      "user_lat": lat,
                      "user_lng": lon
                    },
                    {
                      headers : {
                        'X-ACCESS-TOKEN' : jwt
                      }
                    }
                    )
                    .then(function (response){
                      console.log(response.data)
                      navigation.navigate('내정보수정', {addr : data.roadAddress})
                    })
                    .catch(function (error)
                    {
                      console.log(error);
                    })
                    
                  }
                }
              ])
            }
            else{
              navigation.pop();
            }
           
          }
        }}
      />
      <Text>우편번호:{postcode}</Text>
      <Text>
        도로명/지번 :{addr} ({extraAddr})
      </Text>
    </View>
  );
};
