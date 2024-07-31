import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LoginPage from "./loginPage/LoginPage";
import Hompage from "./homepage/HomePage";
import DiaryListPage from "./diaryListPage/DiaryListPage";
import ChatbotPage from "./chatbotPage/ChatbotPage";
import DiaryWritePage from "./diaryWritePage/DiaryWritePage";
import Loading from "./loginPage/Loading";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/HomePage" element={<Hompage />} />
          <Route path="/diarylist" element={<DiaryListPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/write" element={<DiaryWritePage />} />
          <Route path="/oauth2/redirect" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
