import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

interface GetSearchProps {
  query: string;
  type: string;
}

export const getSearch = async ({ query, type }: GetSearchProps) => {
  const paramsOptions = { params: { q: query, type: type } };

  return handleApiResponse<any>(api.get("/search", paramsOptions));
};
