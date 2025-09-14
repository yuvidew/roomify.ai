import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.authentication.signin)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.authentication.signin)["$post"]>;

/**
 * Provides a React Query mutation to sign in a user.
 * @returns Mutation object for triggering sign-in and handling status.
 */
export const useSignIn = () => { 
    const route = useRouter();
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        /**
         * Sends the sign-in request.
         * @param {{ json: RequestType['json'] }} param0 - Request payload body.
         * @returns {Promise<ResponseType>} Parsed JSON response from the API.
         */
        mutationFn: async ({ json }) => {
            const response = await client.api.authentication.signin.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Sign in successfully.");
            // route.refresh()
            route.replace("/");
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
        },
        onError: () => {
            toast.error("Failed to sign in.");
        }
    });
};
