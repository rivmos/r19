import { appConfig } from "@/config/app.config";
import axios from "axios";

const BaseService = axios.create({
    timeout: 30000,
    baseURL: appConfig.baseUrl
});

export default BaseService;