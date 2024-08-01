// /*  react-quill 사용할때 */
//  >>>      npm i react-quill    <<< 설치
// + index.js 에 아래 링크 넣어줘야 editor 사용가능
//  <link
//       rel="stylesheet"
//       href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
//     />
// *** 100번줄 쯤에 백엔드 주소 나중에 바꿔주기 *** //

import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import styled from "styled-components";

const QuillEditor = ({ mainText, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      return;
    }

    const toolbarOptions = [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, "link"],
      [{ color: [] }, { background: [] }],
      ["image"],
    ];

    const options = {
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "일지의 내용을 작성해주세요.", // placeholder에 들어갈 값은 나중에 적절히... props 주고받을때 처리해주기.
      theme: "snow",
    };

    quillRef.current = new Quill(editorRef.current, options);

    const initialContent = mainText;
    if (initialContent) {
      quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
    }

    // 텍스트 에디터에 변화 있으면(=타이핑하거나 지우거나 등) 변화 적용시켜주기
    quillRef.current.on("text-change", () => {
      const content = quillRef.current.root.innerHTML;
      if (onChange) {
        onChange(content); // 상위 컴포넌트로 content 전달 (밖에서 이 에디터 컴포넌트를 쓰고 있으니까)
        console.log(content);
      }
    });

    // 이미지 핸들러 추가
    quillRef.current.getModule("toolbar").addHandler("image", selectLocalImage);
    // eslint-disable-next-lin
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  const selectLocalImage = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.accept = "image/*";

    fileInput.click();

    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const ext = file.name.split(".").pop().toLowerCase();

        if (!["gif", "jpg", "jpeg", "png", "bmp"].includes(ext)) {
          alert("jpg, jpeg, png, bmp, gif 파일만 업로드 가능합니다.");
          return;
        }

        const fileSize = file.size;
        const maxSize = 20 * 1024 * 1024;

        if (fileSize > maxSize) {
          alert("업로드 가능한 최대 이미지 용량은 20MB입니다.");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        handleSubmit(formData);
      }
    });
  };

  const handleSubmit = async (formData) => {
    // !! 백엔드 주소 바꿔주기 !
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/files"; // 백엔드 업로드 URL
    // 파일을 업로드 할 때 : 백엔드 주소로 바로 보냄
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("loginToken"),
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      console.log("파일 업로드 완료");
      console.log(response);
      const range = quillRef.current.getSelection();
      quillRef.current.insertEmbed(range.index, "image", response.data.fileUrl);
    } catch (error) {
      console.log("파일 업로드 중 에러 발생: ", error);

      alert("파일 업로드 중 에러 발생. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <MyBlock>
        <div
          id="quill-editor"
          ref={editorRef}
          style={{
            backgroundColor: "#EEF1FF", // 에디터 내부 입력 부분 색깔
            width: "100%",
            height: "520px",
            border: "2px solid lavender",
          }}
        ></div>
      </MyBlock>
    </>
  );
};

export default QuillEditor;

const MyBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: none;
  .ql-toolbar.ql-snow {
    border: 2px solid lavender;
    border-bottom: none;
  }
  &#quill-editor {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    height: 30px !important;
    /* border: 2px solid #f1f1f1 !important; */
    background-color: blue;
    /* padding: 5px !important; */
    border-radius: 2px !important;
    font-size: 20px;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
