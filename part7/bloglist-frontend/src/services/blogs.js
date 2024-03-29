import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const like = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const comment = async (id, content) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    content,
    config
  );
  console.log("🚀 | file: blogs.js | line 51 | response", response);
  return response.data;
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const blogService = {
  getAll,
  create,
  update,
  like,
  remove,
  setToken,
  comment,
};

export default blogService;
