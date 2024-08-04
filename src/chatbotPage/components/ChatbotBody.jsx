import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dummy from "../../db/data.json";
import sendIcon from "../../asset/Icon/send.svg";
import LoadingModal from "./LoadingModal";
import { useLocation } from "react-router-dom";
import { Client } from "@stomp/stompjs";

function ChatbotBody() {
  const [modalOpen, setModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const chatId = location.state.chatId.chatId;

  useEffect(() => {
    console.log("WebSocket URL:", process.env.REACT_APP_WEBSOCKET_URL); // 환경 변수 값 확인용

    const client = new Client({
      brokerURL: process.env.REACT_APP_WEBSOCKET_URL,
      onConnect: () => {
        // 채팅 기록 받아오기 (일회성) -- API로 대체 가능
        client.subscribe(`${process.env.REACT_APP_HOST_URL}/app/chats/${chatId}/history`, (message) => {
          const data = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, ...data]);
        });

        // AI 질문 받아오기
        client.subscribe(`${process.env.REACT_APP_HOST_URL}/user/queue/messages`, (message) => {
          const data = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, data]);
        });
      },
    });

    client.activate(); // activate 해야 웹소켓 연결이 됨

    return () => {
      client.deactivate(); // 컴포넌트 언마운트 시 연결 해제
    };
  }, [chatId]);

  const openLoadingModal = () => {
    setModalOpen(true);
  };

  const sendMessage = (content) => {
    const client = new Client({
      brokerURL: process.env.REACT_APP_WEBSOCKET_URL,
      onConnect: () => {
        client.publish({
          destination: `/app/chats/${chatId}/messages`,
          body: JSON.stringify({ content }),
        });
      },
    });
    client.activate();
  };

  return (
    <div>
      <PageWrapper>
        <BoxWrapper>
          <BoxTitle>steppy와 일지 작성하기</BoxTitle>
          <CenterBox className="flex">
            <Chattings>
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.sender === "bot" ? (
                    <Chatbot className="flex">
                      <ChatbotIcon className="flex" />
                      <ChatbotText>{msg.text}</ChatbotText>
                    </Chatbot>
                  ) : (
                    <User>
                      <UserText>{msg.text}</UserText>
                    </User>
                  )}
                </div>
              ))}
            </Chattings>
            <UserInteractField>
              <> {/* 일지 작성 조건 갖춰지면 클릭할 부분 보여주기 */}</>
              <SummarizeArea>
                <span>대화를 통해 충분히 오늘의 감상을 기록하셨다면 일지를 요약해보세요!</span>{" "}
                <span className="summarizeBtn" onClick={openLoadingModal}>
                  일지 요약하기 &gt;{" "}
                </span>
              </SummarizeArea>
              <TypingBox>
                <TypingArea
                  placeholder="메시지를 작성해주세요! "
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                <SendButton
                  src={sendIcon}
                  onClick={() => {
                    const input = document.querySelector("input");
                    sendMessage(input.value);
                    input.value = "";
                  }}
                />
              </TypingBox>
            </UserInteractField>
          </CenterBox>
          {modalOpen && <LoadingModal setModalOpen={setModalOpen} />}
        </BoxWrapper>
      </PageWrapper>
    </div>
  );
}

export default ChatbotBody;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: default;

  .flex {
    display: flex;
  }
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoxTitle = styled.div`
  display: flex;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #586eff;
  color: #676767;
  font-size: 16px;
  font-weight: bold;
  width: 230px;
  margin-bottom: 0px;
`;

const CenterBox = styled.div`
  flex-direction: column;
  justify-content: space-between;
  width: 792px;
  height: 708px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 21px 20px;
  background-color: #eef1ff;
`;

const Chatbot = styled.div`
  flex-direction: column;
  width: 70%;
`;

const ChatbotIcon = styled.div`
  justify-content: start;
  align-items: start;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: gray;
  margin-bottom: 12px;
`;

const Chattings = styled.div`
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;
`;

const ChatbotText = styled.div`
  display: flex;
  background-color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border-top-left-radius: 0px;
  margin-bottom: 8px;
  width: fit-content;
  font-size: 14px;
`;

const User = styled.div`
  align-self: end;
  flex-direction: column;
  margin-top: 24px;
  width: fit-content;
`;

const UserText = styled.div`
  display: flex;
  background-color: #dfdfdf;
  padding: 12px 12px;
  font-size: 14px;
  border-radius: 8px;
  border-top-right-radius: 0px;
  margin-bottom: 8px;
`;

const UserInteractField = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: flex-end;
  height: 130px;
  padding: 20px;
`;

const SummarizeArea = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50%;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 8px;
  border: 1.5px solid transparent;
  background: linear-gradient(to right, #eef1ff, #eef1ff) padding-box,
    linear-gradient(to right, #586eff, #bea0e6) border-box;
  border-radius: 8px;

  > span {
    background-image: linear-gradient(to right, #586eff, #bea0e6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
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
  background-color: #dfdfdf;
  border-radius: 8px;
  border: 2px solid lightgray;
`;

const TypingArea = styled.input`
  display: flex;
  height: 90%;
  width: 94%;
  outline: none;
  font-size: 16px;
  background-color: #dfdfdf;
  border: none;
`;

const SendButton = styled.img`
  cursor: pointer;
  height: 27px;
  width: 27px;
  border-radius: 4px;
  margin-right: 4px;
`;
