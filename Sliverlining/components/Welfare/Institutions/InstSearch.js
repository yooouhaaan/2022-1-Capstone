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

export default function InstSearch({navigation}) {
  let tempKey = 0;

  const [idx, setidx] = useState(0);
  const [uid, setUid] = useState('');
  const [jwt, setJWT] = useState(null);
  const [lat, setLat] = useState(0.1);
  const [lon, setLon] = useState(0.1);
  const [InstData, setInst] = useState(null);

  const [inst_kind, setIKind] = useState('')
  const [inst_name, setItitle] = useState('');
  const [inst_phone, setIphone] = useState('');
  const [inst_addr, setIaddr] = useState('');
  const [inst_placeurl, setIplace] = useState('');


  useEffect(() => {
    (async() => {

      await AsyncStorage.getItem('user_id', (err, result) => { 
        setUid(result);
        console.log('uid : ' + uid);
      });
      await AsyncStorage.getItem('user_jwt', (err, result) => { 
        setJWT(result);
        console.log('jwt : ' + jwt);
      });
      await AsyncStorage.getItem('u_idx', (err, result) => { 
        setidx(result);
        console.log('idx : ' + idx);
      });
    })();
  
  }, [])

  const setUserInst = async(res) => {
    setInst(res.data.contents)
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

  const getInst = async() => {
    axios.get('https://prod.asherchiv.shop/app/facilities?user-idx=' + idx + '&welfare=1', 
    {
      headers: { 'X-ACCESS-TOKEN': jwt }
    })
    .then(function (response){
      setUserInst(response)
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
      getInst();
      getUinfo();
    }
  },[idx])


  const titleJumper = ()=>{
    navigation.navigate('복지상세', {'name' : inst_name, 'kind' : inst_kind, 'phone' : inst_phone, 'addr' : inst_addr, 'place' : inst_placeurl, 'lat' : lat, 'lon' : lon})
  }

 
  const markerSetter = (kind, title, phone, addr, detail, lat, lng) => {
    setIaddr(addr)
    setIphone(phone)
    setIplace(detail)
    setLat(lat)
    setLon(lng)
    setIKind(kind)
    setItitle(title)
    console.log('lat : ' + lat + " " + 'lon : ' + lng)
  }
  return (
    <View style={styles.container}>
      <View style = {{top : '7%'}}>
      <View style = {{position : 'absolute', right : '5%',}}><MyPageIconHeader /></View>
      <View style = {{flexDirection : 'row'}}>
        <Text style = {{fontFamily : 'IBMMe',  alignSelf : 'center', fontSize : 20, top : '2%'}}>
          내 주변 복지시설 찾기</Text>
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
          latitudeDelta : 0.05,
          longitudeDelta : 0.05,
        }}
        region = {{
          latitude : lat,
          longitude : lon, 
          latitudeDelta : 0.05, 
          longitudeDelta :0.05
        }}
        style={[styles.map]}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE}
 
       
      >
        {InstData ? InstData.map((info) =>  <Marker key = {tempKey++}
          coordinate={{latitude : info.lat, longitude : info.lng}}
          title= {info.place_name}
          description={'장소 정보 : ' + info.place_url}
          onPress={() => markerSetter(info.keyword, info.place_name, info.phone, info.road_address_name, info.place_url, info.lat, info.lng)}
    
          //(title, addr, wage, detail, work)
        />)
      :
      InstData
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
          {inst_addr ? inst_addr : '입력하신 병과 관련된 병원들이 표시됩니다.'}
        </Text>
        <Text style = {{fontSize : 20, fontFamily : 'IBMMe' }}>
        {inst_name ? inst_name :'마커를 누르시면 병원이름이 표시됩니다.'}
        </Text>
        
        <View style= {styles.flexRow}>
        <Entypo name="dot-single" size={24} color="black" />
        <Text style = {{ fontFamily : 'IBMMe'}}>  
          {inst_kind ? inst_kind :'마커를 누르시면 병원 종류가 표시됩니다.'}
        </Text>
        </View>
        <View style= {styles.flexRow}>
        <Entypo name="dot-single" size={24} color="black" />
        <Text style = {{ fontFamily : 'IBMMe'}}> 
         {inst_phone ? inst_phone : '마커를 누르시면 전화번호가 표시됩니다.'}
        </Text>
        </View>
        <View style= {styles.flexRow}>
        <Entypo name="dot-single" size={24} color="black" />
        <Text style = {{ fontFamily : 'IBMMe'}}> 
        {inst_addr ? inst_addr :'마커를 누르시면 병원 주소가 표시됩니다.'}
        </Text>
        </View>
        <View style= {styles.flexRow}>
        <Entypo name="dot-single" size={24} color="black" />
        <Text style = {{ fontFamily : 'IBMMe'}}> 
        {inst_placeurl ? inst_placeurl :'마커를 누르시면 병원이름이 표시됩니다.'}
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
