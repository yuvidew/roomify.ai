import { useQuery } from '@tanstack/react-query'
import { onGetHomeDetails } from '../api_function'

export const useGetHomeDetails = (id : string) => {
    return useQuery({
        queryKey : ["get-home-details"],
        queryFn : () => onGetHomeDetails(id)
    })
}
