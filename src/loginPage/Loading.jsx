import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import getCrsfToken from "../apis/getCrsfToken";
import { useSetRecoilState } from "recoil";
import { tokenState, UserTokenState } from "../atom/atom";
import axios from "axios";

const LoginLoding = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-top: 100px;
`;

const Loading = () => {
  const navigate = useNavigate();
  const setUserToken = useSetRecoilState(UserTokenState);
  const setToken = useSetRecoilState(tokenState);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getCrsfToken();
      if (fetchedData) {
        setUserToken({ isLogin: true });
        setToken(fetchedData);
      } else {
        console.log("로그인 에러");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <LoginLoding>로그인 중입니다...</LoginLoding>
    </div>
  );
};

export default Loading;
