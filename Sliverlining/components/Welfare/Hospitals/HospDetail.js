import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons,  MaterialCommunityIcons,  FontAwesome, Ionicons } from '@expo/vector-icons'; 
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import MyPageIconHeader from '../../../shared/MyPageIconHeader';
import { theme } from '../../../shared/theme';
import { WidthAndHeight } from '../../../shared/Dimension';
import { useState, useEffect } from 'react';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
const windowHeight = WidthAndHeight.windowHeight;
const windowWidth = WidthAndHeight.windowWidth;
export default function HospDetail({route, navigation}) {
  const [title, setTitle] = useState('');
  const [lati, setLatitude] = useState(0);
  const [longi, setLongitude] = useState(0);
  const [location, setLocation] = useState(null);
  const [ok, setOK] = useState(true);

  const [name, setName] = useState('')
  const [kind, setKind] = useState('')
  const [phone, setPhone] = useState('')
  const [addr, setAddr] = useState('')
  const [place, setPlace] = useState('')
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    //{'name' : hosp_name, 'kind' : hosp_kind, 'phone' : hosp_phone, 'addr' : hosp_addr, 'place' : hosp_placeurl, 'lat' : lat, 'lon' : lon})
    setName(route.params.name)
    setKind(route.params.kind)
    setPhone(route.params.phone)
    setAddr(route.params.addr)
    setPlace(route.params.place)
    setLat(route.params.lat)
    setLon(route.params.lon)
  }, [name, kind, phone, addr, place])


  useEffect(() => {
    setTitle(route.params.name);
    console.log(title);
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
      })();
  }, [title])

 

  const getLocation = async() => {
    const {coords : {latitude, longitude},} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps :false });
    console.log(location[0].region);
    console.log(latitude + " " + longitude);
    setLatitude(latitude);
    setLongitude(longitude);
  }

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
        
        <View style = {{marginVertical : '3%', marginLeft : '7%'}}>
            <Text style = {{fontSize : 23, fontFamily : 'IBMMe'}}>{name}</Text>
            <Text style ={{ fontSize : 12, fontFamily : 'IBMMe'}}>{kind}</Text>
        </View>

        <View style ={{borderWidth : 3,  borderColor : theme.mColor}}></View>
       
        <View style = {{left : '10%'}}>
        <View style = {{...styles.locaInfo}}>
            <View style = {styles.infoBox}>
                <FontAwesome name="phone" size={45} color="black" />

                <Text style = {{alignSelf : 'center',
                 position: 'absolute',
                 left : '20%', 
                 fontFamily : 'IBMMe',
                 fontSize : 20
                 }}>
                    {phone}
                </Text>

                <TouchableOpacity style = {{
                backgroundColor : theme.mColor,
                position: 'absolute',
                right : '1%',
                borderRadius :10,
                height : 50,
                justifyContent : 'center',
                alignItems :'center',
                marginTop : 10,
                width : 70
                }}
                onPress = {() => { Linking.openURL(`tel:${phone}`)}}
                >

                <Text style = {{fontSize : 15, color : 'white', fontSize : 16, fontFamily : 'IBMMe'}}>
                  전화
                </Text>
                
                </TouchableOpacity>

            </View>
            <View style = {styles.infoBox}>
            <FontAwesome name="map-marker" size={45} color="black" />
                <Text style = {{alignSelf : 'center',
                 position: 'absolute',
                 left : '20%',
                 fontFamily : 'IBMMe',
                 fontSize : 20
                 }}>
                    {addr}
                </Text>
            </View>
            <View style ={styles.infoBox}>
            <FontAwesome name="info-circle" size={45} color="black" />
                <Text style = {{alignSelf : 'center',
                 position: 'absolute',
                 left : '20%',
                 fontFamily : 'IBMMe',
                 fontSize : 20
                 }}>
                    {kind}
                </Text>
            </View>
            <View style ={styles.infoBox}>
            <FontAwesome name="link" size={45} color="black" />
                <Text style = {{alignSelf : 'center',
                 position: 'absolute',
                 left : '20%',
                 fontFamily : 'IBMMe',
                 fontSize : 20
                 }}
                 onPress={() => {
                  Linking.openURL(`${place}`);
                }}
                >
                    웹 브라우저에서 정보 보기
                </Text>
            </View>
            
        </View>
        
      </View>
    
      <View style = {{borderWidth : 3, 
        borderRadius : 5,
        borderColor : theme.mColor,
        alignSelf : 'center',
        width: windowWidth*0.7,
        height: windowHeight*0.25,
        position: 'absolute',
        bottom : '10%',
        }}
        >
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
          longitudeDelta : 0.05
        }}
        style={[styles.map]}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE}
      >
        
        <Marker
          coordinate={{latitude : lat, longitude : lon}}
          title= {name}
          description= {addr}
          onPress={() => {console.log('1번 체크 확인')}}
        />
      </MapView>
            
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
  locaInfo : {
      marginVertical : '5%',
      height : windowHeight*0.5,
  },
  infoBox : {
    flexDirection : 'row', 
    paddingVertical : 10,
    borderWidth : 2,
    borderColor : 'white',
    borderBottomColor : theme.mColor,
    width : windowWidth*0.8
  },
  map: {
    width: windowWidth*0.685,
    height: windowHeight*0.242
  },
});
