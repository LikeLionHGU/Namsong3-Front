import axios from "axios";

const updateGoal = async (formDataToSend, csrfToken, goalId) => {
  console.log("API 코드에서 잘 넘어왔는지", formDataToSend, csrfToken);
  try {
    const serverResponse = await axios.put(`${process.env.REACT_APP_HOST_URL}/v1/goals/${goalId}`, formDataToSend, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
    });
    console.log("목표가 정상적으로 수정되었음", serverResponse);

    return serverResponse.data;
  } catch (error) {
    console.error("목표 수정 실패:", error);
    throw error;
  }
};

export default updateGoal;
