import axios from "axios";
import forceLogout from "../modules/auth/forceLogout";
import requestPopupOpen from "../actions/popup/requestPopupOpen";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "../recoil/recoil";

export const backendUrl = "https://dating.batro.org/";
export const backendWss = "wss://dating.batro.org/";


//kakao login 
export const kakaoLoginUrl = backendUrl + "auth/kakao/login";
export const kakaoLogoutUrl = backendUrl + "auth/kakao/logout";

//instagram login
export const instagramLoginUrl = backendUrl + "auth/instagram/login";

export const customAxios = axios.create();
let cancelTokenSource = axios.CancelToken.source();

// 이전 요청 취소 함수
export const cancelPreviousRequests = () => {
  cancelTokenSource.cancel('Page navigation occurred');
  cancelTokenSource = axios.CancelToken.source();
};

const responseMiddleware = (response) => {
  if (response.data.code <= 300) {
    // 성공한 요청중에 300 보다 작은 요청 핸들링
    // 원하는 작업을 수행
  }else{
    switch(true){
      case [506,507,511].includes(response.data.code) :
        requestPopupOpen("",response.data.message,"confirm",forceLogout);
        break;
      default:
        requestPopupOpen("",response.data.message,"cancel",()=>{});
        break;
    }
  }
  return response;
};

customAxios.interceptors.response.use(
  (response) => responseMiddleware(response),
  (error) => {
    // 에러 처리
    //popup 올리셈
    // console.log(JSON.stringify(error))
    return Promise.reject(error);
  }
);

const postRequest = (path,body) => {
    let { token, socket_id } = getRecoil(userAtom);
    let payload = {
      token: token,
      socket_id: socket_id,
      ...body
    }
    return customAxios.post(backendUrl+path,payload,{ cancelToken: cancelTokenSource.token });
}

const getRequest = (path,body) => {
    return customAxios.get(backendUrl+path,{ cancelToken: cancelTokenSource.token });
}

export const healthCheck = (data={}) => {
  return postRequest("test/health",{foo: "bar",...data});
}

export const kakaoLoginVerify = (data) => {
  return postRequest("auth/kakao/loginVerify",data);
}

export const tokenLogin = (data) => {
  return postRequest("auth/token/login",data);
}

export const registerChatRoom = (data) => {
  return postRequest("chat/register_chat_room",data);
}

export const getChatRoom = (data) => {
  return postRequest("chat/get_chat_room",data);
}

export const getChat = (data) => {
  return postRequest("chat/get_chat",data);
}

export const registerChat = (data) => {
  return postRequest("chat/register_chat",data);
}



// 1.231.159.76
