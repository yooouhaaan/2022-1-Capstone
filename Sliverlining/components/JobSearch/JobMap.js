import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { WidthAndHeight } from '../../shared/Dimension';
import * as Location from 'expo-location';
import { theme } from '../../shared/theme';
import MyPageIconHeader from '../../shared/MyPageIconHeader';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons'; 
import JobInfo from './JobInfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function JobMap({route, navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [ok, setOK] = useState(true);

  const [markerData, setMarkerData] = useState("");
  //const [initialRegion, setInitialRegion] = useState(null);
  const [lati, setLatitude] = useState(0);
  const [longi, setLongitude] = useState(0);
  
  const [idx, setidx] = useState(null);
  const [uid, setUid] = useState('');
  const [title, setTitle] = useState('');
  const [jwt, setJWT] = useState(null);
  const [status, setStatus] = useState(0);
  const [lat, setLat] = useState(0.1);
  const [lon, setLon] = useState(0.1);

  const [job_list, setJoblist] = useState(null);

  const [sel_title, setStitle] = useState('');
  const [sel_addr, setSaddr] = useState('');
  const [sel_wage, setSwage] = useState('');
  const [sel_work_time, setSwork] = useState('');
  const [sel_idx, setSIdx] = useState(null);
  const [sel_detail, setSdetail] = useState('');

  useEffect(() => {

    (async () => {
      AsyncStorage.getItem('user_id', (err, result) => { 
        setUid(result);
        console.log(uid);
      });
      AsyncStorage.getItem('user_jwt', (err, result) => { 
        setJWT(result);
        console.log(jwt);
      });
      AsyncStorage.getItem('u_idx', (err, result) => { 
        setidx(result);
        console.log(idx);
      });
    })();

  }, []);


  useEffect(() => {
    (async() => {
      if(uid != '' && jwt != null && idx != null)
      {
        axios.get('https://prod.asherchiv.shop/app/users?user-id=' + uid)
        .then(function (response)
        {
          //console.log(response.data.contents[0])
          setStatus(response.data.contents[0].user_company_status)
          setLat(response.data.contents[0].user_lat)
          setLon(response.data.contents[0].user_lng);
        })
        .catch(function (error)
        {
          console.log(error);
        })

        console.log('status, lat, lng, idx : ' + status + " " + lat + " " + lon + " " + idx)
        const config = {
          headers: { 'X-ACCESS-TOKEN': jwt }
        };
        axios.get('https://prod.asherchiv.shop/app/jobs?user=' +  idx, config)
        .then(function (response){
          console.log(response.data.contents)
          setJoblist(response.data.contents);
        })
        .catch(function (error){
          console.log(error)
        })
      }
      
    })();
    
  }, [idx]);
 


  useEffect(() => {
    console.log(job_list)
  }, [job_list])

  useEffect(()=>{
    console.log("jwt: " + jwt + " uid: " + uid + " idx : " + idx)
  }, [uid, jwt, idx])

  const getLocation = async() => {
    const {coords : {latitude, longitude},} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps :false });
    console.log(location[0].region);
    console.log(latitude + " " + longitude);
    setLatitude(latitude);
    setLongitude(longitude);
  }

  useEffect(() => {
    (async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      console.log(permission.granted);
      if(!permission.granted)
      {
        setOK(false);
      }
      else
      {
        setOK(true);
      }
      
      getLocation();
      
      setLocation(location);
      //setInitialRegion(location);
    })();
  }, []);

  const titleJumper = (str)=>{
    setTitle(str);
    console.log(title);
    navigation.navigate('구인상세', {'name' : sel_title, 'idx' : sel_idx, 'status' : status})
  }
  const callPage = (param) => { //추후 매개변수에 idx 추가할 것
    return (
      <Text>
        <JobInfo title = {param}></JobInfo>
      </Text>
    )
  }

  const markerSetter = (title, addr, wage, detail, work, idx, lat, lon) => {
    setStitle(title);
    setSaddr(addr)
    setSwage(wage)
    setSdetail(detail)
    setSwork(work)
    setSIdx(idx)
    if(route.params.mode == 0)
    {
      setLat(lat)
      setLon(lon)
    }
    else{
      setLatitude(lat)
      setLongitude(lon)
    }
    
  
  }

  return (
    <View style={styles.container}>
      <View style = {{top : '7%'}}>
  
      <View style = {{flexDirection : 'row'}}>
        <Text style = {{fontFamily : 'IBMMe',  alignSelf : 'center', fontSize : 22, top : '2%'}}>구직 정보 찾기</Text>
      </View>
 
      <View style = {{borderWidth : 3, 
        borderRadius : 5,
        borderColor : theme.mColor,
        width : WidthAndHeight.windowWidth*0.9, 
        height : WidthAndHeight.windowHeight*0.50,
        top : '3%' }}>
      <MapView
        
        initialRegion={{
          latitude : route.params.mode == 0 ? lat : lati,
          longitude : route.params.mode == 0 ? lon : longi,
          latitudeDelta : 0.3,
          longitudeDelta : 0.3,
        }}
        region = {{
          latitude : route.params.mode == 0 ? lat : lati,
          longitude : route.params.mode == 0 ? lon : longi,
          latitudeDelta : 0.3, 
          longitudeDelta :0.3}}
        style={[styles.map]}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE}

      >
      {job_list ? job_list.map((info) =>  <Marker key = {info.job_idx}
          coordinate={{latitude : info.job_lat, longitude : info.job_lng}}
          title= {info.job_title}
          description={info.job_detail}
          onPress={() => markerSetter(info.job_title, info.job_sinm, info.job_wage, info.job_detail, info.job_working_time, info.job_idx, info.job_lat, info.job_lon )}
          //(title, addr, wage, detail, work)
        />)
      :
      job_list
      }
       
        
      </MapView>


      </View>
     
      
      <StatusBar style="auto" />
    </View>



    <TouchableOpacity style = {{position : 'absolute', bottom : '12%',}}
    onPress = {() => titleJumper(sel_title)}
    >
      
      <View style = {styles.grid} >

          <Text style = {{fontSize : 15, fontFamily : 'IBMMe' }}>
            {sel_addr ? sel_addr : '주소 정보가 없네요...'}
          </Text>
          <Text style = {{fontSize : 20, fontFamily : 'IBMMe' }}>
            {sel_title ? sel_title :'공고 제목이 따로 없습니다.'}
          </Text>
          
          <View style= {styles.flexRow}>
          <Entypo name="dot-single" size={24} color="black" />
          <Text style = {{fontFamily : 'IBMMe', fontSize : 17}}> 
            급여 : {sel_wage ? sel_wage : '급여 정보가 없습니다.'}
          </Text>
          </View>
          <View style= {styles.flexRow}>
          <Entypo name="dot-single" size={24} color="black" />
          <Text style = {{fontFamily : 'IBMMe', fontSize : 17}}> 
            근무지역 : {sel_addr ? sel_addr : '근무 지역 정보가 없습니다..'}
          </Text>
          </View>
          <View style= {styles.flexRow}>
          <Entypo name="dot-single" size={24} color="black" />
          <Text style = {{fontFamily : 'IBMMe', fontSize : 17}}> 
            근무시간 : {sel_work_time ? sel_work_time : '근무 시간 정보가 없습니다..'}
          </Text>
          </View>
          <View style= {styles.flexRow}>
          <Entypo name="dot-single" size={24} color="black" />
          <Text style = {{fontFamily : 'IBMMe', fontSize : 17}}> 
            기타 : {sel_detail}
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
    width: Dimensions.get('window').width*0.885,
    height: Dimensions.get('window').height*0.495,
  },
  grid : {
    width: Dimensions.get('window').width*0.8,
    height: Dimensions.get('window').height*0.25,
    borderWidth : 2,
    borderColor : 'white',
    borderTopColor : theme.mColor,
    
  },
  flexRow : {
    flexDirection : 'row',
    alignContent : 'center'
  }
});
