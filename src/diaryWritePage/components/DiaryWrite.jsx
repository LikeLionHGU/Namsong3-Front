import React from "react";
import QuillEditor from "./QuillEditor";
import styled from "styled-components";

function DiaryWrite() {
  return (
    <Wrapper>
      <CenterBox>
        <DiaryHeader>
          <DiaryTitle placeholder="오늘의 일지를 잘 표현할 수 있는 제목을 작성해주세요 (최대 10자)">
            {/* */}
          </DiaryTitle>
        </DiaryHeader>
        <EditorArea>
          <QuillEditor />
        </EditorArea>
        <SaveButton>
          <button className="save-button">일지 작성하기</button>
        </SaveButton>
      </CenterBox>
    </Wrapper>
  );
}

export default DiaryWrite;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  /* border: 2px solid red; */
`;

const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 792px;
  height: 707px;
  margin-top: 32px;
  border-radius: 12px;
  background-color: #eef1ff;

  /* border: 2px solid orange; */
  padding: 8px 24px;
`;

const DiaryHeader = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  /* border: 2px solid gold; */
`;
const DiaryTitle = styled.input`
  display: flex;
  height: 90%;
  width: 100%;
  padding-left: 20px;
  outline: none;
  border: none;
  /* border: 2px solid blue; */
  font-size: 18px;
  background-color: #eef1ff;
  border-bottom: 1.5px solid #dfdfdf;
`;

const EditorArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* border: 2px solid green; */
`;
const SaveButton = styled.div`
  display: flex;
  width: 100%;

  /* height: 100%; */
  /* border: 2px solid purple; */
  justify-content: end;
  .save-button {
    width: 153px;
    height: 36px;
    border-radius: 6px;
    outline: none;
    border: none;
    background-color: #798bff;
    color: white;
    font-weight: bold;
    transition: 50ms;
    &:hover {
      cursor: pointer;

      background-color: #4759ce;
    }
  }
`;