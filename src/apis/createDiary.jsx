import axios from "axios";

const createDiary = async (formDataToSend, csrfToken, goalId) => {
  console.log("API 코드에서 잘 넘어왔는지", formDataToSend, csrfToken, goalId);
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
    console.log("일지가 정상적으로 추가되었음", serverResponse);

    return serverResponse.data;
  } catch (error) {
    console.error("일지 추가 실패:", error);
    throw error;
  }
};

export default createDiary;
