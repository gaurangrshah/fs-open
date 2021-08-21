import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.patch(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  remove,
};
