import React from "react";
import styled from "styled-components";
import Figma from "../asset/Icon/Figma.svg";
import Github from "../asset/Icon/Github.svg";
import Notion from "../asset/Icon/Notion.svg";
import HoverFigma from "../asset/Icon/HoverFigma.svg";
import HoverGithub from "../asset/Icon/HoverGithub.svg";
import HoverNotion from "../asset/Icon/HoverNotion.svg";

function Footer() {
  const handleClick = (link) => {
    window.open(link, "_blank");
  };
  return (
    <Wrapper>
      <Container>
        <RightContainer>
          <MemberInfo>
            <span>팀 이름</span>
            남송리 3번지
          </MemberInfo>
          <MemberInfo>
            <span>팀 구성원</span>
            박은주, 임종현, 정주연, 한시온, 홍서영
          </MemberInfo>
          <MemberInfo>
            <span>고객문의</span>
            22000693@handong.ac.kr
          </MemberInfo>
        </RightContainer>
        <LeftContainer>
          <Icon
            src={Github}
            alt="Github"
            onClick={() =>
              handleClick("https://github.com/LikeLionHGU/Namsong3-Front")
            }
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
            onClick={() =>
              handleClick(
                "https://www.notion.so/3-6f963164f909477ba44b6c0466ec45bc"
              )
            }
            hoverSrc={HoverNotion}
          />
        </LeftContainer>
      </Container>
    </Wrapper>
  );
}

export default Footer;

const Wrapper = styled.div`
  width: 100vw;
  height: 158px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Container = styled.div`
  width: 792px;
  display: flex;
  justify-content: space-between;
  margin-top: 44px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #aeaeae;
`;

const MemberInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
  span {
    font-weight: bold;
    margin-right: 4px;
    width: 45px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
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
