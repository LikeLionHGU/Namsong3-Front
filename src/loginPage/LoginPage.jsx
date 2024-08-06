import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { tokenState, UserTokenState } from "../atom/atom";
import Onboarding1 from "../asset/Background/1.svg";
import Onboarding2 from "../asset/Background/2.svg";
import Onboarding3 from "../asset/Background/3.svg";
import Onboarding4 from "../asset/Background/4.svg";
import Onboarding5 from "../asset/Background/5.svg";
import Figma from "../asset/Icon/Figma.svg";
import Github from "../asset/Icon/Github.svg";
import Notion from "../asset/Icon/Notion.svg";
import HoverFigma from "../asset/Icon/HoverFigma.svg";
import HoverGithub from "../asset/Icon/HoverGithub.svg";
import HoverNotion from "../asset/Icon/HoverNotion.svg";
import StartStepperIcon from "../asset/Icon/StartStepper.svg";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  background-color: #798bff;
`;

const ImageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
`;

const ContentOverlay = styled.div`
  position: absolute;
  color: white;
  text-align: center;
  background-color: #4285f4;
  width: 450px;
  height: 56px;
  margin-top: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const LeftContainer = styled.div`
  display: flex;
  position: absolute;
  margin-top: 580px;
  margin-left: 600px;
  img {
    margin-left: 12px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const Icon = styled.img`
  margin-left: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    content: url(${(props) => props.hoverSrc});
    transform: scale(1.1);
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const UserToken = useRecoilValue(UserTokenState);
  const Token = useRecoilValue(tokenState);
  const images = [Onboarding1, Onboarding2, Onboarding3, Onboarding4, Onboarding5];

  useEffect(() => {
    if (Token !== null && UserToken !== false) {
      navigate(`/HomePage`);
    }
  }, [UserToken, Token, navigate]);

  const handleClick = (link) => {
    window.open(link, "_blank");
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 화면으로 이동시키기
    window.location.href = `${process.env.REACT_APP_HOST_URL}/oauth2/authorization/google`;
  };

  return (
    <Wrapper>
      {images.map((image, index) =>
        index === 0 ? (
          <ImageContainer key={index}>
            <Image src={image} />
          </ImageContainer>
        ) : index === images.length - 1 ? (
          <ImageContainer key={index}>
            <Image src={image} />
            <ContentOverlay onClick={handleGoogleLogin}>구글 계정으로 시작하기</ContentOverlay>
            <LeftContainer>
              <Icon
                src={Github}
                alt="Github"
                onClick={() => handleClick("https://github.com/LikeLionHGU/Namsong3-Front")}
                hoverSrc={HoverGithub}
              />
              <Icon
                src={Figma}
                alt="Figma"
                onClick={() =>
                  handleClick(
                    "https://www.figma.com/design/mzpjUrzOzRP3h5eZTxcC7l/%EB%82%A8%EC%86%A1%EB%A6%AC3%EB%B2%88%EC%A7%80?node-id=953-2598&t=4q7N0YATFSCthYyB-0"
                  )
                }
                hoverSrc={HoverFigma}
              />
              <Icon
                src={Notion}
                alt="Notion"
                onClick={() => handleClick("https://www.notion.so/3-6f963164f909477ba44b6c0466ec45bc")}
                hoverSrc={HoverNotion}
              />
            </LeftContainer>
          </ImageContainer>
        ) : (
          <ImageContainer key={index}>
            <Image src={image} />
          </ImageContainer>
        )
      )}
    </Wrapper>
  );
};

export default LoginPage;
