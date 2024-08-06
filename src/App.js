import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import LoginPage from "./loginPage/LoginPage";
import Hompage from "./homepage/HomePage";
import DiaryListPage from "./diaryListPage/DiaryListPage";
import ChatbotPage from "./chatbotPage/ChatbotPage";
import DiaryWritePage from "./diaryWritePage/DiaryWritePage";
import Loading from "./loginPage/Loading";
import DiaryBotPage from "./diaryBotPage/DiaryBotPage";
import DiaryDetailPage from "./diaryDetailPage/DiaryDetailPage";
import UpdateDiary from "./diaryWritePage/components/UpdateDiary";
import { tokenState, UserTokenState } from "./atom/atom"; // Your recoil atoms

const AxiosInterceptor = () => {
  const setCsrfToken = useSetRecoilState(tokenState);
  const setUserTokenState = useSetRecoilState(UserTokenState);
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if ((error.response && error.response.status === 401) || 403) {
          console.log("Axios interceptor caught an error:", error); // 로그 추가
          setCsrfToken(null);
          setUserTokenState({ isLogin: false });
          navigate("/", { replace: true }); // 리다이렉션
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, setCsrfToken, setUserTokenState]);

  return null;
};

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AxiosInterceptor />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/HomePage" element={<Hompage />} />
          <Route path="/diarylist" element={<DiaryListPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/write" element={<DiaryWritePage />} />
          <Route path="/summaryEdit" element={<DiaryBotPage />} />
          <Route path="/detail" element={<DiaryDetailPage />} />
          <Route path="/oauth2/redirect" element={<Loading />} />
          <Route path="/UpdateDiary" element={<UpdateDiary />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
