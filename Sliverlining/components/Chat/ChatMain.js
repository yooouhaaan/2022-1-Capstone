import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, Modal, Pressable, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Alert} from 'react-native';
import Header from '../../shared/header';
import { theme } from '../../shared/theme';
import { WidthAndHeight } from '../../shared/Dimension';
import {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { WebView } from 'react-native-webview';
const windowHeight = WidthAndHeight.windowHeight;
const windowWidth = WidthAndHeight.windowWidth;
import { FontAwesome5, Ionicons } from '@expo/vector-icons';



export default function ChatMain({navigation}) {
    const [contents, setContents] = useState(null);

    const [idx, setidx] = useState(null);
    const [uid, setUid] = useState('');
    const [jwt, setJWT] = useState(null);
    const [otherName, setOtherName] = useState('');
    const [otherIdx, setOtherIdx] = useState(0);
    let phone = '';

    const print_phone = (val) => {
      phone = val;
      console.log(phone);
    }
    useEffect(() => {
      console.log(otherIdx + " " + otherName)
    }, [otherIdx, otherName])

    useEffect(() => {
        (async () => {
            AsyncStorage.getItem('user_id', (err, result) => { 
              setUid(result);
              console.log("uid: "+uid);
            });
            AsyncStorage.getItem('user_jwt', (err, result) => { 
              setJWT(result);
              console.log("jwt: "+jwt);
              if(result  == undefined)
              {
                Alert.alert('알림', '로그인 하시지 않으면 사용할 수 없습니다', [
                  {
                    text : '확인',
                    onPress : () => {
                      navigation.navigate('Title')
                    }
                  }
                ])
              }
            });
            AsyncStorage.getItem('u_idx', (err, result) => { 
              setidx(result);
              console.log("idx: "+idx);
            });
    
          })();
    }, [])

    useEffect(() => {
        console.log('assigned idx : ' +  idx);
    }, [idx])
    useEffect(() => {
        (async() => {
          if(uid != '' && jwt != null && idx != null)
          {
            const config = {
              headers: { 'X-ACCESS-TOKEN': jwt}
            };
            axios.get('https://prod.asherchiv.shop/app/chats/chatrooms?user-idx=' + idx, config)
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

useEffect(() => {
    console.log(contents)
}, [contents])



const ModalButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('이걸론 작동 안함 ')
          setModalVisible(!modalVisible)
        }}>
        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <Text style={{...styles.modalText,  fontSize : 28, borderColor : 'white', borderBottomColor : theme.mColor}}>
              친구 추가
            </Text>
            <Text style={{...styles.modalText, borderColor : 'white', fontSize : 20, marginBottom : 0, paddingBottom : 0}}>
              '-' 없이 번호 입력
            </Text>
            <View>
            <TextInput style={{...styles.modalText,}}
            placeholder = "상대방 번호 입력"
            keyboardType='number-pad'
            onChangeText={text => print_phone(text)}
            >

            </TextInput>
            </View>
          
            <Pressable
              style={{...styles.button, ...styles.buttonClose, marginBottom: 15}}
              onPress={() => {
              
                
                axios.get('https://prod.asherchiv.shop/app/chats/users?user-phone=' + phone,
                  {
                    headers: { 'X-ACCESS-TOKEN': jwt }         
                  }
                  )
                  .then(function (response) {
                    console.log(response.data)
                    setOtherIdx(response.data.contents.user_idx);
                    setOtherName(response.data.contents.user_name)
                    let oname = response.data.contents.user_name;
                    let oidx = response.data.contents.user_idx;
                    console.log(otherIdx + " " + phone + " " + otherName)
                    console.log(oidx + " " + phone + " " + oname)
                    Alert.alert('친구추가 하시겠어요?', '상대방 전화번호 :\n' + phone,[
                      {
                        text : '친구 추가',
                        onPress : () => {
                          console.log('myidx : ' + idx + " otheridx : " + oidx )
                          axios.post('https://prod.asherchiv.shop/app/chats/chatrooms',   {
                            'my_idx' : idx,  
                            'other_idx' : oidx
                            },
                            {
                              headers: { 'X-ACCESS-TOKEN':jwt}         
                            })
                            .then(function (response) {
                              
                             console.log(response.data)
                             if(response.data.isSuccess == true)
                             {
                              Alert.alert('알림', '친구 추가 완료!', [
                                {
                                  text : '확인'
                                }
                              ]);
                              const config = {
                                headers: { 'X-ACCESS-TOKEN': jwt}
                              };

                              axios.get('https://prod.asherchiv.shop/app/chats/chatrooms?user-idx=' + idx, config)
                              .then(function (response){
                                console.log(response.data.contents)
                                setContents(response.data.contents);
                              })
                              .catch(function (error){
                                console.log(error)
                              })
                             }
                             else if(response.data.code == 2012)
                             {
                              Alert.alert('알림', '이미 등록된 친구에요!', [
                                {
                                  text : '확인'
                                }
                              ]);
                             }
                             else{
                              Alert.alert('알림', '전화번호를 다시 확인하세요.', [
                                {
                                  text : '확인'
                                }
                              ]);
                             }
                           
                            })
                        }
                      },
                      {
                        text :'아니오',
                        style : 'cancel'
                      }
                    ])
                  
                    
                    
                  })
                  .catch(function (error){
                    console.log(error);
                  })
              }}>
              <Text style={styles.textStyle}>친구 등록</Text>
            </Pressable>
        
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>닫기</Text>
            </Pressable>

          </View>
          
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>친구 추가</Text>
      </Pressable>
    </View>
  );
}

  return (
    <View style={styles.container}>
       <View style = {{position : 'absolute', top : '6%', right : '10%',}}>
      <TouchableOpacity onPress = {() => navigation.navigate('마이페이지')}>
        <Ionicons name="person-circle-outline" size={65} color={theme.mColor}/>
      </TouchableOpacity>
  
      </View>
  
    <View style = {{left : '10%'}}>
    <Text style = {{...styles.bannerText, 
        fontSize : 40, 
        fontFamily : 'Sans',
        marginVertical : 10
        }}>SilverLining</Text>
    </View>
    <Text style = {{fontSize : 16, left : '10%', fontFamily : 'IBMMe'}}>당신의 홀로 서기를 돕습니다.</Text>
    
    <View style = {{borderWidth : 1, width : windowWidth*0.5, left :'10%', marginBottom : 10, borderColor : theme.mColor}}></View>
    <View style = {{flexDirection : 'row', left : '5%'}}>
    <FontAwesome5 name="user-friends" size={45} color="black" />
    <View style = {{flexDirection : 'row'}}>
    <Text style = {{ fontFamily : 'IBMMe', fontSize : 25, marginLeft : 20}}>나의 친구 목록</Text>
    <Text>{'\t\t\t'}</Text><ModalButton></ModalButton>
   
    </View>
 
  
    </View>
    

        <SafeAreaView>
            <ScrollView style = {styles.gathering}
     
            horizontal
            persistentScrollbar = {false}
            showsHorizontalScrollIndicator       
            contentContainerStyle = {{}}
            > 
            {contents != null ? contents.map((info) =>   <TouchableOpacity key  = {info.chatroom_idx} style = {{marginTop : 10}} onPress = {() => 
            {   
                Alert.alert('옵션', '다음 중 선택해주세요', [
                 {
                    text : "친구와 이야기",
                    onPress : () => {
                        navigation.navigate('관계단절채팅', { 
                        'url' : "http://43.200.81.158/chat.html?user-idx=" + info.my_idx + "&user-name=" + info.my_name + "&room-num=" + info.chatroom_idx + "&other-name=" + info.other_name
        
                        })
                    }
                 },
                 {
                    text : "친구 삭제",
                    onPress : () => {
                        Alert.alert('경고', '정말로 해당 친구를 삭제하시겠어요?\n: ' + info.other_name, [
                            {
                                text : '친구 삭제',
                                onPress : () => {
                                    const config = {
                                        headers: { 'X-ACCESS-TOKEN': 'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWR4IjoxLCJpYXQiOjE2NTM4MDg2ODcsImV4cCI6MTY1NTI3OTkxNn0.0F-VQ5N4YjiNAHaEZpqADtQ60KaHCJ2j6vhLfpPVLFs'}
                                      };
                                    axios.delete('https://prod.asherchiv.shop/app/chats/chatrooms/' + info.chatroom_idx, config)
                                    .then(function(response) {
                                        console.log(response);
                                        const config = {
                                          headers: { 'X-ACCESS-TOKEN': jwt}
                                        };
          
                                        axios.get('https://prod.asherchiv.shop/app/chats/chatrooms?user-idx=' + idx, config)
                                        .then(function (response){
                                          console.log(response.data.contents)
                                          setContents(response.data.contents);
                                        })
                                        .catch(function (error){
                                          console.log(error)
                                        })
                                        Alert.alert('알림', '친구 삭제가 완료되었습니다.')
                                    })
                                }
                            },
                            {
                                text : '취소',
                                style : 'cancel'
                            }
                        ])
                    }
                 },
                 {
                    text : '취소',
                    style : 'cancel'
                 }

                ])
            }
                }>  
                    <View>
                        <View style = {{ 
                          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                          width: Dimensions.get('window').width * 0.4,
                          height: Dimensions.get('window').width * 0.4,
                          backgroundColor: theme.mColor,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal : 15,
                        }}>
                        <Text style = {{paddingRight : 10, fontFamily : 'IBMMe',fontSize : 32, fontFamily : 'IBMMe', color :'white'}}> {info.other_name}</Text>
                        
                        </View>
                    </View>                                           
                </TouchableOpacity>)
            :
             <Text style = {{marginLeft : '10%', fontSize : 32, justifyContent : 'center', alignSelf : 'center'}}>"친구가 없습니다."</Text>
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
    marginTop : 10,
    borderTopWidth :3,
    borderBottomWidth : 3,
    borderTopColor : theme.mColor,
    borderBottomColor : theme.mColor,
    height: windowHeight*0.25,
    alignSelf : 'center',
    
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: windowHeight*0.5,
    width: windowWidth*0.6,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: theme.mColor,
  },
  buttonClose: {
    backgroundColor: theme.mColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize :  18,
    width : windowWidth*0.22
  },
  modalText: {
    borderWidth : 3,
    marginBottom: 15,
    textAlign: 'center',
    fontSize : 15,
    fontFamily : 'IBMMe',
    height: 60,
    padding : 5,
    borderRadius : 5,
    borderColor : theme.mColor
  },
});
