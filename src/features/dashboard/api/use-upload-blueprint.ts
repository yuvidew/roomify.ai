import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExtractRoom } from "@/types/type";

type SuccessResponse = {
    extract_rooms: ExtractRoom;
};

type ResponseType = InferResponseType<(typeof client.api.extract_rooms.upload_blueprint)["$post"]> | SuccessResponse;
type RequestType = InferRequestType<(typeof client.api.extract_rooms.upload_blueprint)["$post"]> ;

export const useUploadBluePrint = () => {
    const route = useRouter();
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await client.api.extract_rooms.upload_blueprint.$post({ form })

            return await response.json();
        },
        onSuccess: (data) => {
            const {extract_rooms} = data as SuccessResponse;
            route.push(`/extract-rooms?extract_room_id=${extract_rooms.$id}`);
            toast.success("Successfully upload blue print")
            queryClient.invalidateQueries({
                queryKey: ["get-extracted-rooms", "current-user"]
            })
        },
        onError: () => {
            toast.error("Failed to upload blue print.");
        }
    })
}