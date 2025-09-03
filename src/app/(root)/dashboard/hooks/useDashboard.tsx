import { onExtractRooms, onGenerate } from '@/api_functions'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { toast } from 'sonner'

export const useExtractRooms = () => {
    return useMutation({
        mutationFn: onExtractRooms,
        mutationKey: ["extract-rooms"],
        onSuccess: () => {
            toast.success("Ai extract rooms successfully!")
        },
        onError: (error) => {
            if (isAxiosError(error))
            toast.error(error?.response?.data?.message || error?.message || 'Something went wrong!')
        },
    })
}

export const useGenerateRoomsImage = () => {
    return useMutation({
        mutationFn : onGenerate,
        mutationKey : ["generate-rooms-images"],
        onSuccess: () => {
            toast.success("Ai extract rooms successfully!")
        },
        onError: (error) => {
            if (isAxiosError(error))
            toast.error(error?.response?.data?.message || error?.message || 'Something went wrong!')
        },
    })
}
