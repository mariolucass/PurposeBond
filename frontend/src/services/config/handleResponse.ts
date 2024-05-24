import { AxiosError } from "axios";
import { ApiError } from "./apiError";

export async function handleApiResponse<T>(promise: Promise<any>): Promise<T> {
  try {
    const { data } = await promise;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { status, data } = error.response;
        throw new ApiError(`${error.message}`, status);
      } else if (error.request) {
        throw new Error("Network Error: No response received from the server.");
      } else {
        throw new Error("Request Setup Error: " + error.message);
      }
    } else {
      throw error;
    }
  }
}
