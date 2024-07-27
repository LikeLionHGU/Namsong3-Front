import React from "react";
import styled from "styled-components";
import dummy from "../../db/data.json";

function ChatbotBody() {
  //   let botTexts = dummy.Chatbot;

  return (
    <div>
      <PageWrapper>
        <CenterBox className="flex">
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
        </CenterBox>
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
  border: 2px solid red;

  .flex {
    display: flex;
  }
`;
const CenterBox = styled.div`
  flex-direction: column;
  width: 70%; // << 나중에 바꿔야 할 부분
  height: 708px;
  border: 2px solid orange;
  padding: 21px 20px;
`;

const Chatbot = styled.div`
  flex-direction: column;
  border: 2px solid gold;
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

const ChatbotText = styled.div`
  display: flex;
  background-color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border-top-left-radius: 0px;
  margin-bottom: 8px;
  border: 2px solid green;
`;

const User = styled.div`
  align-self: end;
  flex-direction: column;
  border: 2px solid skyblue;
  width: 70%;
`;

const UserText = styled.div`
  display: flex;
  background-color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border-top-right-radius: 0px;
  margin-bottom: 8px;
  border: 2px solid blue;
`;
