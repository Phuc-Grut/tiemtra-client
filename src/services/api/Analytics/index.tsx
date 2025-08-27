import { AxiosResponse } from "axios";
import { ANALYTICS } from "src/domain/constants";
import { IDashboardRequest, IDashboardResponse } from "src/Interfaces/IAnalytics";
import requester from "src/services/extended/axiosInstance";

const analyticsApi = {
  getDashboard: (params: IDashboardRequest): Promise<AxiosResponse<IDashboardResponse>> =>
    requester.get(ANALYTICS.URL_API.GET_ALL, { params }),
};

export default analyticsApi;