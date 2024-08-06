import axios from "axios";

const deleteGoal = async (csrfToken, goalId) => {
  try {
    const serverResponse = await axios.delete(`${process.env.REACT_APP_HOST_URL}/v1/goals/${goalId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
    });

    return serverResponse.data;
  } catch (error) {
    console.error("목표 삭제 실패:", error);
    throw error;
  }
};

export default deleteGoal;
