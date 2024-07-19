import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LoginPage from "./loginPage/LoginPage";
import Hompage from "./homepage/HomePage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/HomePage" element={<Hompage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
