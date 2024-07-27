import React, { useState } from "react";
import styled from "styled-components";
import dummy from "../../db/data.json";
import sendIcon from "../../asset/Icon/send.svg";
import LoadingModal from "./LoadingModal";
function ChatbotBody() {
  //   let botTexts = dummy.Chatbot;
  const [modalOpen, setModalOpen] = useState(false);

  const openLoadingModal = () => {
    setModalOpen(true);
  };
  return (
    <div>
      <PageWrapper>
        <CenterBox className="flex">
          <Chattings>
            <Chatbot className="flex">
              <ChatbotIcon className="flex" />
              {dummy.chatbot.map((texts, index) => (
                <ChatbotText key={index}>{texts.text}</ChatbotText>
                //   <ChatbotText key={index}>{texts.text}</ChatbotText>
              ))}
            </Chatbot>
            <User>
              {dummy.user.map((texts, index) => (
                <UserText key={index}>{texts.text}</UserText>
              ))}
            </User>
            <ChatbotIcon className="flex" />
            <ChatbotText className="flex"> . . . </ChatbotText>
          </Chattings>
          <UserInteractField>
            <> {/* 일지 작성 조건 갖춰지면 클릭할 부분 보여주기 */}</>
            <SummarizeArea>
              {" "}
              <span>
                (봇이름)과 대화를 통해 충분히 오늘의 감상을 기록하셨다면{" "}
                <span
                  className="summarize-button"
                  onClick={openLoadingModal}
                  href="/"
                >
                  일지를 요약
                </span>
                해보세요!
              </span>{" "}
              <span className="summarizeBtn" onClick={openLoadingModal}>
                일지 요약하기 &gt;{" "}
              </span>
            </SummarizeArea>
            <TypingBox>
              <TypingArea placeholder="메시지를 작성해주세요! "></TypingArea>
              <SendButton src={sendIcon} />
            </TypingBox>
          </UserInteractField>
        </CenterBox>
        {modalOpen && <LoadingModal setModalOpen={setModalOpen} />}
      </PageWrapper>
    </div>
  );
}

export default ChatbotBody;
const PageWrapper = styled.div`
  display: flex;
  padding: 32px;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* border: 2px solid red; */

  .flex {
    display: flex;
  }
`;
const CenterBox = styled.div`
  flex-direction: column;
  justify-content: space-between;

  width: 792px; // << 나중에 바꿔야 할 부분
  height: 708px;

  padding: 21px 20px;
  /* border: 2px solid orange; */
  border: 2px solid lightgray;
`;

const Chatbot = styled.div`
  flex-direction: column;
  /* border: 2px solid gold; */
  width: 70%;
  /* height: 50%; */
`;
const ChatbotIcon = styled.div`
  /* flex-direction: row; */
  justify-content: start;
  align-items: start;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: gray;
  margin-bottom: 12px;
`;

// 챗봇이랑 유저가 나눈 대화 내용
const Chattings = styled.div`
  // 나중에 채팅하다보면 길어질 것 .. 그때는 스크롤로 채팅 기록 확인하도록.
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;
  /* border: 2px solid red; */
`;
const ChatbotText = styled.div`
  display: flex;
  background-color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border-top-left-radius: 0px;
  margin-bottom: 8px;
  /* border: 2px solid green; */
  border: 2px solid lightgray;
`;

const User = styled.div`
  align-self: end;
  flex-direction: column;
  margin-top: 24px;
  width: 70%;
  /* border: 2px solid skyblue; */
  /* border: 2px solid lightgray; */
`;

const UserText = styled.div`
  display: flex;
  background-color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border-top-right-radius: 0px;
  margin-bottom: 8px;
  /* border: 2px solid blue; */
  border: 2px solid lightgray;
`;

// AI 요약하기 버튼 넣는 부분 + 유저가 타이핑하는 필드
const UserInteractField = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: flex-end; //
  /* width: 100%; */
  height: 130px;
  padding: 20px;
  /* border: 2px solid purple; */
`;

const SummarizeArea = styled.div`
  display: flex;
  /* width: 100%; */
  justify-content: space-between;
  height: 50%;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 5px;
  /* border: 2px solid blue; */
  border: 2px solid lightgray;
  > span > .summarize-button {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
  .summarizeBtn {
    cursor: pointer;
  }
`;

const TypingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50%;
  padding-left: 15px;
  padding-right: 15px;
  /* border: 2px solid pink; */
  background-color: #d9d9d9;
  border: 2px solid lightgray;
`;

const TypingArea = styled.input`
  display: flex;
  /* width: 100%; */
  height: 90%;
  width: 94%;
  outline: none;
  /* padding-left: 15px; */
  font-size: 16px;
  /* border: 2px solid pink; */
  background-color: #d9d9d9;
  border: none;
`;
const SendButton = styled.img`
  /* background-color: ; */

  height: 27px;
  width: 27px;
  border-radius: 4px;
  margin-right: 4px;
  /* border: 2px solid red; */
`;
