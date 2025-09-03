import { Room } from "@/types/type"
import { create } from "zustand";

type StoreRooms = {
    rooms : Room[],
    setRooms :  (rooms : Room[]) => void
}

export const useStoreRooms = create<StoreRooms>((set) => ({
    rooms : [],
    setRooms : (data) => set({ rooms : data}) 
}))