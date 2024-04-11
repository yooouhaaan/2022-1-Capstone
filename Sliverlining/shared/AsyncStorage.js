import AsyncStorage from '@react-native-async-storage/async-storage';
 
// 자료 저장하기
export const storeData = async (key, tasks) => {
  try {
    // 'tasks' 라는 항목에 tasks 저장
    await AsyncStorage.setItem(key, JSON.stringify(tasks));
  } catch (e) {
    // saving error
  }
}
 
// 자료 불러오기
export const getData = async (key) => {
  try {
    // 'tasks'항목에 저장된 자료 
    const loadedData = await AsyncStorage.getItem(key);
    // 자료가 없을 때 에러가 뜨지 않도록 빈객체를 반환하도록 한다
    setTasks(JSON.parse(loadedData) || "{}");
  } catch(e) {
    // error reading value
  }
}

AsyncStorage.getItem('address', (err, result) => { //user_id에 담긴 아이디 불러오기
    console.log(result); // result에 담김 //불러온거 출력
  })
/*
  AsyncStorage.setItem('address', data.roadAddress, () => {
    console.log(data.roadAddress + "가 저장되었습니다!");
  }); */