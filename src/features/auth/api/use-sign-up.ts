import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.authentication.signup)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.authentication.signup)["$post"]>;

/**
 * Provides a React Query mutation to sign up a user.
 * @returns Mutation object for triggering sign-up and handling status.
 */
export const useSignUp = () => {
    const route = useRouter();
    // const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        /**
         * Sends the sign-up request.
         * @param {{ json: RequestType['json'] }} param0 - Request payload body.
         * @returns {Promise<ResponseType>} Parsed JSON response from the API.
         */
        mutationFn: async ({ json }) => {
            const response = await client.api.authentication.signup.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Sign up successfully.");
            route.push("/");
            // TODO : add invalidate queries for fetch data
        },
        onError: () => {
            toast.error("Failed to sign up.");
        }
    });
};
