import axios from "axios";

const createGoal = async (formDataToSend, csrfToken) => {
  try {
    const serverResponse = await axios.post(`${process.env.REACT_APP_HOST_URL}/v1/goals`, formDataToSend, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
    });

    return serverResponse.data;
  } catch (error) {
    console.error("목표 추가 실패:", error);
    throw error;
  }
};

export default createGoal;
