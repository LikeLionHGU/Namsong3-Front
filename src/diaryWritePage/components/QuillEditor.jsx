import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styled from "styled-components";
import createImg from "../../apis/createImg";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../atom/atom";

const QuillEditor = ({ onChange, mainText }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const csrfToken = useRecoilValue(tokenState);

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
      placeholder: `일지의 내용을 작성해주세요!
어떤 내용을 적어야 할지 막막하다면 아래 질문을 참고해주세요 🤔
- 오늘 어떤 새로운 것을 배웠나요?
- 오늘의 목표를 달성하기 위해 어떤 계획을 세웠나요? 그 계획이 효과적이었나요?
- 내일을 위해 무엇을 준비해야 할까요?`,
      theme: "snow",
    };

    quillRef.current = new Quill(editorRef.current, options);

    const initialContent = mainText;
    if (initialContent) {
      quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
    }

    quillRef.current.on("text-change", () => {
      const content = quillRef.current.root.innerHTML;
      if (onChange) {
        onChange(content);
      }
    });

    quillRef.current.getModule("toolbar").addHandler("image", selectLocalImage);

    quillRef.current.root.addEventListener("paste", handlePaste);

    return () => {
      quillRef.current.root.removeEventListener("paste", handlePaste);
    };
  }, [onChange, mainText, csrfToken]);

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
    try {
      const imageUrl = await createImg(csrfToken, formData);
      const range = quillRef.current.getSelection();
      quillRef.current.insertEmbed(range.index, "image", imageUrl);
    } catch (error) {
      alert("파일 업로드 중 에러 발생. 다시 시도해주세요.");
    }
  };

  const handlePaste = async (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        const formData = new FormData();
        formData.append("file", file);

        handleSubmit(formData);
        event.preventDefault(); // Prevent the default paste behavior
      }
    }
  };

  return (
    <MyBlock>
      <div
        id="quill-editor"
        ref={editorRef}
        style={{
          backgroundColor: "#EEF1FF",
          width: "100%",
          height: "520px",
          border: "2px solid lavender",
        }}
      ></div>
    </MyBlock>
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
  .ql-editor.ql-blank::before {
    // placeholder 스타일
    font-style: normal;
    font-size: 14px;
  }
`;
