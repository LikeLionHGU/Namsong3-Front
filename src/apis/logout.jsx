import axios from "axios";

const logout = async (csrfToken) => {
  try {
    const serverResponse = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );

    return serverResponse.data;
  } catch (error) {
    console.error("로그아웃 실패 ", error);
    throw error;
  }
};

export default logout;
