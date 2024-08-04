import axios from "axios";

const createChatbotRoom = async (csrfToken, goalId) => {
  try {
    const serverResponse = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/v1/goals/${goalId}/chats`,
      {},
      {
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );
    console.log("채팅방이 정상적으로 추가되었음", serverResponse);

    return serverResponse.data;
  } catch (error) {
    console.error("채팅방 추가 실패:", error);
    throw error;
  }
};

export default createChatbotRoom;
