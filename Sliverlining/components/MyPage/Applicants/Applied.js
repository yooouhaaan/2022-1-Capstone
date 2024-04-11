
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';

import { theme } from '../../../shared/theme';
import { WidthAndHeight } from '../../../shared/Dimension';
import {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
const windowHeight = WidthAndHeight.windowHeight;
const windowWidth = WidthAndHeight.windowWidth;
import { Ionicons } from '@expo/vector-icons';
export default function Applied({navigation}) {
    const [contents, setContents] = useState([]);
    const [titles, setTitles] = useState([]);
    const [idx, setidx] = useState(null);
    const [uid, setUid] = useState('');
    const [jwt, setJWT] = useState(null);

    useEffect(() => {
        (async () => {
            AsyncStorage.getItem('user_id', (err, result) => { 
              setUid(result);
              console.log("uid: "+uid);
            });
            AsyncStorage.getItem('user_jwt', (err, result) => { 
              setJWT(result);
              console.log("jwt: "+jwt);
            });
            AsyncStorage.getItem('u_idx', (err, result) => { 
              setidx(result);
              console.log("idx: "+idx);
            });
          })();
    }, [])

    useEffect(() => {
        (async() => {
          if(uid != '' && jwt != null && idx != null)
          {
            const config = {
              headers: { 'X-ACCESS-TOKEN': jwt }
            };
            axios.get('https://prod.asherchiv.shop/app/users/' + idx + '/applications', config)
            .then(function (response){
              console.log(response.data.contents)
              setContents(response.data.contents);
            })
            .catch(function (error){
              console.log(error)
            })
          }
          
        })();
        
      }, [idx]);

  return (
    <View style={styles.container}>
       <View style = {{position : 'absolute', top : '6%', right : '10%', flexDirection : 'row'}}>
      <TouchableOpacity onPress = {() => navigation.navigate('마이페이지')}>
        <Ionicons name="person-circle-outline" size={60} color={theme.mColor}/>
        <Text style = {{fontFamily : "IBMMe"}}>마이페이지</Text>
      </TouchableOpacity>
    
      </View>
      
    <View style = {{left : '10%'}}>
    <Text style = {{...styles.bannerText, 
        fontSize : 35, 
        fontFamily : 'Sans',
        marginVertical : 15
        }}>SilverLining</Text>
    </View>
    <Text style = {{fontSize : 16, left : '10%', fontFamily : 'IBMMe'}}>당신의 홀로 서기를 돕습니다.</Text>
    
    <View style = {{borderWidth : 1, width : windowWidth*0.5, left :'10%', marginBottom : 10, borderColor : theme.mColor}}></View>
    <Text style = {{left : '10%', fontFamily : 'IBMMe', fontSize : 18}}>내가 지원한 공고</Text>
        <SafeAreaView>
            <ScrollView style = {styles.gathering}> 
            {contents? contents.map((info) =>   <TouchableOpacity key  = {info.job_idx} style = {{marginTop : 10}} 
            onPress = {() => 
            {   
                navigation.navigate('구인상세', 
                    {
                    'name' : info.job_title, 'idx' : info.job_idx, 'status' : 0
                    })
            }
                }>  
                    <View>
                        <View style = {{ width : windowWidth*0.75, borderWidth : 2, borderColor : 'white', borderBottomColor : theme.mColor,}}>
                            <Text style = {{fontFamily : 'IBMMe',fontSize : 22, fontFamily : 'IBMMe'}}>{info.job_title}</Text>
                          
                            <Text style = {{fontFamily : 'IBMMe',fontSize : 15, fontFamily : 'IBMMe'}}>- 업체명 : {info.company_name}</Text>
                        </View>
                    </View>                                           
                </TouchableOpacity>)
            :
            contents
            }
               
            </ScrollView>
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  gathering : {
    borderWidth : 3,
    borderColor : theme.mColor,
    width : windowWidth*0.85,
    height: windowHeight*0.73,
    alignSelf : 'center',
    paddingLeft : '3%',
    borderRadius : 5,
  }
});
