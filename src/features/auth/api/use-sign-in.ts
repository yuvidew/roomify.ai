import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.authentication.signin)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.authentication.signin)["$post"]>;


export const useSignIn = () => {
    const route = useRouter();
    // const queryClient = useQueryClient();


    return useMutation<ResponseType , Error , RequestType>({
        mutationFn : async ({json}) => {
            const response = await client.api.authentication.signin.$post({json});

            return await response.json()
        },
        onSuccess: () => {
            toast.success("Sign in successfully.");
            route.replace("/");

            // TODO : add invalidate queries for fetch data
        },
        onError : () => {
            toast.error("Failed to sign in.")
        }
    })
}