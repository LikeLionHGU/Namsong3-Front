import axios from "axios";

const getUserName = async () => {
  try {
    const serverResponse = await axios.get(`${process.env.REACT_APP_HOST_URL}/v1/members/my`, {
      withCredentials: true,
    });
    console.log("유저이름 불러오기 성공", serverResponse);

    return serverResponse.data;
  } catch (error) {
    console.error("유저이름 불러오기 실패 ", error);
    throw error;
  }
};

export default getUserName;
