import axios from "axios";

const postChatSummary = async (chatId, csrfToken) => {
  try {
    const serverResponse = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/v1/chats/${chatId}/summary`,
      chatId,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );
    console.log("요약 성공", serverResponse);

    return serverResponse.data;
  } catch (error) {
    console.error("요약 실패 ", error);
    throw error;
  }
};

export default postChatSummary;
