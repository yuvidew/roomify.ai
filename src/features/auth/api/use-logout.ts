import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation"
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.authentication.logout)["$post"]>;

export const useLogout = () => {
    const router = useRouter();

    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.authentication.logout.$post();
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Logged out.");
            router.replace("/sign-in");
            router.refresh();
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error("Failed to log out.");
        },
    })
}