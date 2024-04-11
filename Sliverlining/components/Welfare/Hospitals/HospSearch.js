import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, Alert } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons'; 
import MyPageIconHeader from '../../../shared/MyPageIconHeader';
import { theme } from '../../../shared/theme';
import { WidthAndHeight } from '../../../shared/Dimension';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HospSearch({navigation}) {
  let tempKey = 0;

  const [idx, setidx] = useState(null);
  const [uid, setUid] = useState('');
  const [jwt, setJWT] = useState(null);
  const [lat, setLat] = useState(0.1);
  const [lon, setLon] = useState(0.1);
  const [hostData, setHost] = useState(null);

  const [hosp_kind, setHKind] = useState('')
  const [hosp_name, setHtitle] = useState('');
  const [hosp_phone, setHphone] = useState('');
  const [hosp_addr, setHaddr] = useState('');
  const [hosp_placeurl, setHplace] = useState('');


  useEffect(() => {
    (async() => {

      AsyncStorage.getItem('user_id', (err, result) => { 
        setUid(result);
        console.log('uid : ' + uid);
      });
      AsyncStorage.getItem('user_jwt', (err, result) => { 
        setJWT(result);
        console.log('jwt : ' + jwt);
      });
      AsyncStorage.getItem('u_idx', (err, result) => { 
        setidx(result);
        console.log('idx : ' + idx);
      });
    })();
  
  }, [])

  const setUserHosp = async(res) => {
    setHost(res.data.contents)
    console.log(res)
  }

  const setUserLat = async(res) => {
    setLat(res.data.contents[0].user_lat)
    console.log(res)
  }

  const setUserLon = async(res) => {
    setLon(res.data.contents[0].user_lng);
    console.log(res)
  }

  const getHost = async() => {
    axios.get('https://prod.asherchiv.shop/app/facilities?user-idx=' + idx + '&hospital=1', 
    {
      headers: { 'X-ACCESS-TOKEN': jwt }
    })
    .then(function (response){
      setUserHosp(response)
    })
    .catch(function (error){
      console.log(error)
    })
  }
  const getUinfo = async() => {
    axios.get('https://prod.asherchiv.shop/app/users?user-id=' + uid)
    .then(function (response)
    {
      setUserLat(response);
      setUserLon(response);
    })
    .catch(function (error)
    {
      console.log(error);
    })
  }
  
  useEffect(() => {
    if(uid != '' && jwt != null && idx != null)
    {
      getHost();
      getUinfo();
    }
  },[idx])

  const titleJumper = ()=>{
    navigation.navigate('병원상세', {'name' : hosp_name, 'kind' : hosp_kind, 'phone' : hosp_phone, 'addr' : hosp_addr, 'place' : hosp_placeurl, 'lat' : lat, 'lon' : lon})
  }
  const callPage = (param) => { //추후 매개변수에 idx 추가할 것
    return (
      <Text>
        <JobInfo title = {param}></JobInfo>
      </Text>
    )
  }

  const markerSetter = (kind, title, phone, addr, detail, lat, lng) => {
    setHKind(kind)
    setHtitle(title)
    setHplace(detail)
    setHaddr(addr)
    setHphone(phone)
    setLat(lat)
    setLon(lng)
    console.log('lat : ' + lat + " " + 'lon : ' + lng)
  }

  return (
    <View style={styles.container}>
      <View style = {{top : '7%'}}>
      <View style = {{position : 'absolute', right : '5%',}}><MyPageIconHeader /></View>
      <View style = {{flexDirection : 'row'}}>
        <Text style = {{fontFamily : 'IBMMe',  alignSelf : 'center', fontSize : 20, top : '2%'}}>
          맞춤 병원 찾기</Text>
      </View>
 
      <View style = {{borderWidth : 3, 
        borderRadius : 5,
        borderColor : theme.mColor,
        width : WidthAndHeight.windowWidth*0.9, 
        height : WidthAndHeight.windowHeight*0.53,
        top : '3%' }}>
      <MapView
       
        initialRegion={{
          latitude : lat,
          longitude : lon,
          latitudeDelta : 0.1,
          longitudeDelta : 0.1,
        }}
        
        region = {{
        latitude : lat,
        longitude : lon, 
        latitudeDelta : 0.01, 
        longitudeDelta :0.01
      }}
        
       
        style={[styles.map]}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE}
      >
        {hostData ? hostData.map((info) =>  <Marker key = {tempKey++}
          coordinate={{latitude : info.lat, longitude : info.lng}}
          title= {info.place_name}
          description={'장소 정보 : ' + info.place_url}
          onPress={() => markerSetter(info.keyword, info.place_name, info.phone, info.road_address_name, info.place_url, info.lat, info.lng)}
          //(title, addr, wage, detail, work)
        />)
      :
      hostData
      }
        
        
      </MapView>


      </View>
     
      
      <StatusBar style="auto" />
    </View>
    <TouchableOpacity style = {{position : 'absolute', bottom : '5%',}}
    onPress = {() => titleJumper()}
    >
    <View style = {styles.grid} >

        <Text style = {{fontSize : 15, fontFamily : 'IBMMe' }}>
          {hosp_addr ? hosp_addr : '입력하신 병과 관련된 병원들이 표시됩니다.'}
        </Text>
        <Text style = {{fontSize : 20, fontFamily : 'IBMMe' }}>
        {hosp_name ? hosp_name :'마커를 누르시면 병원이름이 표시됩니다.'}
        </Text>
        
        <View style= {styles.flexRow}>
        <Entypo name="dot-single" size={24} color="black" />
        <Text style = {{ fontFamily : 'IBMMe'}}>  
          {hosp_kind ? hosp_kind :'마커를 누르시면 병원 종류가 표시됩니다.'}
        </Text>
        </View>
        <View style= {styles.flexRow}>
        <Entypo name="dot-single" size={24} color="black" />
        <Text style = {{ fontFamily : 'IBMMe'}}> 
         {hosp_phone ? hosp_phone : '마커를 누르시면 전화번호가 표시됩니다.'}
        </Text>
        </View>
        <View style= {styles.flexRow}>
        <Entypo name="dot-single" size={24} color="black" />
        <Text style = {{ fontFamily : 'IBMMe'}}> 
        {hosp_addr ? hosp_addr :'마커를 누르시면 병원 주소가 표시됩니다.'}
        </Text>
        </View>
        <View style= {styles.flexRow}>
        <Entypo name="dot-single" size={24} color="black" />
        <Text style = {{ fontFamily : 'IBMMe'}}> 
        {hosp_placeurl ? hosp_placeurl :'마커를 누르시면 병원이름이 표시됩니다.'}
        </Text>
        </View>
        
     
    </View>
    </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width*0.88,
    height: Dimensions.get('window').height*0.52,
  },
  grid : {
    width: Dimensions.get('window').width*0.9,
    height: Dimensions.get('window').height*0.25,
    borderWidth : 2,
    borderColor : 'white',
    borderTopColor : theme.mColor,
    
  },
  flexRow : {
    flexDirection : 'row',
    alignContent : 'center',

  }
});
