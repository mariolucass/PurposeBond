import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

interface GetSearchProps {
  query: string;
  type: string;
}

export const SearchService = {
  search: async ({ query, type }: GetSearchProps): Promise<any> => {
    return handleApiResponse(
      api.get("/search", {
        params: { q: query, type },
      })
    );
  },
};
