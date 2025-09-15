import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SuccessResponse = {
    extract_room_id: string;
};

type ResponseType = InferResponseType<(typeof client.api.generate_rooms_images)["$post"]> | SuccessResponse;

type RequestType = InferRequestType<(typeof client.api.generate_rooms_images)["$post"]>;

export const useGenerateImages = () => {
    const route = useRouter();
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await client.api.generate_rooms_images.$post({ form });

            return await response.json();
        },
        onSuccess: (data) => {
            const { extract_room_id } = data as SuccessResponse;

            route.push(`/generate-rooms-images?generated_rooms_image_id=${extract_room_id}`)

            toast.success("Success fully generated images")

            queryClient.invalidateQueries({
                queryKey: ["get-extracted-rooms", "current-user" , "get-generated-images"]
            })
        },
        onError: () => {
            toast.error("Failed to upload blue print.");
        }
    })
}