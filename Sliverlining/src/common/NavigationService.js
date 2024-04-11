import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) { //다른 스크린으로 이동하고 데이터 주고받기
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    )
}

function back() {  //이전 스크린으로 돌아가기
    _navigator.dispatch(
        NavigationActions.back()
    );
}

export default {
    navigate,
    setTopLevelNavigator,
    back,
};