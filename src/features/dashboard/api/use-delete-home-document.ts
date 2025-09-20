import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

type SuccessResponse = {
    extract_room_id?: string;
    message : string;
    status : "success" | "error"
}

type ResponseType = InferResponseType<(typeof client.api.documents.delete)[":extract_room_id"]["$delete"]> | SuccessResponse

type RequestType = InferRequestType<(typeof client.api.documents.delete)[":extract_room_id"]["$delete"]>

export const useDeleteHomeDocument = () => {
    // const route = useRouter();  
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn : async ({param}) => {
            const response = await client.api.documents.delete[":extract_room_id"].$delete({param});

            if (!response.ok) {
                throw new Error("Failed to delete task.");
            }

            return await response.json();
        },
        onSuccess : () => {
            toast.success("Document is delete successfully");
            queryClient.invalidateQueries({ queryKey: ["get-rooms-list"] });
        },
        onError: () => {
        toast.error("Failed to delete document.");
        },
    })
}