import axios from "axios";

const getCrsfToken = async () => {
  try {
    const serverResponse = await axios.get(`${process.env.REACT_APP_HOST_URL}/v1/csrf`, { withCredentials: true });
    return serverResponse.data.token;
  } catch (error) {
    console.error("로그인 실패:", error);
    return [];
  }
};

export default getCrsfToken;
