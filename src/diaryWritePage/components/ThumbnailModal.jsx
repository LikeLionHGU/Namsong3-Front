import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import createDiary from "../../apis/createDiary";
function ThumbnailModal({
  setThumbnailModal,
  setEditedModal,
  formData,
  diaryDetail,
  csrfToken,
}) {
  // 이미지 설정//
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null); // 미리보기창에 들어갈 이미지 url

  const closeThumbnailModal = () => {
    // 썸네일 추가하는 모달 닫는 함수(배경누르거나 x 눌러서 닫기만할때)
    setThumbnailModal(false);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleNextStep = async () => {
    //
    setThumbnailModal(false);
    setEditedModal(true);
    // ^^^^^^ 나중에 이 부분 지우기

    // *** 이 함수 안에서 수정된 일지를 백엔드로 submit할 필요 있음 (내용 + 대표사진) *** //
    //  TODO: (45번 라인 코드 부분)다이어리 수정하는 api 파일 생성하기 !!!!!! creatDiary말고 나중에 백엔드에서 일지 수정 api 생성하면 만들고 이 부분도 고치기.
    // 아직 이미지는 보내는건 연결X 백엔드 구현되면 수정필요
    try {
      const { title, content } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("content", content);

      // 이미지 파일이 존재할 경우에만 추가
      if (fileInputRef.current.files[0]) {
        formDataToSend.append("image", fileInputRef.current.files[0]);
      }
      //  TODO: 다이어리 수정하는 api 파일 생성하기 !!!!!! creatDiary말고 나중에
      // 백엔드에서 일지 수정 api 생성하면 만들고 이 부분도 고치기.
      await createDiary(formDataToSend, csrfToken, diaryDetail);
      setThumbnailModal(false);
      setEditedModal(true);
    } catch (error) {
      console.error("일지 생성 실패", error);
    }
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        console.log("Uploaded image:", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("전달된 파일이 유효하지 않습니다.");
    }
  };
  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeThumbnailModal} />
        <Wrapper>
          <TopContainer>
            <TopText>
              대표사진 수정하기<span>(선택)</span>
            </TopText>
            <ExitButton onClick={closeThumbnailModal}>
              <CloseRoundedIcon />
            </ExitButton>
          </TopContainer>
          <ImageAdd onClick={handleImageUploadClick}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Uploaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <>
                <AddRoundedIcon />
                <div className="image-add-text">사진 추가하기</div>
              </>
            )}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
              ref={fileInputRef}
            />
          </ImageAdd>
          <Buttons>
            <NextBtn>
              <button onClick={handleNextStep}>다음으로</button>
              {/* <button onClick={completeGoal}>다음으로</button> */}
            </NextBtn>
          </Buttons>
        </Wrapper>
        {/* </Overlay> */}
      </ModalBackground>
    </div>
  );
}

export default ThumbnailModal;

const modalBase = `
width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  `;

const ModalBackground = styled.div`
  ${modalBase}

  background: rgba(0, 0, 0, 0.2);
  z-index: 4;
  cursor: default;
`;
const Overlay = styled.div`
  ${modalBase}
  cursor: default;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  width: 431px; // 로딩모달 크기
  height: 364px;
  border-radius: 12px;
  /* padding: 15px; */
  z-index: 5;

  /* border: 2px solid red; */
`;
const TopContainer = styled.div`
  margin-top: 18px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  position: relative;
  /* width: 100%; */
  /* border: 2px solid blue; */
`;

const TopText = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;

  width: 316px;
  cursor: default;
  > span {
    margin-left: 5px;
    color: #aeaeae;
  }
`;

const ImageAdd = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 388px;
  height: 220px;
  margin-top: 28px;
  border: 1.5px solid #dfdfdf;
  border-radius: 8px;
  color: #aeaeae;
  cursor: pointer;
  > svg {
    font-size: 40px;
  }
  .image-add-text {
    font-size: 14px;
    font-weight: bold;
  }
`;

const ExitButton = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: 22px;
  position: absolute;
  left: 105%;
  cursor: pointer;
  /* border: 2px solid red; */
  padding: 2px;
  border-radius: 5px;
  &:hover {
    background-color: #eef1ff;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 16px;
  width: 100%;
`;

const NextBtn = styled.div`
  display: flex;
  margin-right: 18px;
  /* justify-self: flex-end; */
  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 8px;
    width: 81px;
    height: 37px;
    font-size: 14px;
    font-weight: bolder;
    color: white;
    background-color: #798bff;
    cursor: pointer;

    &:active {
      background-color: #586eff;
    }
  }
`;
