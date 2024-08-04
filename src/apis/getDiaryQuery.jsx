import axios from "axios";

const getDiaryQuery = async (goalId, query, csrfToken) => {
  try {
    const serverResponse = await axios.get(
      `${process.env.REACT_APP_HOST_URL}/v1/goals/${goalId}/journals?q=${query}`,
      { withCredentials: true },
      {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );
    console.log("검색 일지 불러오기 성공", serverResponse);

    return serverResponse.data;
  } catch (error) {
    console.error("일지 불러오기 실패 ", error);
    throw error;
  }
};

export default getDiaryQuery;
