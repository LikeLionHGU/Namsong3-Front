import axios from "axios";

const updateDiary = async (formDataToSend, csrfToken, journalId) => {
  console.log("API 코드에서 잘 넘어왔는지", formDataToSend, csrfToken, journalId);
  try {
    const serverResponse = await axios.put(
      `${process.env.REACT_APP_HOST_URL}/v1/journals/${journalId}`,
      formDataToSend,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );
    console.log("일지가 정상적으로 수정되었음", serverResponse);

    return serverResponse.data;
  } catch (error) {
    console.error("일지 수정 실패:", error);
    throw error;
  }
};

export default updateDiary;
