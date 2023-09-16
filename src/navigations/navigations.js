import { useNavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';

export const RootNavigationRef = React.createRef(null);
export const GNBNavigationRef = React.createRef(null);

export const getRootNavigation = () => {
    return RootNavigationRef.current;
} 

export const getGNBNavigation = () => {
    return GNBNavigationRef.current;
} 

    //네비 구조
    //RootStack  내부에 스크린들, GNB 위치
    // GNB는 각각의 Tab에 해당하는 StackNavigation들이 위치
    // 총 3종 계층구조
            
    // import * as WholeNavigation from '../../navigation/Navigations';
    // WholeNavigation.getRootNavigation() ---> RootStack 네비 가져옴
    // WholeNavigation.getGNBNavigation() ---> GNB 네비 가져옴
    // WholeNavigation.getInnerGNBNavigation() ---> GNB 내부 stack 네비 가져옴 
    
    // GNB 바꿀땐 WholeNavigation.getGNBNavigation() 사용
    // GNB 특정 탭에서 같은 GNB 탭의 다른 페이지로 이동하려면 WholeNavigation.getInnerGNBNavigation() 사용
    // GNB에 종속적이지 않은 페이지로 이동 WholeNavigation.getRootNavigation() 사용 


    //일반 네비게이션 방식
    //navigate
    // navigation.navigate('Splash',{hi: 123});

    //reset
    // navigation.reset({routes: [{name: 'Test',params: {hi: 123}}]});

    //replace
    // navigation.replace("Test",{params: "test"});

    //연속 네비게이션 방식  navigationIterator 사용
    //queue item ==> [navigationCall function,navigation function,parameters]
    // ex)  WholeNavigation,navigationIterator([
    //          [WholeNavigation.getRootNavigation, "reset", {routes: [{name: 'Splash1',params: {hi: 123}}]}] ,
    //          [WholeNavigation.getRootNavigation, "reset", {routes: [{name: 'Splash2',params: {hi: 123}}]}] ,
    //          [WholeNavigation.getRootNavigation, "reset", {routes: [{name: 'Splash3',params: {hi: 123}}]}] ,
    //          ...
    //      ]);
    

/** 
 * @type {파라미터 | 
 *      [
 *          [
 *              네비게이션 받아오는 함수: ex. WholeNavigation.getRootNavigation,
 *              네비게이션에서 실행할 함수: ex. "reset",
 *              네비게이션에서 실행한 함수에 파라미터: ex. {routes: [{name: 'Splash',params: {hi: 123}}]} : "navigate" 함수의 경우 routing Name이 들어옴,
 *              "navigate" 함수의 경우 여기 params가 들어옴, 아니면 입력 X
 *          ]
 *      , ...
 *      ]
 * } 
*/
export const navigationIterator = (queue) => {
    queue.forEach(
        (routingInfo,index)=>{
            setTimeout(()=>{
                if(routingInfo[1]==="navigate"){
                    routingInfo[0]()[routingInfo[1]](routingInfo[2],routingInfo[3]);
                }else{
                    routingInfo[0]()[routingInfo[1]](routingInfo[2]);
                }
            },index*50);
        }
    )
}
