import axios from "axios";
import {BASE_URL} from "../constants"

const Api = axios.create({
    baseURL: BASE_URL,
});

export default Api;
