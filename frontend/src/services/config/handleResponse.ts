import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { ApiError } from "./apiError";

export async function handleApiResponse<T>(promise: Promise<any>): Promise<T> {
  try {
    const { data } = await promise;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);

      if (error.response) {
        const { status, data } = error.response;

        toast({
          title: "Something went wrong.",
          description: `${error.message}`,
        });
        throw new ApiError(`${error.message}`, status);
      } else {
        throw new Error("Request Setup Error: " + error.message);
      }
    } else {
      throw error;
    }
  }
}
