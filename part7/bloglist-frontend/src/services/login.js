import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    if (response.status === 200) {
      return response.data;
    }
  } catch (exception) {
    console.error("login failed", exception);
  }
};

const loginService = { login };

export default loginService;
