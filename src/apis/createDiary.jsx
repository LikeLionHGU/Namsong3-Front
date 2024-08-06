import axios from "axios";

const createDiary = async (formDataToSend, csrfToken, goalId) => {
  try {
    const serverResponse = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/v1/goals/${goalId}/journals`,
      formDataToSend,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );

    return serverResponse.data;
  } catch (error) {
    console.error("일지 추가 실패:", error);
    throw error;
  }
};

export default createDiary;
