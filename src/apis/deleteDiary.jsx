import axios from "axios";

const deleteDiary = async (csrfToken, journalId) => {
  console.log("API 코드에서 잘 넘어왔는지", csrfToken, journalId);
  try {
    const serverResponse = await axios.delete(`${process.env.REACT_APP_HOST_URL}/v1/journals/${journalId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
    });
    console.log("일지가 정상적으로 삭제되었음", serverResponse);

    return serverResponse.data;
  } catch (error) {
    console.error("일지 삭제 실패:", error);
    throw error;
  }
};

export default deleteDiary;
