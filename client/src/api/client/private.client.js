import axios from "axios";

const API_URL =
  import.meta.env.MODE === "production"
    ? "https://corn-films.onrender.com/api/v1"
    : "http://localhost:5000/api/v1";

console.log(API_URL);
const privateClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default privateClient;
