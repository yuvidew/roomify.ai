import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type SuccessResponse = {
    extract_room_id?: string;
    message : string;
    status : "success" | "error"
}

type ResponseType = InferResponseType<(typeof client.api.generate_rooms_images.delete)[":id"]["$delete"]> | SuccessResponse

type RequestType = InferRequestType<(typeof client.api.generate_rooms_images.delete)[":id"]["$delete"]>

export const useDeleteImage = () => {
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn : async ({param}) => {
            const response = await client.api.generate_rooms_images.delete[":id"].$delete({param});

            if (!response.ok) {
                throw new Error("Failed to delete task.");
            }

            return await response.json();
        },
        onSuccess : () => {
            toast.success("Image is delete successfully");
            queryClient.invalidateQueries({ queryKey: ["get-generated-images"] });
            queryClient.invalidateQueries({queryKey : ["get-home-details"]})
        },
        onError: () => {
            toast.error("Failed to delete image.");
        },
    })
}