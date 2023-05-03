import axios from "axios";
import { base_url } from "../utils/contans";

const axiosClient = axios.create({
  baseURL: base_url,
});
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMwM2RhNzU1ODVjZWRhZWNhZTQ3ZmMiLCJyb2xlSWQiOiJhZG1pbiIsImlhdCI6MTY4MzEwMTQyMX0.XLM_dAfAHQtslFIOa_I1m4gtdrK3w0zcY3bzz56Hg5A";

axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axiosClient;
