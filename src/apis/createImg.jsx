import axios from "axios";

const createImg = async (csrfToken, formData) => {
  try {
    const serverResponse = await axios.post(`${process.env.REACT_APP_HOST_URL}/v1/images`, formData, {
      withCredentials: true,
      headers: {
        "X-CSRF-TOKEN": csrfToken,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("이미지가 정상적으로 추가되었음", serverResponse);

    return serverResponse.data.imageUrl;
  } catch (error) {
    console.error("이미지 추가 실패:", error);
    throw error;
  }
};

export default createImg;
