import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getSearch = async ({
  query,
  type,
}: {
  query: string;
  type: string;
}) => {
  return handleApiResponse<any>(
    api.get("/search", { params: { q: query, type: type } })
  );
};
