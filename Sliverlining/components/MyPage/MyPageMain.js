import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { theme } from '../../shared/theme';
import React, {useEffect, useState} from 'react';
import {MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; 
import { WidthAndHeight } from '../../shared/Dimension';
import Header from '../../shared/header';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
export default function MyPageMain({navigation}){
    const [idx, setidx] = useState(null);
    const [uid, setUid] = useState('');
    const [jwt, setJWT] = useState(null);
    const [status, setStatus] = useState([]);
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
              console.log(response.data.contents[0])
              setStatus(response.data.contents[0]);
            })
            .catch(function (error)
            {
              console.log(error);
            })
          }
        })();
        
    }, [idx]);

    useEffect(() => {
        console.log(status);
    }, [status])

return (
   
    <View style = {{...styles.container}}>
        <Header width = "250" str = "마이 페이지"></Header>
        <View style= {{borderWidth : 1, marginLeft : '10%', width : WidthAndHeight.windowWidth*0.8,
      borderColor : 'silver'}}></View>

        <TouchableOpacity onPress={() => navigation.navigate('내정보수정')}>
        <View style  = {{...styles.gridBox, }}>
            <View style = {{flexDirection : 'row', marginLeft :'10%', display : 'flex', marginTop : '6%'}}>
                <FontAwesome5 name="address-card" size={50} color="black" />
                <Text style = {{fontSize : 22, fontFamily : 'IBMMe',  paddingTop : 5, marginLeft : '5%'}}>
                    나의 정보 수정
                </Text>
            </View>
        </View>
        </TouchableOpacity>

        {status.user_company_status == 0 ? 
        <TouchableOpacity onPress={() => navigation.navigate('지원한공고')}>
        <View style  = {{...styles.gridBox, }}>
            <View style = {{flexDirection : 'row', marginLeft :'10%', display : 'flex', marginTop : '6%'}}>
                <FontAwesome5 name="briefcase" size={50} color="black" />
                <Text style = {{fontSize : 22, fontFamily : 'IBMMe', paddingTop : 5, marginLeft : '5%'}}>
                    내가 지원한 공고
                </Text>
            </View>
        </View>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => navigation.navigate('작성한구인글')}>
        <View style  = {{...styles.gridBox, }}>
            <View style = {{flexDirection : 'row', marginLeft :'10%', display : 'flex', marginTop : '6%'}}>
                <FontAwesome5 name="briefcase" size={50} color="black" />
                <Text style = {{fontSize : 22, fontFamily : 'IBMMe', paddingTop : 5, marginLeft : '5%'}}>
                    내가 등록한 공고
                </Text>
            </View>
        </View>
        </TouchableOpacity>
        }

        {status.user_company_status == 0 ? 
        <TouchableOpacity onPress={() => navigation.navigate('관심있는공고')}>
        <View style  = {{...styles.gridBox, }}>
            <View style = {{flexDirection : 'row', marginLeft :'10%', display : 'flex', marginTop : '6%'}}>
            <FontAwesome5 name="bookmark" size={50} color="black" />
                <Text style = {{fontSize : 22, fontFamily : 'IBMMe', paddingTop : 5, marginLeft : '5%'}}>
                    내가 관심있는 공고
                </Text>
            </View>
        </View>
        </TouchableOpacity>
        :
        <Text></Text>
        }
        
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    gridBox : {
      borderWidth : 3,
      borderColor : theme.mColor,
      borderRadius : 10,
      backgroundColor : 'white',
      width : WidthAndHeight.windowWidth/1.3,
      height : WidthAndHeight.windowHeight / 7,
      marginLeft : '10%',
      marginTop : '5%',
      paddingTop : 5,
      paddingLeft : 5,
    },
    textStyle : {
        fontSize : 18,
        marginLeft : 3,
        marginVertical : '7%'
    }
  });