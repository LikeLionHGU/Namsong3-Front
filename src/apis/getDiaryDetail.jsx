import axios from "axios";

const getDiaryDetail = async (diaryId, csrfToken) => {
  try {
    const serverResponse = await axios.get(
      `${process.env.REACT_APP_HOST_URL}/v1/journals/${diaryId}`,
      { withCredentials: true },
      {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );

    return serverResponse.data;
  } catch (error) {
    console.error("일지 불러오기 실패 ", error);
    throw error;
  }
};

export default getDiaryDetail;
