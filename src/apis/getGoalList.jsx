import axios from "axios";

const getGoalList = async (csrfToken) => {
  try {
    const serverResponse = await axios.get(
      `${process.env.REACT_APP_HOST_URL}/v1/goals`,
      { withCredentials: true },
      {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );
    console.log("목표 불러오기 성공", serverResponse);

    return serverResponse.data;
  } catch (error) {
    console.error("목표 불러오기 실패 ", error);
    throw error;
  }
};

export default getGoalList;
