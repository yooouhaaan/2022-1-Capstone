import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Home from './components/Home';
import Login from './components/Login/Login';
import Title from './components/Title/Title';
import SignUp from './components/SignUp/SignUp';
import SignedUp from './components/SignUp/SignedUp';
import Main from './components/Main/Main';

import Page1 from './components/SignUp/Pages/page1';
import Page2 from './components/SignUp/Pages/page2';
import Page3 from './components/SignUp/Pages/page3';
import Page4 from './components/SignUp/Pages/page4';
import Page5 from './components/SignUp/Pages/page5';
import Page6 from './components/SignUp/Pages/page6';

import E_Page1 from './components/SignUp/Employer/E_Page1';
import E_Page2 from './components/SignUp/Employer/E_Page2';

import S_Page1 from './components/SignUp/Seeker/S_Page1';
import S_Page2 from './components/SignUp/Seeker/S_Page2';
import S_Page3 from './components/SignUp/Seeker/S_Page3';
import S_Page4 from './components/SignUp/Seeker/S_Page4';
import S_Page5 from './components/SignUp/Seeker/S_Page5';
import S_Page6 from './components/SignUp/Seeker/S_Page6';

import JobMain from './components/JobSearch/JobMain';
import JobMap from './components/JobSearch/JobMap';
import FindEmp from './components/JobSearch/FindEmp';
import JobInfo from './components/JobSearch/JobInfo';
import Resume from './components/JobSearch/Resume';
import Applicants from './components/JobSearch/Applicants';
import AlterInfo from './components/JobSearch/AlterInfo';

import MyPageMain from './components/MyPage/MyPageMain';
import MyInfoEdit from './components/MyPage/MyInfoEdit';
import Applied from './components/MyPage/Applicants/Applied';
import Interested from './components/MyPage/Applicants/Interested';


import FindAddress from './components/Address/FindAddress';
import FindEmpDetail from './components/JobSearch/FindEmpDetail';
import Registered from './components/JobSearch/Registered';
import WelfareMain from './components/Welfare/WelfareMain';
import HospSearch from './components/Welfare/Hospitals/HospSearch';
import InstSearch from './components/Welfare/Institutions/InstSearch';
import HospDetail from './components/Welfare/Hospitals/HospDetail';
import InstDetail from './components/Welfare/Institutions/InstDetail';
import PolicyList from './components/Policy/PolicyList';
import PolicyInfo from './components/Policy/PolicyInfo';

import ChatMain from './components/Chat/ChatMain';
import Chatroom from './components/Chat/Chatroom';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'


const Stack = createNativeStackNavigator();

export default function App() {
  	
  const [isLoadingReady, setIsReady] = useState(false);
  const loadFont = async () => {
    await Font.loadAsync({
      Sans: require("./assets/fonts/Sansation_Light.ttf"),
      IBMEx : require("./assets/fonts/IBMPlexSansKR-ExtraLight.ttf"),
      IBMMe : require("./assets/fonts/IBMPlexSansKR-Medium.ttf"),
    });

    console.log("로딩 완료");
  }
  const onFinish = () => {
    setIsReady(true);
  }
  if(!isLoadingReady)
  {
    return (
      <AppLoading 
      startAsync = {loadFont}
      onError = {console.warn}
      onFinish = {onFinish}/>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Title">
        <Stack.Screen name = "Title" component={Title} options = {{title : '타이틀', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = "홈" component={Home} options = {{title : '홈', headerShown : false }}></Stack.Screen>
        <Stack.Screen name = "로그인" component={Login} options = {{title : '로그인', headerShown : false }}></Stack.Screen>
        <Stack.Screen name = "회원가입" component={SignUp} options = {{title : 'SilverLining', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = "회원가입완료" component={SignedUp} options = {{title : '회원가입 완료!', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = "회원가입1" component={Page1} options = {{title : 'SilverLining', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = "회원가입2" component={Page2} options = {{title : 'SilverLining', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = "회원가입3" component={Page3} options = {{title : 'SilverLining', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = "회원가입4" component={Page4} options = {{title : 'SilverLining', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = "회원가입5" component={Page5} options = {{title : 'SilverLining', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = "회원가입6" component={Page6} options = {{title : 'SilverLining', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = "메인" component={Main} options = {{title : '메인페이지', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '고용자가입' component={E_Page1} options = {{title : '고용자가입', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '고용자가입2' component={E_Page2} options = {{title : '고용자가입2', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '일반이용자가입' component={S_Page1} options = {{title : '일반이용자 가입', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '주소입력' component={Page5} options = {{title : '가입선택지', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '보호자번호' component={S_Page2} options = {{title : '보호자번호', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '직업이력' component={S_Page3} options = {{title : '직업이력', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '보험여부' component={S_Page4} options = {{title : '보험여부', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '소득수준' component={S_Page5} options = {{title : '소득수준', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '추가정보' component={S_Page6} options = {{title : '추가정보', headerShown : false}} ></Stack.Screen>

        <Stack.Screen name = '구인메인' component={JobMain} options = {{title : '구인메인', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '구인지도' component={JobMap} options = {{title : '구인지도', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '공고' component={JobMain} options = {{title : '구인메인', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '구인상세' component={JobInfo} options = {{title : '구인상세', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '이력서' component={Resume} options = {{title : '이력서', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '공고등록' component={FindEmp} options = {{title : '공고 등록', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name = '주소찾기' component={FindAddress} options = {{title : '주소 찾기', headerShown : false}} ></Stack.Screen>
        <Stack.Screen name  = '구인글등록' component={FindEmpDetail} options = {{title : '구인글등록', headerShown : false}}></Stack.Screen>
        <Stack.Screen name  = '작성한구인글' component={Registered} options = {{title : '작성글목록', headerShown : false}}></Stack.Screen>
        <Stack.Screen name  = '지원자목록' component={Applicants} options = {{title : '지원자목록', headerShown : false}}></Stack.Screen>
        <Stack.Screen name  = '구인글수정' component={AlterInfo} options = {{title : '구인글수정', headerShown : false}}></Stack.Screen>

        <Stack.Screen name  = '복지메인' component={WelfareMain} options = {{title : '복지메인', headerShown : false}}></Stack.Screen>
        <Stack.Screen name  = '병원찾기' component={HospSearch} options = {{title : '병원찾기', headerShown : false}}></Stack.Screen>
        <Stack.Screen name  = '복지찾기' component={InstSearch} options = {{title : '복지찾기', headerShown : false}}></Stack.Screen>
        <Stack.Screen name  = '병원상세' component={HospDetail} options = {{title : '병원상세', headerShown : false}}></Stack.Screen>
        <Stack.Screen name  = '복지상세' component={InstDetail} options = {{title : '복지상세', headerShown : false}}></Stack.Screen>
        <Stack.Screen name  = '정책메인' component={PolicyList} options = {{title : '정책메인', headerShown : false}}></Stack.Screen>
        <Stack.Screen name  = '정책정보' component={PolicyInfo} options = {{title : '정책정보', headerShown : false}}></Stack.Screen>

        <Stack.Screen name = '마이페이지' component={MyPageMain} options = {{title : '마이페이지', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = '내정보수정' component={MyInfoEdit} options = {{title : '내정보수정', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = '지원한공고' component={Applied} options = {{title : '지원한공고', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = '관심있는공고' component={Interested} options = {{title : '관심있는 공고', headerShown : false}}></Stack.Screen>

        <Stack.Screen name = '관계단절메인' component={ChatMain} options = {{title : '관계단절메인', headerShown : false}}></Stack.Screen>
        <Stack.Screen name = '관계단절채팅' component={Chatroom} options = {{title : '관계단절채팅', headerShown : false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
