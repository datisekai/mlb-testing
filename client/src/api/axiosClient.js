import axios from "axios";
import { base_url } from "../utils/contans";

const axiosClient = axios.create({
  baseURL: base_url,
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMwM2RhNzU1ODVjZWRhZWNhZTQ3ZmMiLCJyb2xlSWQiOiJhZG1pbiIsImlhdCI6MTY4MzA5ODY4N30.HnczTwt2vQdEij8mhQ3VTnwMcaJyoZT19YRVo5MOv5s'

axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axiosClient;
