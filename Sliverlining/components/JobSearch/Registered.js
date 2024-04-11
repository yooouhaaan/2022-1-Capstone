import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from '../../shared/header';
import { WidthAndHeight } from '../../shared/Dimension';
import { theme } from '../../shared/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const windowHeight = WidthAndHeight.windowHeight;
const windowWidth = WidthAndHeight.windowWidth;

export default function Registered({navigation}) {
  const [jwt, setJWT] = useState(null);
  const [clist, setClist] = useState(null);//초기 모든 리스트
  const [alist, setAlist] = useState([]);//조정된 모집중인 공고 리스트
  const [flist, setFlist] = useState([]);//조정된 모집완료된 공고 리스트
  const [id, setId] = useState('');
  const [idx, setidx] = useState(null);
    
  useEffect(async() => {
    await AsyncStorage.getItem('user_jwt', (err, result) => { 
      setJWT(result);
      console.log('userjwt : ' + result);
    });
    const config = {
        headers: { 'X-ACCESS-TOKEN': jwt }
    };
    await AsyncStorage.getItem('u_idx', (err, result) => { 
      setidx(parseInt(result));
      console.log('u_idx : ' + result);
      console.log(jwt);
      axios.get('https://prod.asherchiv.shop/app/jobs?publisher=' + result, config)
      .then(function (response){
          console.log(response.data)
          setClist(response.data.contents);

      })
      .catch(function (error){
          console.log(error);
      })
    });
    
  }, [jwt, id])

  useEffect(() => {
    let arr = [];
    let farr = [];
    if(clist!=null)
    {
        for(let i = 0; i<clist.length; i++)
        {
            if(clist[i].job_offer_status == 1)
            {
                arr.push(clist[i]);
                console.log('clist: ' + clist[i].job_title);
            }
            else{
                farr.push(clist[i])
                console.log('clist: ' + clist[i].job_title);
            }
        }
        setAlist(arr);
        setFlist(farr);
    }
   
    //const result = clist.filter(item => item.job_offer_status == 1);
    //console.log(result);
  }, [clist])
  
  useEffect(() => {
      console.log('alist:' + alist);
      console.log('flist:' + flist)
  }, [alist, flist]);
  

  return (
    <View style={styles.container}>
        <Header str = "나의 구인글 조회" width = '250'>
        </Header>

        <Text style = {{
                    left : '10%', 
                    fontFamily : 'IBMMe', 
                    fontSize : 20,
                    }}>모집 중</Text>
        <SafeAreaView>
            <ScrollView style = {styles.gathering}> 
                { alist ? alist.map((comp) =>  <TouchableOpacity key={comp.job_idx}
                onPress={() => navigation.navigate('구인상세', {name : comp.job_title, idx : comp.job_idx, status : 1})}
                style = {{marginVertical : 10}}>  
                <View>
                <View style = {{flexDirection : 'row', borderWidth : 2, borderColor : 'white', borderBottomColor : theme.mColor, width : WidthAndHeight.windowWidth*0.5}}>
                    <Text style = {{fontSize : 21}}>{comp.job_title} </Text>
                </View>
                </View>                                            
                </TouchableOpacity>)
                :
                alist
                }
                    

               
            </ScrollView>
        </SafeAreaView>

        <Text style = {{
                    left : '10%', 
                    fontFamily : 'IBMMe', 
                    fontSize : 20,
                    }}>모집 완료</Text>
        <SafeAreaView>
            <ScrollView style = {styles.gathering}>
            { flist ? flist.map((comp) =>  <TouchableOpacity key={comp.job_idx}
                onPress={() => navigation.navigate('구인상세', {name : comp.job_title, idx : comp.job_idx, status : 1})}
                style = {{marginVertical : 10}}>  
                <View>
                <View style = {{flexDirection : 'row', borderWidth : 2, borderColor : 'white', borderBottomColor : theme.mColor, width : WidthAndHeight.windowWidth*0.5}}>
                    <Text style = {{fontSize : 21}}>{comp.job_title} </Text>
                </View>
                </View>                                            
                </TouchableOpacity>)
                :
                flist
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
  },
  gathering : {
    borderWidth : 3,
    borderColor : theme.mColor,
    width : windowWidth*0.8,
    height: windowHeight*0.3,
    alignSelf : 'center',
    paddingLeft : '3%',
    borderRadius : 5,
  }
});
